import express from 'express';
import cors from "cors"
import crypto from 'crypto';
import { exec } from 'child_process';
import {Todo} from "./models/todo.js"
import { sequelize } from './database.js';
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json()); 

const port = 8080;

const url = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;


sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(error => {
    console.error('Error creating database tables:', error);
  });

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('Hello World! Database connection is successful. !!!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.send('Failed to connect to the database.');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(description)
    const newTodo = await Todo.create({
      title,
      description
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating new todo:', error);
    res.status(500).json({ error: 'Failed to create a new todo' });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll()
    res.status(200).json(todos) 
  } catch (error) {
    res.status(500).json({ error: "Произошла ошибка"})
  }
})

app.post("/webhook-restart-app", async (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha1', process.env.SECRET_TOKEN);
    const digest = 'sha1=' + hmac.update(payload).digest('hex');
    
    if (digest !== req.headers['x-hub-signature']) {
      return res.status(401).send('Unauthorized');
    }
    
    const command = "git pull --no-edit && npm install && pm2 restart my-app";
    const { stdout, stderr } = await execPromise(command);
    if (stderr) throw new Error(stderr);
    console.log(stdout);
    res.status(200).send('Webhook received and processed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve({ stdout, stderr });
    });
  });
}


app.listen(port, () => {
  console.log(`App listening on port at ${url} at port ${port}`);
});
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { sequelize } from './database.js';
import './models/user.js';
import './models/orders.js'
import './models/orderItem.js';
import './models/cartItems.js';
import './models/categories.js';
import './models/groupProduct.js';
import './models/todo.js';
import './models/recommendation.js'
import { routerUsers } from './routes/usersRouters.js';
import { routerCart } from './routes/cartItemsRouters.js';
import { routerOrder } from './routes/orderRouters.js';
import { routerCategory } from "./routes/categoriesRouters.js"
import { routerGroupProduct } from './routes/groupProductsRouter.js';
import { routerProduct } from './routes/productRouters.js';
import { routerRecommendation } from './routes/recommendationRouters.js';
import { swaggerUi, swaggerDocs } from './swagger.js';
import './models/associations.js'
import { commentRouter } from './routes/commentRouters.js';

const corsOptions = {
  origin: [
    'http://localhost:3001', // Development URL
    'http://127.0.0.1:3001', // Another possible localhost URL
    'http://31.129.63.84', // Production URL
    'https://fyodor76.github.io/wb-front',
    'https://fyodor76.github.io',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};




dotenv.config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = 8080;
const url = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;

app.use('/api/user', routerUsers);
app.use('/api/cart', routerCart);
app.use('/api/order', routerOrder)
app.use('/api/category', routerCategory);
app.use('/api/group-product', routerGroupProduct);
app.use('/api/product', routerProduct);
app.use('/api/recommendation', routerRecommendation);
app.use('/api/comments', commentRouter);


sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(error => {
    console.error('Error creating database tables:', error);
  });

app.listen(port, () => {
  console.log(`App listening on port at ${url} at port ${port}`);
});


app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('Hello World! Database connection is successful. Check!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.send('Failed to connect to the database.');
  }
});

// app.post('/todos', async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     console.log(description)
//     const newTodo = await Todo.create({
//       title,
//       description
//     });
//     res.status(201).json(newTodo);
//   } catch (error) {
//     console.error('Error creating new todo:', error);
//     res.status(500).json({ error: 'Failed to create a new todo' });
//   }
// });

// app.get("/todos", async (req, res) => {
//   try {
//     const todos = await Todo.findAll()
//     res.status(200).json(todos) 
//   } catch (error) {
//     res.status(500).json({ error: "Произошла ошибка"})
//   }
// })

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const id = req.params.id;  
//     const todo = await Todo.findByPk(id); 

//     if (!todo) {
//       return res.status(404).json({ error: "Todo not found" });  // Возвращаем ошибку, если задача не найдена
//     }

//     await todo.destroy();  // Удаление найденной задачи
//     res.status(200).json({ message: "Todo deleted successfully", id: id });  // Отправляем подтверждение об успешном удалении
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//     res.status(500).json({ error: "Failed to delete todo" });  // Возвращаем ошибку сервера, если удаление не удалось
//   }
// });

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

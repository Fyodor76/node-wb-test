const express = require('express');
const app = express();
const port = 8080;
require('dotenv').config();

const url = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;

app.get('/', (req, res) => {
  for (let i = 0; i < 10000; i++) {
    console.log('test', i)
  }
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port at ${url} at port ${port}`);
});
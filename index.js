const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const url = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port at ${url}`);
});
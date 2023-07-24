require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const port = process.env.PORT || 5000;
const products_routes = require('./routes/products');
app.get('/', (req, res) => {
  res.send('hi i am live');
});

app.use('/api/products', products_routes);
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`${port} Yes I am connected `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

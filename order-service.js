// order-service.js
const express = require('express');
const axios = require('axios');
const app = express();

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:3001';

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

app.get('/orders', async (req, res) => {
  try {
    const users = await axios.get(`${USER_SERVICE_URL}/users`);
    const products = await axios.get(`${PRODUCT_SERVICE_URL}/products`);

    res.json({
      user: users.data[0],
      product: products.data[0],
      status: 'Order Placed'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Unable to communicate with User or Product Service'
    });
  }
});

app.listen(3003, () => {
  console.log('Order Service running on port 3003');
});
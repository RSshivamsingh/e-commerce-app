const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/feed
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      // Seed initial dummy data if database is empty
      products = await Product.insertMany([
        { name: 'UltraBook Pro 15', description: 'High performance laptop', price: 1299, category: 'Electronics', imageUrl: 'https://via.placeholder.com/250' },
        { name: 'Wireless Noise-Canceling Headphones', description: 'Premium audio quality', price: 249, category: 'Audio', imageUrl: 'https://via.placeholder.com/250' },
        { name: 'Ergonomic Desk Chair', description: 'Lumbar support office chair', price: 189, category: 'Furniture', imageUrl: 'https://via.placeholder.com/250' }
      ]);
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

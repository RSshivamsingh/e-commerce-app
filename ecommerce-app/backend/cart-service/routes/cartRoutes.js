const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Auth middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

// GET /api/cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    res.json(cart || { userId: req.user.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart/add
router.post('/add', authenticateToken, async (req, res) => {
  const { productId, name, price } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, name, price, quantity: 1 });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/clear
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

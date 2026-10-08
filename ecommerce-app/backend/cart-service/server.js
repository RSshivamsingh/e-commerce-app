const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cart_db';
const PORT = process.env.PORT || 5003;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Cart Database Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/cart', require('./routes/cartRoutes'));

app.get('/healthz', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => console.log(`Cart Service listening on port ${PORT}`));

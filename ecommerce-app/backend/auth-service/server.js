const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_db';
const PORT = process.env.PORT || 5001;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Auth Database Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/healthz', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => console.log(`Auth Service listening on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feed_db';
const PORT = process.env.PORT || 5002;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Feed Database Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/feed', require('./routes/feedRoutes'));

app.get('/healthz', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => console.log(`Feed Service listening on port ${PORT}`));

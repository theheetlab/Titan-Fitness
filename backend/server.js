const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const seedData = require('./utils/seedData');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Titan Fitness API is running' });
});

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/membership-plans', require('./routes/membershipRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ success: false, message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
    await seedData();
  } catch (dbError) {
    console.warn('MongoDB connection failed. Server will start without database.');
    console.warn('Set MONGODB_URI in .env to connect to MongoDB Atlas.');
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();

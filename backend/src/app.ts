import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './auth';
import connectDB from './db'; // Import the MongoDB connection function


const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());


// Basit bir test rotası
app.get('/', (req, res) => {
  res.send('API is online!');
});

app.use('/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

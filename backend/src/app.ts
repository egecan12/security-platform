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

app.use('/auth', authRoutes);


// Basit bir test rotası
app.get('/', (req, res) => {
  res.status(200).send("2024 Welcome to API");
});
// Handle unknown routes (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
export default app;
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || ''; // Fallback to empty string if not found

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

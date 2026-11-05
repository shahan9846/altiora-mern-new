import mongoose from 'mongoose';

// Connects to MongoDB Atlas using the MONGODB_URI value from the .env file.
// If the connection fails, we print the reason and stop the app.
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDatabase;

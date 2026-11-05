import mongoose from 'mongoose';

// One document in the "admins" collection = one person who can log in to the dashboard.
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // two admins cannot share the same email
      lowercase: true, // "Admin@Altiora.com" is saved as "admin@altiora.com"
      trim: true,
    },
    // This stores the bcrypt HASH of the password, never the real password.
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Mongoose adds createdAt and updatedAt for us
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

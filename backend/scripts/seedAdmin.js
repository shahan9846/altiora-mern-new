// Run with:  npm run seed:admin
// This site has ONE admin. The script makes the admin match ADMIN_EMAIL and ADMIN_PASSWORD
// from your .env file:
//   - no admin yet      -> creates it
//   - an admin exists   -> updates its email and password
// So whenever you change the email or password in .env, just run this command again.
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import connectDatabase from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Please set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in your .env file');
    process.exit(1);
  }

  if (ADMIN_PASSWORD.length < 8) {
    console.error('ADMIN_PASSWORD must be at least 8 characters');
    process.exit(1);
  }

  try {
    await connectDatabase();

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Take the oldest admin as "the" admin.
    const admin = await Admin.findOne().sort({ createdAt: 1 });

    if (!admin) {
      await Admin.create({ email: ADMIN_EMAIL, password: hashedPassword });
      console.log(`Admin created: ${ADMIN_EMAIL}`);
    } else {
      admin.email = ADMIN_EMAIL;
      admin.password = hashedPassword;
      await admin.save();
      console.log(`Admin updated: ${ADMIN_EMAIL}`);

      // Only one admin is allowed, so remove any extra admins (for example an old email).
      const removedAdmins = await Admin.deleteMany({ _id: { $ne: admin._id } });
      if (removedAdmins.deletedCount > 0) {
        console.log(`Removed ${removedAdmins.deletedCount} extra admin(s)`);
      }
    }
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();

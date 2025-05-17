// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '@shared/utils/logger';

dotenv.config();

const dbUri = `${process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_DEV
  }`;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    logger.info('✅ MongoDB connected success!');
  } catch (error) {
    console.log(error)
    logger.error(`Error connecting to MongoDB: ${JSON.stringify(error)}`);
    process.exit(1);
  }
};

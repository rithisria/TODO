import mongoose from 'mongoose';
import { env } from './env';
import dns from 'dns';

// Ensure Node uses Google DNS for SRV lookups (fixes ECONNREFUSED/querySrv errors)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
  console.warn('Failed to set DNS servers:', err);
}

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

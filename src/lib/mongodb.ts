import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Only throw error at runtime, not during build
if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️ MONGODB_URI is not defined. Database features will not work.');
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: GlobalWithMongoose;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If no MongoDB URI, return null (for build time)
  if (!MONGODB_URI) {
    console.warn('⚠️ MongoDB URI not configured. Skipping connection.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB Atlas');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Failed to connect to MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

// For API routes that expect { db } format
export async function connectToDatabase() {
  try {
    const connection = await connectDB();
    if (!connection) {
      console.warn('⚠️ MongoDB URI not configured. Returning null.');
      return null;
    }
    return {
      db: connection.connection.db
    };
  } catch (error) {
    console.error('Database connection failed:', error);
    return null;
  }
}

export default connectDB;
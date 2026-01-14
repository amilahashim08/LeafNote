import mongoose from 'mongoose';

// Use a safe IPv4 local fallback and prefer setting MONGODB_URI in .env.local
const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/leafnote';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_LOCAL_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // mongoose 6+ defaults are good; add options here if needed
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      console.error('   Connection URI:', MONGODB_URI);
      console.error('💡 Please check:');
      console.error('   1. Is MongoDB running (local Docker/service)?');
      console.error('   2. Is your MONGODB_URI correct in .env.local?');
      console.error('   3. For Atlas: Is your IP whitelisted and credentials correct?');
      console.error('   See MONGODB_SETUP.md for more details\n');
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
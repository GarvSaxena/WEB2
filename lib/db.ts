/**
 * lib/db.ts — MongoDB Connection Singleton
 *
 * WHY A SINGLETON?
 *   Next.js runs each API route / Server Component in a potentially new
 *   Node.js context in development (hot-reload) but shares a single long-lived
 *   process in production.  Without caching the connection, you'd exhaust the
 *   MongoDB Atlas connection pool very quickly.
 *
 * HOW IT WORKS:
 *   We store the Mongoose connection promise on the Node.js `global` object.
 *   On the first call: opens a new connection and caches the promise.
 *   On subsequent calls: returns the cached promise immediately.
 *
 * USAGE (in any Server Component, Server Action, or API Route):
 *   import connectDB from "@/lib/db";
 *   await connectDB();
 */

import mongoose from "mongoose";

// The connection URI comes from your .env.local file
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "❌  MONGODB_URI is not defined. Add it to your .env.local file."
  );
}

// ── Extend the global type so TypeScript knows about our cache ─────────────
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

// Initialise the cache on first module load
const globalCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = globalCache;

// ── Main connection function ───────────────────────────────────────────────
export async function connectDB(): Promise<typeof mongoose> {
  // If we already have an active connection, return it
  if (globalCache.conn) return globalCache.conn;

  // If a connection is in-flight (another concurrent request started it),
  // wait for the same promise instead of opening a second connection
  if (!globalCache.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable mongoose buffering for cleaner errors
    };

    globalCache.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("✅  MongoDB connected");
        return m;
      })
      .catch((err) => {
        console.error("❌  MongoDB connection error:", err);
        globalCache.promise = null; // Reset so the next call tries again
        throw err;
      });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}

export default connectDB;

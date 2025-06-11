import { MongoClient } from 'mongodb';
import 'dotenv/config';

let client;
let db;

/**
 * Connects to MongoDB using the connection string in `MONGO_URI`.
 * The same connection is reused on subsequent calls.
 * @returns {Promise<import('mongodb').Db>}
 */
export async function connectDb() {
  if (!db) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db();
  }
  return db;
}

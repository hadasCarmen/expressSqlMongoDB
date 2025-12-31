import { MongoClient } from "mongodb";
let dbConn = null;

export async function createCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    collection.createIndex({ name: 1 }, { unique: true })
    return collection;
  } catch (err) {
    console.log("Failed to get Mongo collection", err);
    throw err;
  }
}

export async function connect() {
  console.log("connect...");
  if (dbConn) return dbConn;

  try {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect(process.env.MONGO_URL);
    return (dbConn = client.db(process.env.DB_NAME));
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}

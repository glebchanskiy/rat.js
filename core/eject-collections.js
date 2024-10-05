import { DB, MONGO_URI } from "./db.js";

export async function dropCollections(collections) {
  const db = await new DB(MONGO_URI).conect();

  for (const collection of collections) {
    try {
      await db.dropCollection(collection);
    } catch (_ignore) {}
  }

  db.disconnect();
}

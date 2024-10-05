import { Collection } from "mongodb";
import { DB, MONGO_URI } from "./db.js";
import { colorize } from "../utils/amazing-log.js";

export async function getSniffedResources() {
  const db = await new DB(MONGO_URI).conect();
  const collections = await db.listCollections();
  db.disconnect();

  return collections.map((o) => o.name);
}

export async function getSniffedResourcePages(domains) {
  const db = await new DB(MONGO_URI).conect();

  const result = [];

  for (const domain of domains) {
    try {
      const collection = db.retriveCollection(domain);
      const pages = await collection.find({}).limit(100).toArray();

      result.push({ domain, pages });
    } catch (_ignore) {}
  }

  db.disconnect();
  return result;
}

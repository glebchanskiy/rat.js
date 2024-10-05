import { MongoClient } from "mongodb";

const DB_NAME = "web_pages";

export const MONGO_URI = "mongodb://root:example@localhost:27017";

export class DB {
  constructor(uri) {
    this.client = new MongoClient(uri, {});
  }

  retriveCollection(name) {
    return this.client.db(DB_NAME).collection(name);
  }

  dropCollection(name) {
    return this.client.db(DB_NAME).dropCollection(name);
  }

  listCollections() {
    return this.client.db(DB_NAME).listCollections().toArray();
  }

  async conect() {
    await this.client.connect();
    return this;
  }

  async disconnect() {
    await this.client.close();
  }
}

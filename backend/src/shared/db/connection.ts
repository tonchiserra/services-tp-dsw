import { MongoClient, Db } from "mongodb";

const cli = new MongoClient('mongodb://localhost/')
await cli.connect()

export let db: Db = cli.db('services-tp-dsw-db') 
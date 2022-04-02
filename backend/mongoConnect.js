"use strict";

import { createHmac } from "crypto";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// connection URI
const uri = `mongodb+srv://jadebono:${process.env.DB_PASSWORD}@ecom.9evjz.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

//create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect the client to the fsb database
const db = client.db("fsb");

// create a test connection
export async function TestConnectMDB() {
  try {
    await client.db("jadebono").command({ ping: 1 });
    console.log(`connected successfully`);
  } catch (error) {
    console.log(error);
  }
}

// create connection
export async function ConnectMDB() {
  await client
    .connect()
    .then(console.log("Connected successfullY to database!"))
    .catch((error) => console.log(error));
}

// close connection
async function CloseMDB() {
  await client
    .close()
    .then(console.log("Connection to database closed successfullY!"))
    .catch((error) => console.log(error));
}

// function to add document to collection
export async function SaveToDB(col, data) {
  try {
    await db.collection(col).insertOne(data);
  } catch (error) {
    console.log(error);
  }
}

// function to retrieve document
export async function LoadFromDB(col, item) {
  try {
    return await db.collection(col).find(item).toArray();
  } catch (error) {
    console.log(error);
  }
}

// function to update document in collection
export async function updateDB(col, filter, data) {
  try {
    await db.collection(col).updateOne(filter, { $set: data });
  } catch (error) {
    console.log(error);
  }
}

// function to increment a value in a document in the logs collection
export async function incLog(col, filter, requests) {
  try {
    await ConnectMDB();
    await db
      .collection(col)
      .updateOne(filter, { $inc: { requests: requests } });
  } catch (error) {
    console.log(error);
  }
}

// HMAC function
export default function HashString(password) {
  return createHmac("sha256", process.env.HMAC).update(password).digest("hex");
}

process.on("exit", () => CloseMDB());
process.on("uncaughtException", (error) => {
  console.log(error);
  CloseMDB();
});

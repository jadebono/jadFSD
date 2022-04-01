"use strict";

// middleware to update the number of requests that a user makes
// user document is in the log collection

import * as fs from "fs";
import { incLog } from "../mongoConnect.js";
import { ObjectId } from "mongodb";

export async function logger(req, res, next) {
  try {
    // if logs.txt exists, a user has been logged in
    let user = fs.readFileSync("logs.txt").toString();
    // increments +1 requests field in users document in log collection
    await incLog("log", { userId: new ObjectId(user) })
      .then(console.log("updated log requests"))
      .catch((err) => console.log(error));
  } catch (error) {
    // otherwise there is no user logged in
    console.log("no user signed in - not logging request");
  }
  next();
}

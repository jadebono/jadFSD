"use strict";

// middleware to update the number of requests that a user makes
// user document is in the log collection

import * as fs from "fs";

export async function logger(req, res, next) {
  try {
    // if logs.txt exists, a user has been logged in
    let user = fs.readFileSync("logs.txt").toString();
    // increments +1 reqs.txt to be written in the logs collection at the end of the
    //session
    fs.appendFileSync("reqs.txt", "1");
  } catch (error) {
    // otherwise there is no user logged in so do nothing
  }
  next();
}

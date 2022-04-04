"use strict";

// middleware to update the number of requests that a user makes
// user document is in the log collection

import * as fs from "fs";

function logReq(userId) {
  fs.appendFileSync(`reqs_${userId}.txt`, "1");
}

export async function logger(req, res, next) {
  let userId;
  // for get requests
  if (typeof req.query.user === "string" && req.query.user !== "") {
    userId = req.query.user;
    logReq(userId);
    // for post requests
  } else if (typeof req.body.user === "string" && req.body.user !== "") {
    userId = req.body.user;
    logReq(userId);
  } else {
    console.log("no user id with this request");
  }
  next();
}

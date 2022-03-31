"use strict";

// logger middleware

import express from "express";
import { LoadFromDB, SaveToDB } from "../mongoConnect.js";

let request = 0;

export default function logger(req, res, next) {
  request += 1;
  console.log(`logging ${request} request`);

  next();
}

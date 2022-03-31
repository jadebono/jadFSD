"use strict";

// !! todo jsonwebtoken
// !! todo cookie-session
// !! todo signout
// !! todo - for logging requests
// !! todo - create document in logs collection upon registration with a 1 req
// !! todo - every req sent by the front end should add 1 to the req in the logs collections

// Imports
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import HashString from "./mongoConnect.js"; //!! no use of this so far
import { ObjectId } from "mongodb"; //!! no use of this so far
import {
  ConnectMDB,
  CloseMDB,
  LoadFromDB,
  SaveToDB,
  TestConnectMDB,
} from "./mongoConnect.js"; //!! no use of this so far
import nodemailer from "nodemailer"; //!! no use of this so far
import { v4 as uuid } from "uuid"; //!! no use of this so far
import jwt from "jsonwebtoken";
import logger from "./middleware/logger.js";

// importing routes
import { itemsRouter } from "./routes/items.js";
import { usersRouter } from "./routes/users.js";
import { testimonialsRouter } from "./routes/testimonials.js";

// runtdotenv.config()
dotenv.config();

const app = express();

// requests variable
let req = 0;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser());
app.use(logger);

// routes
app.use("/items", itemsRouter);
app.use("/users", usersRouter);
app.use("/testimonials", testimonialsRouter);

// default route
app.get("/", (req, res) => {
  res.send("Connected to TeknoSkena Backend!");
});

// listen for connections
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.HOST}${process.env.PORT}`);
});

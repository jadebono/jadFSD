"use strict";

// Imports
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { logger } from "./middleware/logger.js";
import { ConnectMDB, CloseMDB } from "./mongoConnect.js";

// importing routes
import { itemsRouter } from "./routes/items.js";
import { usersRouter } from "./routes/users.js";
import { testimonialsRouter } from "./routes/testimonials.js";

// run dotenv.config()
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// routes
app.use("/items", itemsRouter);
app.use("/users", usersRouter);
app.use("/testimonials", testimonialsRouter);

// default route
app.get("/", (req, res) => {
  res.send("Connected to TeknoSkena Backend!");
});

// connect to db at server start
ConnectMDB();

// close connection on "exit" and "uncaughtException"
process.on("exit", () => CloseMDB());
process.on("uncaughtException", (error) => {
  console.log(error);
  CloseMDB();
});

// listen for connections
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.HOST}${process.env.PORT}`);
});

"use strict";

// route for all interactions with /testimonials

import express from "express";
import { LoadFromDB } from "../mongoConnect.js";
export const testimonialsRouter = express.Router();

// retrieves testimonials
testimonialsRouter.route("/").get((req, res) => {
  LoadFromDB("testimonials")
    .then((response) => res.send(JSON.stringify(response)))
    .catch((error) => console.log(error));
});

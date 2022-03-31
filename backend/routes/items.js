"use strict";

// route for all interactions with /items

import express from "express";
import { LoadFromDB, SaveToDB, updateDB } from "../mongoConnect.js";
import { ObjectId } from "mongodb";
export const itemsRouter = express.Router();

// retrieves all items
itemsRouter
  .route("/")
  .get((req, res) => {
    LoadFromDB("items")
      .then((response) => res.send(JSON.stringify(response)))
      .catch((error) => console.log(error));
  })
  // admin post route to facilitate posting of shop items
  .post((req, res) => {
    const { img, name, desc, price, offer } = req.body.inputs;
    SaveToDB("items", {
      img: img,
      name: name,
      desc: desc,
      price: price,
      offer: offer,
    })
      .then(console.log("Item saved!", req.body.inputs))
      .catch((error) => console.log(error));
  });

// retrieves items on offer
itemsRouter.route("/offer").get((req, res) => {
  // retrieves those items whose offer === true
  LoadFromDB("items", { offer: true })
    .then((response) => res.send(JSON.stringify(response)))
    .catch((error) => console.log(error));
});

// retrieves only those items with the supplied ID for the shopping cart
itemsRouter.route("/cartItems").get((req, res) => {
  // req.query.cart contains cart so parse it into json and retrieve id
  let cart = req.query.cart.map((item) => JSON.parse(item).id);
  // turn each id into a new ObjectId
  let ids = cart.map((id) => ObjectId(id));
  // params in ob request search for all items that $in(clude) each id in ids
  LoadFromDB("items", { _id: { $in: ids } })
    .then((response) => res.send(JSON.stringify(response)))
    .catch((error) => console.log(error));
});

// route to retrieve user's cart from user's collection
itemsRouter.route("/getUserCart").get((req, res) => {
  const user = req.query.user;
  user
    ? LoadFromDB("users", { _id: { $eq: ObjectId(user) } })
        .then((response) => {
          res.send(response[0].cart);
        })
        .catch((error) => console.log(error))
    : res.send(false);
});

// route to post/update user's cart to user's collection
itemsRouter.route("/postUserCart").post((req, res) => {
  const user = req.body.user;
  const cart = req.body.cart;
  updateDB("users", { _id: ObjectId(user) }, { cart: cart })
    .then(res.send(true))
    .catch((err) => console.log(error));
});

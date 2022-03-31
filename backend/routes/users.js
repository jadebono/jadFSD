"use strict";

// route for all interactions with users

import express from "express";
import HashString from "../mongoConnect.js";
import { LoadFromDB, SaveToDB, updateDB } from "../mongoConnect.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { response } from "express";
import { ObjectId } from "mongodb";
// import { req } from "express/lib/request";
export const usersRouter = express.Router();

/*
function to test if username and/or password exist if test is returned as false, the  username or password exist and the registration will be rejected
*/
async function testUserEmail(obj) {
  const test = await LoadFromDB("users", obj)
    .then((response) => {
      return response.length === 0 ? false : true;
    })
    .catch((error) => console.log(error));
  return test;
}

/*
retrieves the user id of the new user and uses it to create a log document in the logs collection consisting of the new user's id and the number of his requests
*/
async function startNewUserLog(username) {
  LoadFromDB("users", { username: username }).then((response) => {
    const user = { ...response["0"] };
    SaveToDB("log", {
      userId: user._id,
      requests: 1,
    });
  });
}

// function to create the session token
function signSessionToken(id) {
  console.log(`user.id is ${id}`);
  return jwt.sign(
    {
      data: id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "4h" }
  );
}

// function to verify session token
function validateSessionToken(token) {
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

// function to decrypt the user id from the session token
function decryptSessionToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(`decoded.data = ${decoded.data}`);
    return decoded.data;
  } catch (error) {
    return false;
  }
}

// post from email form to email account (mailtrap.io)
usersRouter.route("/email").post(async (req, res) => {
  let fields = req.body.fields;

  //create transport for nodemailer
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // run transport
  await transport
    .sendMail({
      from: fields.email,
      to: "joe@test.com",
      subject: fields.subject,
      html: `<div className="">
      <h2>Here is your email!</h2>
      <p>${fields.body}</p>
      </div>`,
    })
    // !!todo add code to send back to react a message that email was sent successfully
    .then(console.log("email successfully submitted!"))
    .catch((error) => console.log(error));
});

//post to register user
usersRouter.route("/register").post(async (req, res) => {
  const _username = req.body.username;
  const _email = req.body.email;
  const _password = HashString(req.body.password);
  let user;
  // check to see whether username and/or email are already in db
  const testUser = await testUserEmail({ username: _username });
  const testEmail = await testUserEmail({ email: _email });
  if (!testUser && !testEmail) {
    // if not, register new user
    await SaveToDB("users", {
      username: _username,
      email: _email,
      password: _password,
    });
    res.send(true);
    // then start a new document for the user in the log collection
    await startNewUserLog(_username);
  } else {
    res.send(false);
  }
});

//post to signin user
usersRouter.route("/signin").post((req, res) => {
  const username = req.body.username;
  const password = HashString(req.body.password);
  LoadFromDB("users", { username: username })
    .then((response) => {
      const user = { ...response["0"] };
      if (password === user.password) {
        //create token
        const token = signSessionToken(user._id);
        res.send({
          id: user._id,
          username: user.username,
          email: user.email,
          token: token,
        });
      } else {
        res.send("Invalid Login!");
      }
    })
    .catch((error) => console.log(error));
});

// route to validate session
usersRouter.route("/validatesession").post((req, res) => {
  let token = req.body.cookie;
  res.send(validateSessionToken(token));
});

// route to sign in a user if session is still active
usersRouter.route("/sessionSignin").post((req, res) => {
  let token = req.body.cookie;
  console.log(`the token I have received from index is: ${token}`);
  let user = decryptSessionToken(token);
  console.log(`user from Index is: ${user}`);
  // fetch user data
  if (user) {
    LoadFromDB("users", { _id: { $eq: new ObjectId(user) } })
      .then((response) => {
        const loggedUser = response.pop();
        res.send({
          id: loggedUser._id,
          username: loggedUser.username,
          email: loggedUser.email,
          cart: loggedUser.cart,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.send(false);
  }
  // res.send({
  //   id: user._id,
  //   username: user.username,
  //   email: user.email,
  // });
});

// send user data to app

"use strict";

// route for all interactions with users

import dotenv from "dotenv";
import express from "express";
import * as fs from "fs";
import HashString from "../mongoConnect.js";
import { incLog, LoadFromDB, SaveToDB } from "../mongoConnect.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
export const usersRouter = express.Router();

dotenv.config();
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
  await LoadFromDB("users", { username: username }).then(async (response) => {
    const user = { ...response["0"] };
    await SaveToDB("log", {
      userId: user._id,
      requests: 1,
    });
  });
}

// function to create the session token
function signSessionToken(id) {
  const userId = id.toString();
  userId && fs.writeFileSync(`reqs_${userId}.txt`, "1");
  return jwt.sign(
    {
      data: id,
    },
    process.env.SECRET_KEY,
    { expiresIn: process.env.MAX_AGE }
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

    return decoded.data;
  } catch (error) {
    return false;
  }
}

// post from email form to email account (mailtrap.io)
usersRouter.route("/email").post(async (req, res) => {
  let email = req.body.email;
  let subject = req.body.subject;
  let body = req.body.body;

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
      from: email,
      to: "joe@test.com",
      subject: subject,
      html: `<div className="">
      <h2>Here is your email!</h2>
      <p>${body}</p>
      </div>`,
    })
    .then(res.send("email successfully submitted!"))
    .catch((error) => console.log(error));
});

//post to register user
usersRouter.route("/register").post(async (req, res) => {
  const _username = req.body.username;
  const _email = req.body.email;
  const _password = HashString(req.body.password);
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
usersRouter.route("/signin").post(async (req, res) => {
  const username = req.body.username;
  const password = HashString(req.body.password);
  await LoadFromDB("users", { username: username })
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
usersRouter.route("/sessionSignin").post(async (req, res) => {
  let token = req.body.cookie;
  let user = decryptSessionToken(token);
  // fetch user data
  if (user) {
    await LoadFromDB("users", { _id: { $eq: new ObjectId(user) } })
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
});

//route to log number of requests a user has made throughout a session
// and to delete the reqs_${userId}.txt file as cleanup
usersRouter.route("/signOutNode").get(async (req, res) => {
  let userId = req.query.user;
  // if reqs_${userId}.txt are on the server and haven't been deleted by accident or // mistake
  try {
    // reads the number of requests by the length of the string in reqs_${userId}.txt
    let requests = fs
      .readFileSync(`reqs_${userId}.txt`, { encoding: "utf8", flag: "r" })
      .toString().length;
    // updates users document in logs collection by the number of requests in reqs.txt
    await incLog("log", { userId: new ObjectId(userId) }, requests)
      .then(console.log("updated log requests"))
      .catch((err) => console.log(err));
    await fs.unlink(`reqs_${userId}.txt`, (err) => {
      err
        ? console.log(`reqs_${userId}.txt does not exist!`)
        : console.log(`deleted reqs_${userId}.txt`);
    });
  } catch (error) {
    // if either logs.txt and/or reqs.txt has been deleted by accident/mistake
    console.log(
      `reqs_${userId}.txt missing. Request data cannot be calculated and therefore will not be logged!`
    );
  }

  res.send("signing out user");
});

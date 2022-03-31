"use strict";
import axios from "axios";

// code to check for session and if so to log it in

// signin if valid cookie is found
async function sessionSignin(token) {
  let props = {};
  await axios
    .post("http://localhost:4000/users/sessionSignin", { cookie: token })
    .then((response) => {
      const { id, username, email, cart } = { ...response.data };
      props = { id: id, username: username, email: email, cart: cart };
    });
  return props;
}

// validate session
async function reqValidation(token) {
  await axios
    .post("http://localhost:4000/users/validatesession", {
      cookie: token,
    })
    .then((r) => console.log(r.data));
}

export async function session() {
  if (document.cookie && reqValidation(document.cookie.split("=")[1])) {
    console.log("yes, cookie exists and is valid!");
    let props = await sessionSignin(document.cookie.split("=")[1]);
    return props;
  } else {
    return false;
  }
}

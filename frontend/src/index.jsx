import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "./index.css";

// validate session
async function reqValidation(token) {
  await axios
    .post("http://localhost:4000/users/validatesession", {
      cookie: token,
    })
    .then((r) => console.log(r.data));
}

// signin if valid cookie is found
async function sessionSignin() {}

function checkSession() {
  if (document.cookie && reqValidation(document.cookie.split("=")[1])) {
    console.log("yes, cookie exists and is valid!");
    sessionSignin();
  } else {
  }
  console.log("all wrong");
}

checkSession();

ReactDOM.render(<App />, document.getElementById("root"));

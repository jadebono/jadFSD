import axios from "axios";

// Route requests

// function to post user's cart to user's collection for <App/>
export async function postUserCart(cart, userId) {
  await axios
    .post("http://localhost:4000/items/postUserCart", {
      cart,
      user: userId,
    })
    .catch((err) => console.log(err));
}

// function to get user's cart from user's collection for <App/>
export async function getUserCart(userId, setCart) {
  await axios
    .get("http://localhost:4000/items/getUserCart", {
      params: { user: userId },
    })
    .then((response) => {
      response.data ? setCart(response.data) : setCart([]);
    })
    .catch((err) => console.log(err));
}

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
    .catch((err) => console.log(err));
}

// session validation for <App/>
export async function session() {
  if (document.cookie && reqValidation(document.cookie.split("=")[1])) {
    let props = await sessionSignin(document.cookie.split("=")[1]);
    return props;
  } else {
    return false;
  }
}

// async function to let server know that user has signed out to delete the log.txt file

export async function signOutNode() {
  await axios.post("http://localhost:4000/users/signOutNode", "signout");
}

// async function to retrieve all items with offer === true from DB for <Home/>
export async function getOffers(setOffers) {
  await axios
    .get("http://localhost:4000/items/offer")
    .then((response) => {
      setOffers(Array.from(response.data));
    })
    .catch((err) => console.log(err));
}

// async function to retrieve all testimonials for <Home/>
export async function getTestimonials(setTest) {
  await axios
    .get("http://localhost:4000/testimonials")
    .then((response) => setTest(Array.from(response.data)))
    .catch((err) => console.log(err));
}

// async function to register user for <Register/>
export async function postRegister(
  myReg,
  setSnackBar,
  resetSnackBar,
  setConfirmed
) {
  const { username, email, password } = myReg;
  await axios
    .post("http://localhost:4000/users/register", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        setSnackBar({
          state: true,
          colour: "green",
          type: "warning",
          message: "Registration successful, now please sign in.",
        });
        console.log("Registration successful!");
        resetSnackBar();
        setConfirmed((prevConfirmed) => {
          return {
            ...prevConfirmed,
            register: true,
          };
        });
      } else {
        setSnackBar({
          state: true,
          colour: "red",
          type: "warning",
          message: "Registration unsuccessful! Please try again!",
        });
        resetSnackBar();
      }
    });
}

// async function to signIn user for <Register/>
export async function postSignIn(
  signIn,
  setUserState,
  tempUser,
  setConfirmed,
  setSnackBar,
  resetSnackBar
) {
  await axios
    .post("http://localhost:4000/users/signin", signIn)
    .then((response) => {
      if (response.data !== "Invalid Login!") {
        console.log("Sign in successful!");
        setUserState(response.data);
        tempUser = response.data.username;
        setConfirmed((prevConfirmed) => {
          return {
            ...prevConfirmed,
            signIn: true,
          };
        });
      } else {
        setSnackBar({
          state: true,
          colour: "red",
          type: "warning",
          message: "Invalid signin!",
        });
        resetSnackBar();
      }
    });
}

// async function to retrieve all items for <Cart/>
export async function getCartItems(cart, setCartItems) {
  await axios
    .get("http://localhost:4000/items/cartItems", {
      params: { cart: cart },
    })
    .then((response) => setCartItems(Array.from(response.data)))
    .catch((err) => console.log(err));
}

// Function to post the email form contents and then sets submission to true to
// display the returnHome screen for <Email/>.
export async function postState(fields, setSubmission) {
  await axios
    .post("http://localhost:4000/users/email", {
      fields,
    })
    .then(setSubmission(true))
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
}

// async function to retrieve all items for <Shop/>
export async function getItems(setItems) {
  await axios
    .get("http://localhost:4000/items")
    .then((response) => setItems(Array.from(response.data)))
    .catch((err) => console.log(err));
}

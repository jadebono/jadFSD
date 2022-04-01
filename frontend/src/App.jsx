import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Form from "./components/Form";
import Admin from "./components/Dash";
import Email from "./components/Email";
import Register from "./components/Register";
import Dfield from "./components/Dfield";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { getUserCart, postUserCart, session } from "./requests";

export default function App() {
  const [display, setDisplay] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    async function getSession() {
      if (user.id === "" && session()) {
        let sessUser = await session();
        console.log("sessuser is: ", sessUser);
        setUser((prevUser) => {
          return {
            id: sessUser.id,
            username: sessUser.username,
            email: sessUser.email,
          };
        });
      }
    }
    getSession();
    getUserCart(user.id, setCart);
  }, [user.id]);

  useEffect(() => {
    if (cart.length) {
      let newCartItems = cart
        .map((item) => parseInt(item.qty))
        .reduce((accum, counter) => accum + counter);
      setCartQty((prevCartItems) => newCartItems);
    } else {
      session();
      setCartQty(0);
    }
  }, [cart]);

  useEffect(() => {
    if (user.id !== "") postUserCart(cart, user.id);
  }, [cart]);

  useEffect(() => {
    getUserCart(user.id, setCart);
  }, [user.id]);

  function goPage(display) {
    setDisplay(display);
  }

  // to provide as prop to <Register/>
  function setUserState(user) {
    //save cookie manually
    document.cookie = `session=${user.token} `;
    // set user data
    setUser((prevUser) => {
      return { id: user.id, username: user.username, email: user.email };
    });
  }

  // to provide as prop to <Register/>
  function signOutUser() {
    console.log("sign out code received");
    //save cookie manually
    document.cookie = `session=""`;
    // set user data
    setUser((prevUser) => {
      return { id: "", username: "", email: "" };
    });
  }

  function deleteItem(item) {
    let len = cart.length;
    for (let i = 0; i < len; i++) {
      // search for the id of the supplied item and return all items except that one
      if (cart[i].id === item.id) {
        setCart((oldCart) => [
          ...oldCart.filter((oldItem) => oldItem.id !== item.id),
        ]);
      }
    }
    // if any items are left recalculate the new total cart items
    if (cart.length > 0) {
      let fewerCartItems = cart
        .map((item) => parseInt(item.qty))
        .reduce((accum, counter) => accum + counter);
      setCartQty((prevCartItems) => fewerCartItems);
    }
  }

  function getItem(item) {
    // if cart state empty, set item as the first element
    if (!cart.length) {
      setCart([item]);
      // otherwise check if the item is already present
    } else {
      let len = cart.length;
      for (let i = 0; i < len; i++) {
        // if it is present, remove the previous item and replace it with the one with
        // the new quantity
        if (cart[i].id === item.id) {
          setCart((oldCart) => [
            ...oldCart.filter((oldItem) => oldItem.id !== item.id),
          ]);
        }
      }
      // otherwise just add the new item
      setCart((oldCart) => [...oldCart, item]);
    }
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <React.Fragment>
      <div>
        <NavBar
          goPage={goPage}
          cartQty={cartQty}
          signedin={user.username ? true : false}
        />
      </div>
      <div className="my-4">
        {display === "home" ? (
          <Home getItem={getItem} deleteItem={deleteItem} cart={cart} />
        ) : display === "form" ? (
          <Form />
        ) : display === "dash" ? (
          <Admin />
        ) : display === "email" ? (
          <Email goPage={goPage} />
        ) : display === "signup" ? (
          <Register
            goPage={goPage}
            setUserState={setUserState}
            user={user}
            signOutUser={signOutUser}
          />
        ) : display === "dfield" ? (
          <Dfield />
        ) : display === "shop" ? (
          <Shop getItem={getItem} deleteItem={deleteItem} cart={cart} />
        ) : display === "cart" && cart.length ? (
          <Cart
            getItem={getItem}
            cart={cart}
            deleteItem={deleteItem}
            cartQty={cartQty}
            emptyCart={emptyCart}
          />
        ) : (
          <Home getItem={getItem} deleteItem={deleteItem} cart={cart} />
        )}
      </div>
      <div className="">
        <Footer />
      </div>
    </React.Fragment>
  );
}

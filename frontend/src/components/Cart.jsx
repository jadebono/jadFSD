import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

// supply id for each item in props.cart array
// getCartItems for each id

export default function Cart(props) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState({ total: 0, vat: 0 });
  // change the vatRate in this variable here (not a state variable!)
  const vatRate = 18;

  useEffect(() => {
    getCartItems(props.cart);
    calcTotal(props.cart);
  }, [props.cart]);

  function calcTotal(cart) {
    if (cart.length) {
      let newTotal = cart
        .map((item) => item.total)
        .reduce((accum, counter) => accum + counter)
        .toFixed(2);
      let newVat = ((vatRate * newTotal) / 100).toFixed(2);
      setTotal({
        total: parseFloat(newTotal),
        vat: parseFloat(newVat),
      });
    } else {
      setTotal({ total: 0, vat: 0 });
    }
  }

  // async function to retrieve all items for Cart page
  async function getCartItems(cart) {
    await axios
      .get("http://localhost:4000/items/cartItems", {
        params: { cart: cart },
      })
      .then((response) => setCartItems(Array.from(response.data)))
      .catch((err) => console.log(err));
  }

  // takes id of current item in the cartItems.map
  function testItem(id) {
    let qty = 0;
    // if there are any items in props.cart,
    // set the qty of the item in cartItems.map to match the qty of the same
    // item in the cart.
    if (props.cart.length > 0) {
      for (let i = 0; i < props.cart.length; i++) {
        if (props.cart[i].id === id) {
          qty = props.cart[i].qty;
        }
      }
    }
    // return qty as an int
    return parseInt(qty);
  }

  // empties the cart with one click
  function emptyCart() {
    setCartItems([]);
    setTotal({ total: 0, vat: 0 });
    props.emptyCart();
  }

  return (
    <React.Fragment>
      <div className="flex flex-row justify-center ">
        <div className="p-4 mt-5 mb-20 mx-5 grid grid-cols-6 gap-20 ">
          <div
            className="p-4 border-4 border-red-900 bg-red-600 rounded-md shadow-xl text-white font-bold text-center cursor-pointer hover:bg-red-700 hover:text-white transition ease-out duration-500"
            onClick={emptyCart}
          >
            Empty cart
          </div>
          <div className="p-4 border-4 border-blue-900 bg-blue-700 rounded-md shadow-xl text-white font-bold text-center">
            <span className="">Items:</span>{" "}
            <span className="">{props.cartQty}</span>
          </div>
          <div className="p-4 border-4 border-blue-900 bg-blue-700 rounded-md shadow-xl text-white font-bold text-center">
            Total before vat: €<span className="">{total.total}</span>
          </div>
          <div className="p-4 border-4 border-blue-900 bg-blue-700 rounded-md shadow-xl text-white font-bold text-center">
            Vat @ {vatRate}%: €<span className="">{total.vat}</span>
          </div>
          <div className="p-4 border-4 border-blue-900 bg-blue-700 rounded-md shadow-xl text-white font-bold text-center">
            Payment total: €
            <span className="">{(total.total + total.vat).toFixed(2)}</span>
          </div>
          <div className="flex flex-row p-4 border-4 justify-center border-orange-900 rounded-md shadow-xl bg-orange-600 text-white font-bold text-center cursor-pointer hover:bg-orange-700 transition ease-out duration-500">
            <span className="mr-2">Checkout</span>
            <span className="ml-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-20 mx-5 grid grid-cols-3 ">
        {cartItems.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            img={item.img}
            name={item.name}
            desc={item.desc}
            price={item.price}
            qty={item.qty}
            currentQty={testItem(item._id)}
            getItem={props.getItem}
            deleteItem={props.deleteItem}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

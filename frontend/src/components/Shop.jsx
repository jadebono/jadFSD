import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getItems } from "../requests";

export default function Shop(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems(props.userId, setItems);
  }, [props.userId]);

  !items.length && getItems(props.userId, setItems);

  // takes id of current item in the items.map
  function testItem(id) {
    let qty = 0;
    // if there are any items in props.cart,
    // set the qty of the item in items.map to match the qty of the same
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

  return (
    <React.Fragment>
      <div className="mt-5 mb-20 mx-5 grid grid-cols-3 ">
        {items.map((item) => (
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

import React, { useState } from "react";
import axios from "axios";
import Field from "../components/Field";

export default function Dfield() {
  const [items, setitems] = useState([]);

  // async function to retrieve all items
  async function getItems() {
    await axios
      .get("http://localhost:4000/allitems")
      .then((response) => setitems(response.data))
      .catch((err) => console.log(err));
  }

  !items.length && getItems();

  return (
    <React.Fragment>
      {items.map((ele) => (
        <Field
          key={ele._id}
          img={ele.img}
          name={ele.name}
          desc={ele.desc}
          price={ele.price}
          offer={ele.offer}
          qty={ele.qty}
        />
      ))}
    </React.Fragment>
  );
}

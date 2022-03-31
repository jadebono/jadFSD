import React, { useState } from "react";

export default function Card(props) {
  const [item, setItem] = useState({
    id: props.id,
    qty: props.qty,
    total: props.price * props.currentQty,
  });

  //creates an array from props.qty and then uses it to map a selector element
  let qty = [];
  for (let i = 0; i <= props.qty; i++) {
    qty.push(i);
  }
  const option = qty.map((i) => (
    <option key={i} value={i}>
      {i}
    </option>
  ));

  // sets state with id, qty  and total of item
  function handleChange(evt) {
    let qty = parseInt(evt.target.value);
    let price = parseFloat(props.price);
    let total = parseFloat((qty * price).toFixed(2));
    setItem((prevItem) => ({
      id: props.id,
      qty: qty,
      total: total,
    }));
  }

  // if tempItem has an id and a qty greater than 0
  // send the state to <App/> for adding to cart
  function addCart() {
    if (item.id && item.qty > 0) {
      //send item to <App/>
      props.getItem(item);
    }
  }

  // if item has an id send the state to <App/> to delete from cart
  function delItem() {
    if (item.id && item.qty > 0) {
      props.deleteItem(item);
    }
  }

  return (
    <React.Fragment>
      <div className="m-4 w-5/6 flex items-center rounded-xl shadow-lg border border-1 border-blue-700">
        <div className="">
          <div className="m-auto p-4 w-3/4 flex justify-center">
            {" "}
            <img className="w-5/6" src={props.img} alt={props.name} />{" "}
          </div>
          <div className="flex flex-row justify-between">
            <div className="m-4 p-1 w-2/5 bg-orange-600 text-center rounded-lg text-white ">
              {props.name}
            </div>
            <div className="flex my-4 ml-4 mr-2 p-1 w-8 h-8 text-center items-center justify-center rounded-full bg-orange-600 text-white font-bold">
              {props.currentQty}
            </div>
          </div>
          <div className="mx-4 text-justify">{props.desc}</div>
          <div className="mx-2 my-4">
            <div className="grid grid-cols-12 gap-1 text-center">
              <div
                className="flex flex-row items-center justify-center col-span-3 bg-yellow-300 text-blue-900 font-bold rounded-2xl cursor-pointer hover:bg-yellow-500"
                onClick={addCart}
              >
                Add to Cart
              </div>

              <div className="col-span-3">
                Price: <span className="font-bold">€{props.price}</span>
              </div>
              <div className="col-span-2">
                <form className="bg-gray-200 rounded-lg font-medium ">
                  <label className="font-bold mr-2" htmlFor="qty">
                    Qty:
                  </label>
                  <select
                    className="transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-2 focus:outline-blue-700 "
                    name="qty"
                    id="qty"
                    onClick={handleChange}
                  >
                    {option}
                  </select>
                </form>
              </div>
              <div className="col-span-3">
                Total:{" "}
                <span className="font-bold">
                  €{(props.price * props.currentQty).toFixed(2)}
                </span>
              </div>
              <div
                className="col-span-1 flex justify-end mr-1 "
                onClick={delItem}
              >
                <svg
                  className="w-6 h-6 bg-red-600 text-white font-bold p-1 rounded-full hover:bg-red-900 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

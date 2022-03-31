import React, { useState, useEffect } from "react";
import Card from "./Card";
import Testimonial from "./Testimonial";
import axios from "axios";

export default function Home(props) {
  const [offers, setOffers] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    getOffers();
    getTestimonials();
  }, []);

  // async function to retrieve all items with offer === true from DB
  async function getOffers() {
    await axios
      .get("http://localhost:4000/items/offer")
      .then((response) => setOffers(Array.from(response.data)))
      .catch((err) => console.log(err));
  }

  // async function to retrieve all testimonials
  async function getTestimonials() {
    await axios
      .get("http://localhost:4000/testimonials")
      .then((response) => setTest(Array.from(response.data)))
      .catch((err) => console.log(err));
  }

  // takes id of current item in the offers.map
  function testItem(id) {
    let qty = 0;
    // if there are any items in props.cart,
    // set the qty of the item in offers.map to match the qty of the same
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
      <div className="mt-5 mb-20">
        <div className="grid mx-4 my-2 gap-4">
          <div className="flex flex-row">
            <div className="">
              <h1 className=" text-blue-900 text-3xl font-serif">ΤΕΚΝΟΣΚΕΝΑ</h1>
              <p className="inline-block text-blue-900 text-2xl  font-serif">
                where hero computers are forged
              </p>
            </div>
            <div className="p-3 ml-80 text-3xl font-extrabold  text-orange-600">
              Current Offers
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-14">
            <div className="col-span-4">
              <div className="border-b-2 border-gray-300 bg-gray-100 shadow-xl rounded-lg">
                {test.map((item) => (
                  <Testimonial
                    key={item._id}
                    headline={item.tag}
                    text={item.text}
                    img={`http://localhost:3001/${item.img}`}
                    name={item.name}
                    age={item.age}
                    occupation={item.occ}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-8">
              <div className="grid-cols-2 flex">
                {offers.map((item) => (
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

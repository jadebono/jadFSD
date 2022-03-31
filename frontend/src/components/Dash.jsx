import axios from "axios";
import React, { useState } from "react";

export default function Dash() {
  const [inputs, setInputs] = useState({
    img: "",
    name: "",
    desc: "",
    price: "",
    offer: false,
  });

  async function postState() {
    await axios
      .post("http://localhost:4000/items", {
        inputs,
      })
      .then(
        setInputs({
          img: "",
          name: "",
          desc: "",
          price: "",
          offer: false,
        })
      );
  }

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;
    setInputs((prevInputs) => {
      return { ...prevInputs, [name]: type === "checkbox" ? checked : value };
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    postState();
  }

  return (
    <React.Fragment>
      <div className="flex justify-center mt-20">
        <div className="flex flex-col justify-center w-1/3 items-center bg-blue-50 rounded-2xl border-2 border-blue-700">
          <form
            className="bg-white w-2/3 m-10 rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-blue-700 font-bold"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col ml-4 my-2">
              <label className="" htmlFor="img">
                Img URL:
              </label>
            </div>
            <div className="flex flex-col">
              <input
                name="img"
                type="url"
                value={inputs.img || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-col mt-4 ml-4 mb-2">
              <label className="" htmlFor="name">
                Name:
              </label>
            </div>
            <div className="flex flex-col">
              <input
                name="name"
                type="text"
                value={inputs.name || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-col mt-4 ml-4 mb-2">
              <label className="" htmlFor="desc">
                Description:
              </label>
            </div>
            <div className="flex flex-col">
              <input
                name="desc"
                type="text"
                value={inputs.desc || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-col mt-4 ml-4 mb-2">
              <label className="" htmlFor="price">
                Price:
              </label>
            </div>
            <div className="flex flex-col">
              <input
                name="price"
                type="number"
                value={inputs.price || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex my-4 ml-4">
              <div className="flex flex-row mr-2">
                <label className="m-auto" htmlFor="offer">
                  Offer
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  // this key forces the checkbox to re-render while waiting for  setInputs() to update the state
                  key={Math.random()}
                  name="offer"
                  type="checkbox"
                  value={inputs.offer}
                  defaultChecked={inputs.offer}
                  onChange={handleChange}
                  className="m-auto"
                />
              </div>
            </div>
            <div className="flex flex-row mb-4 justify-around">
              <button className="border border-blue-700 text-blue-700 rounded-lg w-20 hover:border-white hover:bg-blue-700 hover:text-white transition ease-out duration-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

import axios from "axios";
import React, { useState } from "react";

export default function Form() {
  const [inputs, setInputs] = useState({ username: "", email: "" });

  async function postState() {
    await axios.post("http://localhost:4000/post", {
      inputs,
    });
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setInputs((prevInputs) => {
      return { ...prevInputs, [name]: value };
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    postState();
  }

  return (
    <React.Fragment>
      <div className="my-10 flex justify-center">
        <div className="flex flex-col justify-center w-1/3 h-3/4 items-center bg-blue-50 rounded-2xl border-2 border-blue-700">
          <form
            className="bg-white w-2/3 my-10 rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-blue-700 font-bold"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col ml-4 mb-2">
              <label className="" htmlFor="username">
                Username:
              </label>
            </div>
            <div className="flex flex-col">
              <input
                name="username"
                type="text"
                value={inputs.username || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-col mt-4 ml-4 mb-2">
              <label className="" htmlFor="email">
                Email:
              </label>
            </div>
            <div className="flex flex-col">
              <input
                name="email"
                type="email"
                value={inputs.email || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-row m-4 justify-around">
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

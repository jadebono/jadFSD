import React, { useState } from "react";

export default function Field(props) {
  return (
    <React.Fragment>
      <div className="flex flex-row text-center align-bottom justify-center mb-10 ">
        <div className="grid grid-cols-12 border-4 border-blue-700 my-4 ">
          <div className="col-span-3 my-2">
            <div className="">{props.img}</div>
            <div className="mt-4">
              <button className="btn-form">Edit</button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="">{props.name}</div>
            <div className="mt-4">
              <button className="btn-form">Edit</button>
            </div>
          </div>
          <div className="col-span-4">
            <div className="">{props.desc}</div>
            <div className="mt-4">
              <button className="btn-form">Edit</button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="">€{props.price}</div>
            <div className="mt-4">
              <button className="btn-form">Edit</button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="">{props.offer ? "true" : "false"}</div>
            <div className="mt-4">
              <button className="btn-form">Edit</button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="">{props.qty}</div>
            <div className="mt-4">
              <button className="btn-form">Edit</button>
            </div>
          </div>
          <div className="col-span-1">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

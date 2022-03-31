import React, { useState } from "react";

// <div className=""></div>

export default function Testimonial(props) {
  return (
    <React.Fragment>
      <div className="m-4">
        <div className="text-blue-700 font-bold italic">{props.headline}</div>
        <div className="flex flex-row justify-evenly align-middle ">
          <div className="text-justify mr-2 ">{props.text}</div>
          <img
            className="roundedlg w-1/4 object-scale-down"
            src={props.img}
            alt=""
          />
        </div>
        <div className="flex flex-col items-left">
          <div className="text-blue-700 font-bold">{props.name}</div>
          <div className="text-gray-600  font-bold">{props.age} years old</div>
          <div className="text-orange-600  font-bold">{props.occupation}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

import React, { useState } from "react";

export default function NavBar(props) {
  const cartQty = (
    <div className="flex ml-4 mr-2 p-1  w-8 h-8 text-center items-center justify-center rounded-full bg-orange-600 text-white font-bold ">
      {props.cartQty}
    </div>
  );

  return (
    <React.Fragment>
      <div className="bg-gradient-to-t from-blue-900 to-blue-700 text-white flex flex-row w-full h-16 items-center gap-4 justify-between">
        <div className="ml-5 my-3 flex gap-5">
          <div
            className="font-serif nav-btn"
            onClick={() => props.goPage("home")}
          >
            τεknοskεnα
          </div>
          <div className="nav-btn">Account</div>
          <div className="nav-btn" onClick={() => props.goPage("form")}>
            Database Form
          </div>
          <div className="nav-btn" onClick={() => props.goPage("dash")}>
            Dashboard
          </div>
          <div className="nav-btn" onClick={() => props.goPage("dfield")}>
            DField
          </div>
          <div className="nav-btn" onClick={() => props.goPage("shop")}>
            Shop
          </div>
        </div>
        <div className="mr-5 flex gap-5 my-3">
          <div
            className="nav-btn flex flex-row items-center"
            onClick={() => props.goPage("email")}
          >
            <svg
              className="w-6 h-6 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex flex-row nav-btn items-center">
            <div className="mr-1">
              <svg
                className={
                  props.signedin ? "w-6 h-6 text-orange-600" : "w-6 h-6"
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-1" onClick={() => props.goPage("signup")}>
              Register/Sign in/out
            </div>
          </div>
          <div
            className="nav-btn flex flex-row items-center"
            onClick={() => props.goPage("cart")}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <div className="py-1">{props.cartQty > 0 && cartQty}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

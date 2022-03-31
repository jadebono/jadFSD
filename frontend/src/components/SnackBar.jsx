import React from "react";

export default function SnackBar(props) {
  const outer = `w-1/4 mx-auto mt-20 absolute inset-0 z-10`;
  const middle = `bg-${props.colour}-500 text-white uppercase font-bold px-4 py-2 rounded-t-lg`;
  const lower = `border border-${props.colour}-400 bg-red-100 px-4 py-3 text-${props.colour}-700 text-lg rounded-b-lg`;

  return (
    <React.Fragment>
      <div className={outer} role="alert">
        <div className={middle}>{props.type}</div>
        <div className={lower}>
          <p>{props.message}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

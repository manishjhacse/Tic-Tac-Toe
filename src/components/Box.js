import React from "react";

export default function (props) {
  return (
    <div
      style={props.symbol === "X" ? { color: "red" } : { color: "blue" }}
      onClick={props.onClick}
      className={`h-14 text-2xl font-bold w-14 cursor-pointer flex justify-center items-center`}
    >
      {props.symbol}
    </div>
  );
}

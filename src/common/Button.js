import React from "react";

const Button = ({ onClick, label }) => (
  <div className="button-wrapper" onClick={() => onClick()}>
    <button>{ label }</button>
  </div>
);

export default Button;

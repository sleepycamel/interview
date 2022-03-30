import React from "react";
import styles from "./Button.module.sass";

const Button = ({ id, value, type, onClick }) => {
  const className = styles[id] || styles[type];
  console.log({type, styles, className});
  return (
    <button id={id} className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;

import React from "react";
import styles from "./Button.module.sass";

const Button = ({ id, value, type, onClick }) => {
  const className = styles[id] || styles[type];
  return (
    <button id={id} className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;

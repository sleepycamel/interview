import React from "react";
import styles from "./Button.module.sass";

const Button = ({ className, value, onClick }) => {
  return (
    <button className={styles[className]} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;

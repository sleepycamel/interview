import React from "react";
import { Textfit } from "react-textfit";
import styles from "./Screen.module.sass";

const Screen = ({ value }) => {
  return (
    <Textfit className={styles.screen} mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;

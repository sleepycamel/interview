import { Textfit } from "react-textfit";
import styles from "./Readout.module.sass";

const Readout = ({ value }) => {
  return (
    <Textfit className={styles.readout} mode="single" max={75}>
      {value}
    </Textfit>
  );
};

export default Readout;

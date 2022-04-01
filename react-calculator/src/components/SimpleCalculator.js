import React, { useState, useEffect } from "react";
import { Textfit } from "react-textfit";

import styles from "../styles/SimpleCalculator.module.sass";
import Button from "./Button";
import {StartState} from "../lib/CalculatorState";
import {keyToAction} from "../lib/helpers";
import {READOUT_MAX_FONTSIZE} from "../lib/constants";

const START_STATE = new StartState();

export default function SimpleCalculator() {
  const [state, setState] = useState(START_STATE);
  const onKeyDown = evt => {
    const {key} = evt;
    const action = keyToAction(key);
    if (action) {
      // Update state using function to avoid stale closure
      setState((oldState) => {
        const newState = oldState.process(...action);
        console.log({oldState, newState});
        return newState;
      });
    }
  };

  useEffect( () => {
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown) }
  }, [])


  const onClick = (type, id, value) => {
    console.log('onClick', {type, id, value});
    const newState = state.process(type, id, value);
    console.log({oldState: state, newState});
    setState(newState);
  };

  const activeOperator = state.getOperator();
  const readout = state.getReadout();

  return (
      <div className={styles.SimpleCalculator}>
        <Textfit className={styles.readout} mode="single" max={READOUT_MAX_FONTSIZE}>
          {readout}
        </Textfit>
        <div className={styles.buttons}>
          <Button id="clear" value="AC" type="function" onClick={onClick}/>
          <Button id="sign" value="±" type="function"  onClick={onClick} />
          <Button id="percent" value="%" type="function"  onClick={onClick} />
          <Button id="divide" value="÷" type="operator"  onClick={onClick} isActive={activeOperator === 'divide'} />
          <Button id="num7" value={7} onClick={onClick} />
          <Button id="num8" value={8} onClick={onClick} />
          <Button id="num9" value={9} onClick={onClick} />
          <Button id="multiply" value="x" type="operator"  onClick={onClick} isActive={activeOperator === 'multiply'} />
          <Button id="num4" value={4} onClick={onClick} />
          <Button id="num5" value={5} onClick={onClick} />
          <Button id="num6" value={6} onClick={onClick} />
          <Button id="subtract" value="-" type="operator" onClick={onClick} isActive={activeOperator === 'subtract'} />
          <Button id="num1" value={1} onClick={onClick} />
          <Button id="num2" value={2} onClick={onClick} />
          <Button id="num3" value={3} onClick={onClick} />
          <Button id="add" value="+" type="operator" onClick={onClick} isActive={activeOperator === 'add'} />
          <Button id="num0" value={0} onClick={onClick} />
          <Button id="point" value="." onClick={onClick} />
          <Button id="equal" value="=" type="operator" onClick={onClick} />
        </div>
      </div>
  );
}


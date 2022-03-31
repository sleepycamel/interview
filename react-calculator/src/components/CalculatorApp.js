import React, { useState, useEffect, useCallback } from "react";

import styles from "./CalculatorApp.module.sass";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import {StartState} from "../lib/CalculatorState";

// const Op = (id, val) => ({ type: 'op', id, val: val || id });
// const Num = (val) => ({ type: 'num', id: `num${val}`, val});
// const Func = (id, val) => ({type: 'func', id, val});
//
// const buttons = [
//     [Func("clear", "AC"), Func("sign", "±"), Func("percent", "%"), Func("divide", "÷")]
//     [Num(7), Num(8), Num(9), Op("multiply", "x")],
//
// ]
// const btnValues = [
//
//   ["C", "+-", "%", "/"],
//   [7, 8, 9, "X"],
//   [4, 5, 6, "-"],
//   [1, 2, 3, "+"],
//   [0, ".", "="],
// ];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const START_STATE = new StartState();

export default function CalculatorApp() {
  const [state, setState] = useState(START_STATE);
  const onKeyDown = (key, oldState) => {
    console.log('onKeyDown', {key, oldState});
    let action;
    if ('0123456789'.includes(key)) {
      action = ['number', `num${key}`, parseInt(key)];
    } else if (key === '.') {
      action = ['number', 'point', key];
    }
    if (action) {
      const newState = oldState.process(...action);
      console.log({oldState, newState});
      setState(newState);
    }
  };

  useEffect( () => {
    console.log('mount');
    document.addEventListener("keydown", (event) => onKeyDown(event.key, state));
    return () => { console.log('cleanup'); document.removeEventListener("keydown", onKeyDown) }
  }, [])


  const onClick = (type, id, value) => {
    console.log('onClick', {type, id, value});
    const newState = state.process(type, id, value);
    console.log({oldState: state, newState});
    setState(newState);
  };

  return (
      <div className={styles.CalculatorApp}>
        <Screen value={state.readout} />
        <ButtonBox>
          <Button id="clear" value="AC" type="function" onClick={onClick} />
          <Button id="sign" value="±" type="function"  onClick={onClick} />
          <Button id="percent" value="%" type="function"  onClick={onClick} />
          <Button id="divide" value="÷" type="operator"  onClick={onClick} />
          <Button id="num7" value={7} onClick={onClick} />
          <Button id="num8" value={8} onClick={onClick} />
          <Button id="num9" value={9} onClick={onClick} />
          <Button id="multiply" value="x" type="operator"  onClick={onClick} />
          <Button id="num4" value={4} onClick={onClick} />
          <Button id="num5" value={5} onClick={onClick} />
          <Button id="num6" value={6} onClick={onClick} />
          <Button id="subtract" value="-" type="operator" onClick={onClick} />
          <Button id="num1" value={1} onClick={onClick} />
          <Button id="num2" value={2} onClick={onClick} />
          <Button id="num3" value={3} onClick={onClick} />
          <Button id="add" value="+" type="operator" onClick={onClick} />
          <Button id="num0" value={0} onClick={onClick} />
          <Button id="point" value="." onClick={onClick} />
          <Button id="equal" value="=" type="operator" onClick={onClick} />
        </ButtonBox>
      </div>
  );
}


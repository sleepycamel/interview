import React, { useState } from "react";

import styles from "./CalculatorApp.module.sass";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";

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

export default function CalculatorApp() {
  return (
      <div className={styles.CalculatorApp}>
        <Screen value={0} />
        <ButtonBox>
          <Button id="clear" value="AC" type="function" />
          <Button id="sign" value="±" type="function" />
          <Button id="percent" value="%" type="function" />
          <Button id="divide" value="÷" type="operator" />
          <Button id="num7" value={7} />
          <Button id="num8" value={8} />
          <Button id="num9" value={9} />
          <Button id="multiply" value="x" type="operator" />
          <Button id="num4" value={4} />
          <Button id="num5" value={5} />
          <Button id="num6" value={6} />
          <Button id="subtract" value="-" type="operator" />
          <Button id="num1" value={1} />
          <Button id="num2" value={2} />
          <Button id="num3" value={3} />
          <Button id="add" value="+" type="operator" />
          <Button id="num0" value={0} />
          <Button id="point" value="." />
          <Button id="equal" value="=" type="operator" />
        </ButtonBox>
      </div>
  );
}


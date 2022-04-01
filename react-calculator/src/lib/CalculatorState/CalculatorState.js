import { StartState } from './';
import {maxDigits, BUTTONS_TO_OP} from "../constants";

export default class CalculatorState {

  accumulator1 = "0";
  accumulator2 = null;
  accumulator3 = null;
  operator1 = null;
  operator2 = null;

  constructor(args) {
    Object.assign(this, args);
  }

  process(type, id, value) {
    if (id === 'clear') {
      return new StartState();
    }
    return this; // noop
  }

  getOperator() { return null };

  getReadout() {
    return parseFloat(this.accumulator1).toLocaleString(undefined, {maximumFractionDigits: maxDigits});
  }

  calculate() {
    const {accumulator1, operator1, accumulator2, operator2, accumulator3} = this;
    const val1 = parseFloat(accumulator1);
    const val2 = parseFloat(accumulator2);
    const val3 = parseFloat(accumulator3);
    const op1 = BUTTONS_TO_OP[operator1];
    const op2 = BUTTONS_TO_OP[operator2];
    let result;
    if (op1 && op2) {
      // eslint-disable-next-line no-eval
      result = eval(`${val1}${op1}${val2}${op2}${val3}`);
      this.accumulator1 = result.toString();
      this.operator2 = null;
      this.accumulator3 = null;
    } else if (op1) {
      // eslint-disable-next-line no-eval
      result = eval(`${val1}${op1}${val2}`);
      this.accumulator1 = result.toString();
    }
    return result;
  }
}


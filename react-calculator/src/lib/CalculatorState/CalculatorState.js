import { StartState } from './';
import {maxDigits} from "../constants";

export default class CalculatorState {

  accumulator1 = "0";
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
    const {accumulator1, operator1, accumulator2} = this;
    const val1 = parseFloat(accumulator1);
    const val2 = parseFloat(accumulator2);
    const opts = { add: '+', subtract: '-', multiply: '*', divide: '/' };
    const op = opts[operator1];
    const result = eval(`${val1}${op}${val2}`);
    this.accumulator1 = result.toLocaleString(undefined, {maximumFractionDigits: maxDigits})
    this.accumulator2 = this.operator1 = null;
    console.log({result});
    return result;
  }
}


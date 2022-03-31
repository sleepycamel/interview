import { CalculatorState, StartState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetSecondFloatState extends CalculatorState {
  constructor(accumulator1, accumulator2, operator1) {
    const val = parseFloat(accumulator2);
    let readout = accumulator2;
    if (val !== 0) {
      readout = val.toLocaleString(undefined, {maximumFractionDigits: maxDigits});
    }
    if (!readout.includes('.')) readout += '.';
    super(accumulator1, readout);
  }
  process(type, id, value) {
    const accumulator1 = this.accumulator1;
    const newAccumulator1 = appendDigit(this.accumulator1, value);
    if (id === 'clear') {
      return new StartState();
    } else if (id === 'point' && numDigits(this.accumulator1) < maxDigits) {
      return new GetSecondFloatState(newAccumulator1);
    } else if (id === 'point') {
      return this; // noop - 1 decimal point per number
    } else if (id === 'sign') {
      return new GetSecondFloatState(toggleSign(this.accumulator1))
    } else if (type === 'number' && numDigits(accumulator1) === maxDigits) {
      return this; // noop - max number of digits reached
    } else if (type === 'number') {
      const newAccumulator1 = `${this.accumulator1}${value}`;
      return new GetSecondFloatState(newAccumulator1);
    }


    // else if (type === 'operator' && id !== 'equal') {
    //   return new FirstOperatorState(this.accumulator1, id);
    // }

    return this;
  }
}

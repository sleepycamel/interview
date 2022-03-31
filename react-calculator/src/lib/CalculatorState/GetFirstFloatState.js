import { CalculatorState, FirstOperatorState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetFirstFloatState extends CalculatorState {
  constructor(accumulator1) {
    const val = parseFloat(accumulator1);
    let readout = accumulator1;
    if (val !== 0) {
      readout = val.toLocaleString(undefined, {maximumFractionDigits: maxDigits});
    }
    if (!readout.includes('.')) readout += '.';
    super(accumulator1, readout);
  }
  process(type, id, value) {
    const accumulator1 = this.accumulator1;
    const newAccumulator1 = appendDigit(this.accumulator1, value);
    if (id === 'point' && numDigits(this.accumulator1) < maxDigits) {
      return new GetFirstFloatState(newAccumulator1);
    } else if (id === 'point') {
      return this; // noop - 1 decimal point per number
    } else if (id === 'sign') {
      return new GetFirstFloatState(toggleSign(this.accumulator1))
    } else if (type === 'number' && numDigits(accumulator1) === maxDigits) {
      return this; // noop - max number of digits reached
    } else if (type === 'number') {
      const newAccumulator1 = `${this.accumulator1}${value}`;
      return new GetFirstFloatState(newAccumulator1);
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState(this.accumulator1, id);
    }

    return super.process(type, id, value);
  }
}


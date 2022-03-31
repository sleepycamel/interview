import { CalculatorState, GetFirstFloatState, FirstOperatorState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetFirstNumberState extends CalculatorState {
  constructor(accumulator1) {
    let readout = accumulator1;
    const val = parseInt(accumulator1);
    readout = val.toLocaleString();
    super(accumulator1, readout);
  }
  process(type, id, value) {
    const newAccumulator1 = appendDigit(this.accumulator1, value);
    if (id === 'point' && numDigits(this.accumulator1) < maxDigits) {
      return new GetFirstFloatState(newAccumulator1);
    } else if (id === 'sign') {
      return new GetFirstNumberState(toggleSign(this.accumulator1))
    } else if (type === 'number' && numDigits(this.accumulator1) < maxDigits) {
      return new GetFirstNumberState(newAccumulator1);
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState(this.accumulator1, id);
    }

    return super.process(type, id, value);
  }
}


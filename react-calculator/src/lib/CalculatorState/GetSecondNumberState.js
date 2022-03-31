import { CalculatorState, StartState, GetSecondFloatState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetSecondNumberState extends CalculatorState {
  constructor(accumulator1) {
    let readout = accumulator1;
    const val = parseInt(accumulator1);
    readout = val.toLocaleString();
    super(accumulator1, readout);
  }

  process(type, id, value) {
    const newAccumulator1 = appendDigit(this.accumulator1, value);
    if (id === 'clear') {
      return new StartState();
    } else if (id === 'point' && numDigits(this.accumulator1) < maxDigits) {
      return new GetSecondFloatState(newAccumulator1);
    } else if (id === 'sign') {
      return new GetSecondNumberState(toggleSign(this.accumulator1))
    } else if (type === 'number' && numDigits(this.accumulator1) === maxDigits) {
      return this; // noop - max number of digits reached
    } else if (type === 'number') {
      return new GetSecondNumberState(newAccumulator1);
    }
    return super.process(type, id, value);
  }
}

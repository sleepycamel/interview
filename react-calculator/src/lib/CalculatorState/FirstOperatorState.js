import { CalculatorState, GetSecondFloatState, GetSecondNumberState } from './';
import { numDigits, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class FirstOperatorState extends CalculatorState {
  constructor(accumulator1, operator1) {
    super(accumulator1, accumulator1)
    this.operator1 = operator1;
  }

  process(type, id, value) {
    const accumulator1 = this.accumulator1;
    if (id === 'point') {
      return new GetSecondFloatState(this.accumulator1, "0")
    } else if (id === 'point') {
      return this; // noop - 1 decimal point per number
    } else if (id === 'sign') {
      return new GetSecondFloatState(toggleSign(this.accumulator1))
    } else if (type === 'number' && numDigits(accumulator1) === maxDigits) {
      return this; // noop - max number of digits reached
    } else if (type === 'number') {
      const newAccumulator1 = `${this.accumulator1}${value}`;
      return new GetSecondNumberState(newAccumulator1);
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState(this.accumulator1, id);
    }

    return super.process(type, id, value);
  }

}


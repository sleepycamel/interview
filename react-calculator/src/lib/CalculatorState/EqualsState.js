import { CalculatorState, GetFirstFloatState, FirstOperatorState } from './';
import { numDigits, appendDigit, toggleSign, getFloatReadout } from "../Helpers";
import { maxDigits } from "../constants";

export default class EqualsState extends CalculatorState {

  constructor(args) {
    super(args);
    this.calculate();
  }

  getReadout() {
    return getFloatReadout(this.accumulator1);
  }
}


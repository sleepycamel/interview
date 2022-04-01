import { CalculatorState, StartState, GetSecondFloatState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetSecondNumberState extends CalculatorState {

  getReadout() {
    return parseInt(this.accumulator2).toLocaleString();
  }

  process(type, id, value) {
    const accumulator2 = appendDigit(this.accumulator2, value);
    if (id === 'point' && numDigits(this.accumulator2) < maxDigits) {
      return new GetSecondFloatState({...this, accumulator2});
    } else if (id === 'sign') {
      return new GetSecondNumberState({...this, accumulator2: toggleSign(this.accumulator2)});
    } else if (type === 'number' && numDigits(this.accumulator2) < maxDigits) {
      return new GetSecondNumberState({...this, accumulator2} );
    }
    return super.process(type, id, value);
  }
}

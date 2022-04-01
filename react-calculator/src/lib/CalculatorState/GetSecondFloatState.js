import { CalculatorState, ResultState } from './';
import {numDigits, appendDigit, toggleSign, getFloatReadout} from "../Helpers";
import { maxDigits } from "../constants";

export default class GetSecondFloatState extends CalculatorState {

  getReadout() {
    return getFloatReadout(this.accumulator2);
  }

  process(type, id, value) {
    if (id === 'sign') {
      return new GetSecondFloatState({...this, accumulator2: toggleSign(this.accumulator2)});
    } else if (type === 'number' && id !== 'point' && numDigits(this.accumulator2) < maxDigits) {
      const accumulator2 = appendDigit(this.accumulator2, value);
      return new GetSecondFloatState({...this, accumulator2});
    } else if (id === 'equal') {
      return new ResultState({...this});
    }
    return super.process(type, id, value);
  }
}

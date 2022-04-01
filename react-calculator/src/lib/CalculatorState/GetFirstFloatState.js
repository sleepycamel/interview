import {CalculatorState, FirstOperatorState, ResultState} from './';
import { numDigits, appendDigit, toggleSign, getFloatReadout } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetFirstFloatState extends CalculatorState {

  getReadout() {
    return getFloatReadout(this.accumulator1);
  }

  process(type, id, value) {
    if (id === 'sign') {
      return new GetFirstFloatState({accumulator1: toggleSign(this.accumulator1)})
    } else if (id === 'percent') {
      return new ResultState({...this, accumulator2: 100, operator1: 'divide'});
    } else if (type === 'number' && id !== 'point' && numDigits(this.accumulator1) < maxDigits) {
      const newAccumulator1 = appendDigit(this.accumulator1, value);
      return new GetFirstFloatState({accumulator1: newAccumulator1});
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState({...this, operator1: id});
    }
    return super.process(type, id, value);
  }
}


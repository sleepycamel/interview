import { CalculatorState, GetFirstFloatState, FirstOperatorState, ResultState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetFirstNumberState extends CalculatorState {

  getReadout() {
    return parseInt(this.accumulator1).toLocaleString();
  }

  process(type, id, value) {
    if (id === 'point' && numDigits(this.accumulator1) < maxDigits) {
      return new GetFirstFloatState({accumulator1: appendDigit(this.accumulator1, value)});
    } else if (id === 'sign') {
      return new GetFirstNumberState({accumulator1: toggleSign(this.accumulator1)} )
    } else if (id === 'percent') {
      return new ResultState({...this, accumulator2: 100, operator1: 'divide'});
    } else if (type === 'number' && numDigits(this.accumulator1) < maxDigits) {
      return new GetFirstNumberState({accumulator1: appendDigit(this.accumulator1, value)} );
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState({...this, operator1: id});
    }

    return super.process(type, id, value);
  }
}


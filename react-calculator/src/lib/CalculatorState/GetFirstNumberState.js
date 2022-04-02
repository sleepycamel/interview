import { CalculatorState, GetFirstFloatState, FirstOperatorState, ResultState } from './';
import { numDigits, appendDigit, toggleSign, toPercentDecimalStr } from "../helpers";
import { READOUT_MAX_DIGITS } from "../constants";

export default class GetFirstNumberState extends CalculatorState {

  getReadout() {
    return parseInt(this.accumulator1).toLocaleString();
  }

  process(type, id, value) {
    if (id === 'point' && numDigits(this.accumulator1) < READOUT_MAX_DIGITS) {
      return new GetFirstFloatState({accumulator1: appendDigit(this.accumulator1, value)});
    } else if (id === 'sign') {
      return new GetFirstNumberState({accumulator1: toggleSign(this.accumulator1)} )
    } else if (id === 'percent') {
      return new ResultState({...this, accumulator1: toPercentDecimalStr(this.accumulator1)});
    } else if (type === 'number' && numDigits(this.accumulator1) < READOUT_MAX_DIGITS) {
      return new GetFirstNumberState({accumulator1: appendDigit(this.accumulator1, value)} );
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState({...this, operator1: id});
    }

    return super.process(type, id, value);
  }
}


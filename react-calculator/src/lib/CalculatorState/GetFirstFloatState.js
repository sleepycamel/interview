import {CalculatorState, FirstOperatorState, ResultState} from './';
import { numDigits, appendDigit, toggleSign, getFloatReadout, toPercentDecimalStr } from "../helpers";
import { READOUT_MAX_DIGITS } from "../constants";

export default class GetFirstFloatState extends CalculatorState {

  getReadout() {
    return getFloatReadout(this.accumulator1);
  }

  process(type, id, value) {
    if (id === 'sign') {
      return new GetFirstFloatState({accumulator1: toggleSign(this.accumulator1)})
    } else if (id === 'percent') {
      return new ResultState({...this, accumulator1: toPercentDecimalStr(this.accumulator1)});
    } else if (type === 'number' && id !== 'point' && numDigits(this.accumulator1) < READOUT_MAX_DIGITS) {
      const newAccumulator1 = appendDigit(this.accumulator1, value);
      return new GetFirstFloatState({accumulator1: newAccumulator1});
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState({...this, operator1: id});
    }
    return super.process(type, id, value);
  }
}


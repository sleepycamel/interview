import {CalculatorState, SecondOperatorState, ResultState} from './';
import { numDigits, appendDigit, toggleSign } from "../helpers";
import { READOUT_MAX_DIGITS } from "../constants";
import GetThirdFloatState from "./GetThirdFloatState";

export default class GetThirdNumberState extends CalculatorState {

  getReadout() {
    return parseInt(this.accumulator3).toLocaleString();
  }

  process(type, id, value) {
    const accumulator3 = appendDigit(this.accumulator3, value);
    if (id === 'point' && numDigits(this.accumulator3) < READOUT_MAX_DIGITS) {
      return new GetThirdFloatState({...this, accumulator3});
    } else if (id === 'sign') {
      return new GetThirdNumberState({...this, accumulator3: toggleSign(this.accumulator3)});
    } else if (type === 'number' && numDigits(this.accumulator3) < READOUT_MAX_DIGITS) {
      return new GetThirdNumberState({...this, accumulator3} );
    } else if (id === 'equal') {
      return new ResultState({...this})
    } else if (type === 'operator') {
      const nextState = new SecondOperatorState(this);
      nextState.calculate();
      nextState.operator2 = id;
      nextState.accumulator3 = null;
      return nextState;
    }
    return super.process(type, id, value);
  }
}

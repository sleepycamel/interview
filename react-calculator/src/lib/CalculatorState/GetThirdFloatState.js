import {CalculatorState, ResultState, SecondOperatorState} from './';
import {numDigits, appendDigit, toggleSign, getFloatReadout} from "../helpers";
import { maxDigits } from "../constants";

export default class GetThirdFloatState extends CalculatorState {

  getReadout() {
    return getFloatReadout(this.accumulator3);
  }

  process(type, id, value) {
    if (id === 'sign') {
      return new GetThirdFloatState({...this, accumulator3: toggleSign(this.accumulator3)});
    } else if (type === 'number' && id !== 'point' && numDigits(this.accumulator3) < maxDigits) {
      const accumulator3 = appendDigit(this.accumulator3, value);
      return new GetThirdFloatState({...this, accumulator3});
    } else if (id === 'equal') {
      return new ResultState({...this});
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

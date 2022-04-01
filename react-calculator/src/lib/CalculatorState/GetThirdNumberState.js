import {CalculatorState, FirstOperatorState, GetSecondFloatState, ResultState} from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";
import GetThirdFloatState from "./GetThirdFloatState";

export default class GetThirdNumberState extends CalculatorState {

  getReadout() {
    return parseInt(this.accumulator3).toLocaleString();
  }

  process(type, id, value) {
    const accumulator3 = appendDigit(this.accumulator3, value);
    if (id === 'point' && numDigits(this.accumulator3) < maxDigits) {
      return new GetThirdFloatState({...this, accumulator3});
    } else if (id === 'sign') {
      return new GetThirdNumberState({...this, accumulator3: toggleSign(this.accumulator3)});
    } else if (type === 'number' && numDigits(this.accumulator3) < maxDigits) {
      return new GetThirdNumberState({...this, accumulator3} );
    } else if (id === 'equal') {
      return new ResultState({...this})
    } else if (['multiply', 'divide'].includes(id)) {


    }
    return super.process(type, id, value);
  }
}

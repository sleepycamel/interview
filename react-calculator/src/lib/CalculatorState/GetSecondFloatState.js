import {CalculatorState, FirstOperatorState, ResultState, SecondOperatorState} from './';
import {numDigits, appendDigit, toggleSign, getFloatReadout} from "../helpers";
import { maxDigits } from "../constants";

export default class GetSecondFloatState extends CalculatorState {

  getReadout() {
    return getFloatReadout(this.accumulator2);
  }

  process(type, id, value) {
    if (id === 'sign') {
      return new GetSecondFloatState({...this, accumulator2: toggleSign(this.accumulator2)});
    } else if (id === 'percent') {
      const newAccumulator2 = (parseFloat(this.accumulator2)/100).toString();
      return new GetSecondFloatState({...this, accumulator2: newAccumulator2})
    }else if (type === 'number' && id !== 'point' && numDigits(this.accumulator2) < maxDigits) {
      const accumulator2 = appendDigit(this.accumulator2, value);
      return new GetSecondFloatState({...this, accumulator2});
    } else if (id === 'equal') {
      return new ResultState({...this});
    } else if (['add', 'subtract'].includes(id) || (['add', 'subtract', 'multiply', 'divide'].includes(id) && ['multiply', 'divide'].includes(this.operator1))) {
      const nextState = new FirstOperatorState(this);
      nextState.calculate();
      nextState.operator1 = id;
      return nextState;
    } else if (['multiply', 'divide'].includes(id)) {
      return new SecondOperatorState({...this, operator2: id});
    }

return super.process(type, id, value);
  }
}

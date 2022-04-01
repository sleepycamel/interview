import { CalculatorState, GetSecondFloatState, GetSecondNumberState } from './';
import { numDigits, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class FirstOperatorState extends CalculatorState {

  getOperator() {
    return this.operator1;
  }

  process(type, id, value) {
    if (id === 'point') {
      return new GetSecondFloatState({...this, accumulator2: "0."} )
    } else if (type === 'number') {
      return new GetSecondNumberState({...this, accumulator2: `${value}`});
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState({...this, operator1: id});
    }

    return super.process(type, id, value);
  }

}


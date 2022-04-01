import {CalculatorState, GetThirdFloatState, GetThirdNumberState, ResultState} from './';
import {maxDigits} from "../constants";

export default class SecondOperatorState extends CalculatorState {

  getOperator() {
    return this.operator2;
  }

  getReadout() {
    return parseFloat(this.accumulator2).toLocaleString(undefined, {maximumFractionDigits: maxDigits});
  }

  process(type, id, value) {
    if (id === 'point') {
      return new GetThirdFloatState({...this, accumulator3: "0."} )
    } else if (type === 'number') {
      return new GetThirdNumberState({...this, accumulator3: value.toString()});
    } else if (id === 'equal') {
      return new ResultState({...this, accumulator3: this.accumulator2});
    } else if (type === 'operator') {
      return new SecondOperatorState({...this, operator2: id});
    }

    return super.process(type, id, value);
  }

}


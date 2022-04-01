import {CalculatorState, GetSecondFloatState, GetSecondNumberState, ResultState} from './';

export default class FirstOperatorState extends CalculatorState {

  getOperator() {
    return this.operator1;
  }

  process(type, id, value) {
    if (id === 'point') {
      return new GetSecondFloatState({...this, accumulator2: "0."} )
    } else if (type === 'number') {
      return new GetSecondNumberState({...this, accumulator2: `${value}`});
    } else if (id === 'equal') {
      return new ResultState({...this, accumulator2: this.accumulator1});
    } else if (type === 'operator') {
      return new FirstOperatorState({...this, operator1: id});
    }

    return super.process(type, id, value);
  }

}


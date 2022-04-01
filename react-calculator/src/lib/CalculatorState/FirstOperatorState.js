import { CalculatorState, GetSecondFloatState, GetSecondNumberState } from './';
import { numDigits, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class FirstOperatorState extends CalculatorState {
  constructor({accumulator1, operator1}) {
    super({
      accumulator1,
      operator1,
      readout: accumulator1
    } )
  }

  process(type, id, value) {
    const {accumulator1, operator1} = this;
    if (id === 'point') {
      return new GetSecondFloatState(this.accumulator1, "0")
    } else if (type === 'number') {
      const accumulator2 = `${value}`;
      return new GetSecondNumberState({accumulator1, operator1, accumulator2});
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState(this.accumulator1, id);
    }

    return super.process(type, id, value);
  }

}


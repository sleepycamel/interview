import { CalculatorState, GetFirstFloatState, GetFirstNumberState } from './';
import { appendDigit } from "../Helpers";

export default class StartState extends CalculatorState {
  process(type, id, value) {
    // console.log('StartState: process input', {type, id, value});
    if (id === 'point') {
      return new GetFirstFloatState('0.');
    } else if (type === 'number' && id !== 'num0') {
      const accumulator1 = appendDigit(this.accumulator1, value);
      return new GetFirstNumberState(accumulator1);
    }
    // Noop - stay in start state
    return this;
  }
}


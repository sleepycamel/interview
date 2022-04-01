import { CalculatorState, StartState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetSecondFloatState extends CalculatorState {
  getReadout() {
    const {accumulator2} = this;
    const val = parseFloat(accumulator2);
    let readout = accumulator2;
    if (val !== 0) {
      readout = val.toLocaleString(undefined, {maximumFractionDigits: maxDigits});
    }
    if (!readout.includes('.')) readout += '.';
    return readout;
  }

  process(type, id, value) {
    if (id === 'sign') {
      return new GetSecondFloatState({...this, accumulator2: toggleSign(this.accumulator2)});
    } else if (type === 'number' && id !== 'point' && numDigits(this.accumulator2) < maxDigits) {
      const accumulator2 = appendDigit(this.accumulator2, value);
      return new GetSecondFloatState({...this, accumulator2});
    }
    return super.process(type, id, value);
  }
}

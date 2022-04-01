import { CalculatorState, FirstOperatorState } from './';
import { numDigits, appendDigit, toggleSign } from "../Helpers";
import { maxDigits } from "../constants";

export default class GetFirstFloatState extends CalculatorState {

  getReadout() {
    const {accumulator1} = this;
    const val = parseFloat(accumulator1);
    let readout = accumulator1;
    if (val !== 0) {
      readout = val.toLocaleString(undefined, {maximumFractionDigits: maxDigits});
    }
    if (!readout.includes('.')) readout += '.';
    return readout;
  }

  process(type, id, value) {
     if (id === 'sign') {
      return new GetFirstFloatState({accumulator1: toggleSign(this.accumulator1)} )
    } else if (type === 'number' && id !== 'point' && numDigits(this.accumulator1) < maxDigits) {
       const newAccumulator1 = appendDigit(this.accumulator1, value);
      return new GetFirstFloatState({accumulator1: newAccumulator1} );
    } else if (type === 'operator' && id !== 'equal') {
      return new FirstOperatorState({...this, operator1: id});
    }
    return super.process(type, id, value);
  }
}


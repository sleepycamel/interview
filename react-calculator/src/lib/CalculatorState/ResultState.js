import { CalculatorState, GetFirstNumberState, GetFirstFloatState, FirstOperatorState } from './';
import { numDigits, toggleSign, getFloatReadout } from "../helpers";
import { READOUT_MAX_DIGITS } from "../constants";

export default class ResultState extends CalculatorState {

  constructor(args) {
    super(args);
    this.calculate();
  }

  getReadout() {
    return getFloatReadout(this.accumulator1).replace(/\.$/, '');
  }

  process(type, id, value) {
    if (id === 'point') {
      return new GetFirstFloatState({accumulator1: "0."} );
    } else if (id === 'sign') {
      return new ResultState({accumulator1: toggleSign(this.accumulator1)} );
    } else if (type === 'number' && numDigits(this.accumulator1) < READOUT_MAX_DIGITS) {
      return new GetFirstNumberState({accumulator1: value.toString()})
    } else if (id === 'equal') {
      return new ResultState(this);
    } else if (type === 'operator') {
      return new FirstOperatorState({...this, operator1: id});
    }

    return super.process(type, id, value);
  }
}


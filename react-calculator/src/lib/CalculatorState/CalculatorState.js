import { StartState } from './';

export default class CalculatorState {

  accumulator1 = "0";
  readout = "0";
  operator1 = null;
  operator2 = null;

  constructor(accumulator1="0", readout="0") {
    // console.log('base constructor', {accumulator1, readout});
    this.accumulator1 = accumulator1;
    this.readout = readout.toLocaleString();
  }

  process(type, id, value) {
    if (id === 'clear') {
      return new StartState();
    }
    return this; // noop
  }

  getOperator() {
    return this.operator2 ? this.operator2 : this.operator1;
  }
}


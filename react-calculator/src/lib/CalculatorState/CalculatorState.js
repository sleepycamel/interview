import { StartState } from './';

export default class CalculatorState {

  accumulator1 = "0";
  readout = "0";
  operator1 = null;
  operator2 = null;

  constructor(args) {
    Object.assign(this, args);
  }

  process(type, id, value) {
    if (id === 'clear') {
      return new StartState();
    }
    return this; // noop
  }

  getOperator() { return null };

  getReadout() {
    return parseFloat(this.accumulator1).toLocaleString();
  }
}


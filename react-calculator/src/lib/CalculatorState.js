
import { numDigits, appendDigit } from "./Helpers";
import { maxDigits } from "./constants";

class CalculatorState {

  accumulator1 = "0";
  readout = "0";

  constructor(accumulator1="0", readout="0") {
    // console.log('base constructor', {accumulator1, readout});
    this.accumulator1 = accumulator1;
    this.readout = readout.toLocaleString();
  }

  process(type, id, value) {
    // console.log('process input', {type, id, value});
    if (id === 'clear') {
      return new StartState();
    }
    return this;
    //
    // const accumulator1 = `${this.accumulator1}${value}`;
    // return new CalculatorState(accumulator1, accumulator1);
  }
}

export class StartState extends CalculatorState {
  process(type, id, value) {
    // console.log('StartState: process input', {type, id, value});
    if (id === 'point') {
      return new FloatAccumulator1State('0.');
    } else if (type === 'number' && id !== 'num0') {
      const accumulator1 = appendDigit(this.accumulator1, value);
      return new Accumulator1State(accumulator1);
    }
    // Noop - stay in start state
    return this;
  }
}

export class Accumulator1State extends CalculatorState {
  constructor(accumulator1) {
    console.log('new Accumulator1 state', accumulator1)
    let readout = accumulator1;
    const val = parseInt(accumulator1);
    readout = val.toLocaleString();
    super(accumulator1, readout);
  }
  process(type, id, value) {
    // console.log('Accumulator1State: process input', {type, id, value}, this.accumulator1);
    const newAccumulator1 = appendDigit(this.accumulator1, value);
    if (id === 'clear') {
      return new StartState();
    } else if (id === 'point' && numDigits(this.accumulator1) < maxDigits) {
      return new FloatAccumulator1State(newAccumulator1);
    } else if (type === 'number' && numDigits(this.accumulator1) === maxDigits) {
      return this; // noop - max number of digits reached
    } else if (type === 'number') {
      return new Accumulator1State(newAccumulator1);
    }
  }
}

export class FloatAccumulator1State extends CalculatorState {
  constructor(accumulator1) {
    const val = parseFloat(accumulator1);
    let readout = accumulator1;
    console.log({accumulator1, val, readout});
    if (val !== 0) {
      readout = val.toLocaleString(undefined, {maximumFractionDigits: maxDigits});
    }
    if (!readout.includes('.')) readout += '.';
    super(accumulator1, readout);
  }
  process(type, id, value) {
    // console.log('FloatAccumulator1State: process input', {type, id, value}, this.accumulator1);
    const accumulator1 = this.accumulator1;
    if (id === 'clear') {
      return new StartState();
    } else if (id === 'point') {
      return this; // noop - 1 decimal point per number
    } else if (type === 'number' && numDigits(accumulator1) === maxDigits) {
      return this; // noop - max number of digits reached
    } else if (type === 'number') {
      const newAccumulator1 = `${this.accumulator1}${value}`;
      return new FloatAccumulator1State(newAccumulator1);
    }
  }


}

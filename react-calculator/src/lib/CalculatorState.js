
class CalculatorState {

  state = "";
  accumulator1 = "";
  readout = "0";

  constructor(state, accumulator1, readout) {
    console.log('base constructor', {state, accumulator1, readout});
    this.state = state;
    this.accumulator1 = accumulator1;
    this.readout = readout.toLocaleString();
  }

  process(type, id, value) {
    console.log('process input', {type, id, value});
    const accumulator1 = `${this.accumulator1}${value}`;
    return new CalculatorState("accumulate", accumulator1, accumulator1);
  }
}

export class StartState extends CalculatorState {
  constructor() {
    super('start', "", "0");
  }
  process(type, id, value) {
    console.log('StartState: process input', {type, id, value});
    const accumulator1 = `${this.accumulator1}${value}`;
    return new Accumulator1State(accumulator1, accumulator1);
  }
}

export class Accumulator1State extends CalculatorState {
  constructor(accumulator1) {
    super('accumulator1', accumulator1, accumulator1);
  }
  process(type, id, value) {
    console.log('Accumulator1State: process input', {type, id, value});
    switch( id ) {
      case "clear":
        return new StartState();
    }
    const accumulator1 = `${this.accumulator1}${value}`;
    return new Accumulator1State(accumulator1);
  }
}


export function getBufferLength(input) {
  return input[0].length
}

export class Signal {
  public signal: number;

  constructor() {
    this.signal = 0;
  }

  add(value = 1)  {
    this.signal += value
    return this
  }

  remove(value = 1 ) {
    this.signal -= value;
    return this
  }

  get() {
    return this.signal
  }
}

export function multiplyValues(val1, val2) {
  return val1 * val2
}


export const convertBinToDec = (input: string): number => {
  return parseInt(input, 2);
}
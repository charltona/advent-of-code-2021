import {convertBinToDec, getBufferLength} from "../util/util";

export const getReading = (input): {gammaRate: string, epsilonRate: string} => {
  const bufferLength = getBufferLength(input);
  let gammaRate = '';
  let epsilonRate = '';
  for (let i = 0; i < bufferLength; i++) {
    let signal = 0;
    input.forEach((data) => {
      if (data.charAt(i) === '1') signal++;
    })
    gammaRate += signal > (input.length/2) ? '1': '0'
    epsilonRate += signal < (input.length/2) ? '1' : '0'
  }
  return {gammaRate, epsilonRate};
}


export const calculateReadings = (reading1: number, reading2: number) => {
  return reading1 * reading2
}

export const getPowerConsumption = (input) => {
  const {gammaRate, epsilonRate} = getReading(input);
  return calculateReadings(convertBinToDec(gammaRate), convertBinToDec(epsilonRate));
}

export const getOxygenRating = (input: string[]) => {
  const bufferLength = getBufferLength(input);
  let readStream = input;
  for (let i = 0; i < bufferLength; i++) {
    let signal = 0;
    readStream.forEach((data) => {
      if (data.charAt(i) === '1') signal++
    })
    let o2reading = signal >= (readStream.length/2) ? '1' : '0'
    readStream = readStream.filter((bit) => {
      return bit.charAt(i) === o2reading;
    })
    if (readStream.length === 1) break;

  }
  return readStream[0];
}

export const getC02ScrubberRating = (input: string[]) => {
  const bufferLength = getBufferLength(input);
  let readStream = input;
  for (let i = 0; i < bufferLength; i++) {
    let signal = 0;
    readStream.forEach((data) => {
      if (data.charAt(i) === '1') signal++
    })
    let co2reading = signal < (readStream.length/2) ? '1' : '0'
    readStream = readStream.filter((bit) => {
      return bit.charAt(i) === co2reading;
    })
    if (readStream.length === 1) break;
  }
  return readStream[0];
}

export const calculateLifeSupportRating = (input: string[]) => {
  const o2reading = getOxygenRating(input);
  const co2reading = getC02ScrubberRating(input);

  return calculateReadings(convertBinToDec(o2reading), convertBinToDec(co2reading));
}
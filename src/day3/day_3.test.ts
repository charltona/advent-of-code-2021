import {
    getReading,
    getPowerConsumption,
    getOxygenRating,
    getC02ScrubberRating, calculateLifeSupportRating, calculateReadings
} from "./day_3";
import {convertBinToDec} from "../util/util";

const testData = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
]

describe('Day 3 Challenges', () => {
    it('calculates gamma rate correctly', () => {
        const {gammaRate} = getReading(testData);
        expect(gammaRate).toBe('10110');
    })

    it('calculates epsilon rate correctly', () => {
        const {epsilonRate} = getReading(testData);
        expect(epsilonRate).toBe('01001')
    })

    it('converts binary to decimal correctly', () => {
        expect(convertBinToDec('10110')).toBe(22)
        expect(convertBinToDec('01001')).toBe(9)
    })

    it('calculates power consumption reading correctly', () => {
        expect(calculateReadings(22, 9)).toBe(198)
    })

    it('returns the correct power consumption', () => {
        expect(getPowerConsumption(testData)).toBe(198);
    })

    it('calculates O2 Generator Rating correctly', () => {
        expect(getOxygenRating(testData)).toBe('10111');
    })

    it('calculates C02 Scrubber rating correctly', () => {
        expect(getC02ScrubberRating(testData)).toBe('01010')
    })

    it('calculates Life Support Rating correctly', () => {
        expect(calculateLifeSupportRating(testData)).toBe(230)
    })

})
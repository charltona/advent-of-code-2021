import {depthMeasurement} from "./day_1";
import {slidingDepthMeasurement} from "./day_1";

const testData = [
    199,200,208,210,200,207,240,269,260,263
]

describe("Day 1 challenge", () => {
  it('correctly measures depth increase', () => {
    const result = depthMeasurement(testData);
    expect(result).toBe(7)
  })
  it('correctly measures sliding depth increase', () => {
    const result = slidingDepthMeasurement(testData);
    expect(result).toBe(5)
  })
});


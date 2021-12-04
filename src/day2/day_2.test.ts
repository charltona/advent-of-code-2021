import {improvedPositionCalculator, positionCalculator} from "./day_2";

describe("Day 2 challenge", () => {
  const testData = [
    {command: "forward", value: 5},
    {command: "down", value: 5},
    {command: "forward", value: 8},
    {command: "up", value: 3},
    {command: "down", value: 8},
    {command: "forward", value: 2},
  ]

  it ('calculates position correctly', () => {
    const result = positionCalculator(testData);
    expect(result).toBe(150);
  });

  it ('calculates position correctly with aim', () => {
    const result = improvedPositionCalculator(testData);
    expect(result).toBe(900)
  })
});
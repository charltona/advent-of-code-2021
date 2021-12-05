import {
  findLargestXCoordinate,
  findLargestYCoordinate, getAllDiagonalLines,
  getAllHorizontalLines,
  getAllVerticalLines,
  InputData, Map
} from "./day5";
import {day_5_data} from "./day5.data";

const testData: InputData = [
      [[0, 9], [5, 9]], // v
      [[8, 0], [0, 8]], //
      [[9, 4], [3, 4]],
      [[2, 2], [2, 1]],
      [[7, 0], [7, 4]],
      [[6, 4], [2, 0]],
      [[0, 9], [2, 9]],
      [[3, 4], [1, 4]],
      [[0, 0], [8, 8]],
      [[5, 5], [8, 2]]
    ];

describe('Day 5 challenges', () => {

  it('finds the largest X coordinate', () => {
    expect(findLargestXCoordinate(testData)).toBe(9);
  });

  it('finds the largest Y coordinate', () => {
    expect(findLargestYCoordinate(testData)).toBe(9);
  });

  it('finds all horizontal lines', () => {
    expect(getAllHorizontalLines(testData)).toHaveLength(4);
  })

  it('finds all vertical lines', () => {
    expect(getAllVerticalLines(testData)).toHaveLength(2);
  })

  it('finds all diagonal lines', () => {
    expect(getAllDiagonalLines(testData)).toHaveLength(4);
  })

  it ('generates a map correctly', () => {
    const map = new Map(testData);
    expect(map.mapData).toHaveLength(100);
  })

  it ('draws all horizontal lines correctly', () => {
    const map = new Map(testData);
    map.drawLines();
    map.drawMap();
    expect(map.mapData).toBe(true);
  })

  it('generates the correct number of danger points', () => {
    const map = new Map(testData);
    map.drawLines();
    expect(map.getDangerPointsCount()).toBe(5);
  })
})
type X = number;
type Y = number
type Point = X | Y;
type Coordinate = [Point, Point]
type Line = [Coordinate, Coordinate]
export type InputData = Line[];

export const findLargestXCoordinate = (input: InputData) => {
  const allXCoordinatesinput = input.flatMap((line) => {
    const xCoords = [line[0][0], line[1][0]]
    return xCoords.flat();
  })
  const largestXCoordinate = Math.max(...allXCoordinatesinput);

  return largestXCoordinate;
}

export const findLargestYCoordinate = (input: InputData) => {
  const allYCoordinatesinput = input.flatMap((line) => {
    const xCoords = [line[0][1], line[1][1]]
    return xCoords.flat();
  })
  const largestYCoordinate = Math.max(...allYCoordinatesinput);

  return largestYCoordinate;
}

export const getAllHorizontalLines = (input: InputData): Line[] => {
  return input.filter((line) => {
    return line[0][1] === line[1][1]
  })
};

export const getAllVerticalLines = (input: InputData): Line[] => {
  return input.filter((line) => {
    return line[0][0] === line[1][0]
  })
};

export const getAllDiagonalLines = (input: InputData): Line[] => {
  return input.filter((line) => {
    return ((line[0][0] !== line[1][0]) && (line[0][1] !== line[1][1]))
  })
}



export class Map {
  public inputData: InputData;
  public mapData: MapCoordinate[];
  private columns: number;
  private rows: number;

  constructor(input: InputData) {
    this.inputData = input;
    this.mapData = [];
    this.generateMap();
  }

  generateMap() {
    let highestXValue = findLargestXCoordinate(this.inputData);
    let highestYValue = findLargestYCoordinate(this.inputData);

    // // square the map off.
    // if (highestXValue > highestYValue) {
    //   highestYValue = highestXValue;
    // }
    // if (highestYValue > highestXValue) {
    //   highestXValue = highestYValue;
    // }

    this.columns = highestXValue;
    this.rows = highestYValue;

    for (let x = 0; x <= highestXValue; x++) {
      for (let y = 0; y <= highestYValue; y++) {
        this.mapData.push(new MapCoordinate([x, y]))
      }
    }
  }

  drawLines() {
    const horizontalLines = getAllHorizontalLines(this.inputData);
    const verticalLines = getAllVerticalLines(this.inputData);
    horizontalLines.forEach((line, i) => {
      console.log(`drawing horizontal line ${i}/${horizontalLines.length}`, line);
      this.drawHorizontalLine(line);
    })
    verticalLines.forEach((line, i) => {
      console.log(`drawing vertical line ${i}/${verticalLines.length}`, line);
      this.drawVerticalLine(line);
    })
  }

  drawHorizontalLine(line: Line) {
    if (line[0][0] > line[1][0]) {
      // line is backwards.
      line = line.reverse(); // destructive.
    }
    const y = line[0][1];
    for (let x = line[0][0]; x <= line[1][0]; x++) {
      this.getCoordinateByXYValue(x,y).drawLine();
    }
  }

  drawVerticalLine(line) {
    if (line[0][1] > line[1][1]) {
      // line is backwards.
      line = line.reverse(); // destructive.
    }
    const x = line[0][0];
    for (let y = line[0][1]; y <= line[1][1]; y++) {
      this.getCoordinateByXYValue(x,y).drawLine();
    }
  }

  getCoordinateByXYValue(xCoordinate, yCoordinate) {
    return this.mapData.find((coord) => {
      return coord.x === xCoordinate && coord.y === yCoordinate;
    })
  }

  getCoordinateValue(x, y) {
    return this.mapData.find((coord) => {
      return coord.x === x && coord.y === y;
    })?.lines;
  }

  drawMap() {
    let mapString = '';
    for (let x = 0; x <= this.columns; x++) {
      for (let y = 0; y <= this.rows; y++) {
        let coordValue
        try {
          coordValue = this.getCoordinateValue(x, y).toString();
        } catch (e) {
          console.log(`Can not get coordinate value of [${x}, ${y}]`);
        }
        mapString += coordValue === '0' ? '.' : coordValue;
      }
      mapString += '\n';
    }
    console.log(mapString);
  }

  public getDangerPointsCount() {
    return this.mapData.filter((coord) => {
      return coord.lines > 1;
    }).length
  }
}

export class MapCoordinate {
  readonly x: number;
  readonly y: number;
  public lines: number;

  constructor(coordinate: Coordinate) {
    this.x = coordinate[0];
    this.y = coordinate[1];
    this.lines = 0
  }

  drawLine() {
    this.lines++;
  }
}
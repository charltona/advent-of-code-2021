import {Board, BoardRunner} from "./day_4";

const testDrawNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
const testBoard1Data = [22,13,17,11,0,8,2,23,4,24,21,9,14,16,7,6,10,3,18,5,1,12,20,15,19];
const testBoard2Data = [3,15,0,2,22,9,18,13,17,5,19,8,7,25,23,20,11,10,24,4,14,21,16,12,6];
const testBoard3Data = [14,21,17,24,4,10,16,15,9,19,18,8,23,26,20,22,11,13,6,5,2,0,12,3,7]

describe('Day 4 challenges' , () => {

  it('Loads boards correctly', () => {
    const testBoard_1 = new Board(testBoard1Data);
    const testBoard_2 = new Board(testBoard2Data);
    const testBoard_3 = new Board(testBoard3Data);

    const testBoards = [testBoard_1, testBoard_2, testBoard_3];
    const boardRunner = new BoardRunner(testBoards);

    expect(boardRunner.boards.length).toBe(3)
  })

  it('draws a number correctly', () => {
    const tb4 = new Board([1,2,3,4,5,6,7,8,9,10])
    tb4.drawNumber(2)
    const tb4value2 = tb4.boardData.find((b) => {
      return b.value === 2
    })
    expect(tb4value2.received).toBe(true);
  })

  it('calculates a winning board correctly', () => {
    const testBoard_1 = new Board(testBoard1Data);
    const testBoard_2 = new Board(testBoard2Data);
    const testBoard_3 = new Board(testBoard3Data);
    const testBoards = [testBoard_1, testBoard_2, testBoard_3];
    const boardRunner = new BoardRunner(testBoards);

    let winningBoard: Board | false;
    testDrawNumbers.forEach((number) => {
      boardRunner.loadNumber(number);
      winningBoard = boardRunner.checkForWinningBoards(false);
    })

    expect(winningBoard).toBe(testBoard_3)
  })

  it('returns the correct score of the first winning board', () => {
    const testBoard_1 = new Board(testBoard1Data);
    const testBoard_2 = new Board(testBoard2Data);
    const testBoard_3 = new Board(testBoard3Data);
    const testBoards = [testBoard_1, testBoard_2, testBoard_3];
    const boardRunner = new BoardRunner(testBoards);

    boardRunner.run(testDrawNumbers);
    expect(boardRunner.score).toBe(4512)
  })

  it('returns the correct score of the last winning board', () => {
    const testBoard_1 = new Board(testBoard1Data);
    const testBoard_2 = new Board(testBoard2Data);
    const testBoard_3 = new Board(testBoard3Data);
    const testBoards = [testBoard_1, testBoard_2, testBoard_3];
    const boardRunner = new BoardRunner(testBoards);

    boardRunner.runUntilTheEnd(testDrawNumbers);
    expect(boardRunner.score).toBe(1924)
  })


})
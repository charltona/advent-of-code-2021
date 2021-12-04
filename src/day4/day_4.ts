type BoardData = {
  position: number;
  value: number;
  received: boolean;
}

type TBoard = BoardData[];

export class Board {
  public boardData: BoardData[] = [];
  public inputData: number[];
  public complete: boolean;

  constructor(inputData: number[]) {
    this.setUpBoard(inputData);
    this.complete = false;
  };

  setUpBoard(data) {
    data.forEach((v, k) => {
      this.boardData.push({
        position: k,
        value: v,
        received: false
      })
    })
  }

  private winningScenarios: number[][] = [
      [0,1,2,3,4],
      [5,6,7,8,9],
      [10,11,12,13,14],
      [15,16,17,18,19],
      [20,21,22,23,24],
      [0,5,10,15,20],
      [1,6,11,16,21],
      [2,7,12,17,22],
      [3,8,13,18,23],
      [4,9,14,19,24]
  ]

  checkWinScenario(scenario: number[], board: TBoard) {
    let win = true;
    scenario.forEach((k) => {
      if (!board[k].received) win = false;
    })

    return win;
  }

  calculateWinScenario() {
    let win = true;
    let winnerFound = false;
    this.winningScenarios.forEach((scenario) => {
      win = this.checkWinScenario(scenario, this.boardData)
      if (win) {
        winnerFound = true;
        this.complete = true;
      }
    })

    return winnerFound;
  }

  drawNumber(number) {
    const position = this.boardData.find((board) => board.value === number);
    if (position) position.received = true;
  }

  getSumOfUnmarkedNumbers() {
    let sum: number = 0;
    const unmarkedNumbers = this.boardData.filter((f) => {
      return f.received === false;
    });

    const numbersArray = unmarkedNumbers.map((d) => {
      return d.value
    })

    numbersArray.forEach((n) => {
      sum += n
    })

    return sum;
  }
}

export class BoardRunner {
  public boards: Board[];
  public winningBoard: Board;
  public score: number;
  private currentNumber: number;
  constructor(boards: Board[]) {
    this.boards = boards;
  }

  loadNumber(input: number) {
    this.currentNumber = input;
    this.boards.forEach((board, b_id) => {
      board.drawNumber(input)
    })
  }

  removeCompleteBoards() {
    this.boards = this.boards.filter((b) => {
      return b.complete !== true
    })
  }

  checkForWinningBoards(endless: boolean): Board | false {
    let winningBoardId: number;
    let boardWin = false;
    this.boards.forEach((board, k) => {
      boardWin = board.calculateWinScenario()
      if (boardWin) {
        this.winningBoard = board;
        winningBoardId = k;
      }
    })
    if (this.winningBoard) {
      this.checkScore(this.winningBoard);

      if (endless) {
        this.winningBoard = undefined;
        this.removeCompleteBoards();
      }
    }

    return this.winningBoard || false;
  }

  checkScore(board: Board) {
    this.score = board.getSumOfUnmarkedNumbers() * this.currentNumber;
  }

  run(inputNumbers: number[]) {
    let i = 0;
    while (!this.winningBoard && i < inputNumbers.length ) {
      this.loadNumber(inputNumbers[i]);
      this.checkForWinningBoards(false);
      i++
    }
  }

  runUntilTheEnd(inputNumbers: number[]) {
    let i = 0;
    while (i < inputNumbers.length) {
      this.loadNumber(inputNumbers[i]);
      this.checkForWinningBoards(true);
      i++
    }
  }
}
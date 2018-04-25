class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  };

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {  //If the flipped tile has a bomb, the game is over
      console.log('game is over');
      this._board.printBoard();;
    } else if (this._board.hasSafeTiles()) { //board does not have any safe tiles left, the player has won the game
      console.log('congratulates the user on winning');
    } else { //player should be allowed to continue playing
      console.log('Current Board');
      this._board.printBoard();
    }
  };

}

class Board {
  //start class

  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard   = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard     = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  };

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log("This tile has already been flipped!");
      return; //end of function?
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex] =
      this.getNumberOfNeighborBombs( rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  };

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets =  [[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    this._numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const rowIndex1 = rowIndex+offset[0];
      const columnIndex1 = columnIndex+offset[1];
      if (rowIndex1>=0 && columnIndex1>=0 && rowIndex1<numberOfRows && columnIndex1<numberOfColumns) {
        if (this._bombBoard[rowIndex1][columnIndex1] === 'B') {
          this._numberOfBombs++;
        }
      }
    })
    return this._numberOfBombs;
  };

  hasSafeTiles() { //informing the user that they've won the game
    return (this._numberOfTiles === this._numberOfBombs);
  };

  printBoard() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      const row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  };

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      const row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced != numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] != 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  };

  //end of class
}

const g = new Game(3,3,2);
g.playMove(0,0);
g.playMove(1,1);
g.playMove(2,2);

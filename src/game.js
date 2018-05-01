// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

// import Board from './board';
const Board = require('./board');

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

const g = new Game(3,3,2);
g.playMove(0,0);
g.playMove(1,1);
g.playMove(2,2);

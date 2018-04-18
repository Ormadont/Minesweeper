const generatePlyaerBoard = (numberOfRows, numberOfColumns) => {
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

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets =  [[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  numberOfBombs = 0;

  neighborOffsets.forEach(neighbor => {
    const rowIndex1 = rowIndex+neighbor[0];
    const columnIndex1 = columnIndex+neighbor[1];
    if (rowIndex1>=0 && columnIndex1>=0 && rowIndex1<numberOfRows && columnIndex1<numberOfColumns) {
      if (bombBoard[rowIndex1][columnIndex1] === 'B') {
        numberOfBombs++;
      }
    }
  })
  return numberOfBombs;
};

const printBoard = board => console.log(board.map(row => row.join(' | ')).join('\n'));

let rows = 3; let columns = 3;
let playerBoard = generatePlyaerBoard(rows, columns);
let bombBoard = generateBombBoard(rows, columns, 5);

console.log("Player board: ");
printBoard(playerBoard);

console.log("Bomb board: ");
printBoard(bombBoard);

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log("This tile has already been flipped!");
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  }
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}

flipTile(playerBoard, bombBoard, 1, 2);
console.log('Updated Player Board');
printBoard(playerBoard);

const generatePlyaerBoard = (numberOfRows, numberOfColumns) => {
  const board = []; //overall game board
  for (let i = 0; i < numberOfRows; i++) {
    const row = []; //a single row to be added to game board
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberofBombs) => {

  const board = []; //overall game board
  for (let i = 0; i < numberOfRows; i++) {
    const row = []; //a single row to be added to game board
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberofBombsPlaced = 0;
  while (numberofBombsPlaced != numberofBombs) {
    let randomRowIndex = Math.floor(Math.random()*numberOfRows);
    let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] != 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberofBombsPlaced++;
    }
  }

  return board;
}

console.log(generateBombBoard(2,2,3));

const blankLine = '  |   |  ';
const quessLine = '1 |   |  ';
const bombLine =  '  | B |  ';

console.log('This is what an empty board would look like:');
for (var i=0; i < 3; i++) {
  console.log(blankLine);
}

console.log('This is what a board with a guess and a bomb on it would look like:');
console.log(blankLine);
console.log(quessLine);
console.log(bombLine);

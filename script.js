let boardArray = generateBoardArray();

class TShape {
  constructor(
    position = [
      [5, 6],
      [5, 7],
      [5, 8],
      [4, 7],
    ],
    isMoving = true,
    pivotIndex = 1
  ) {
    this.position = position;
    this.isMoving = isMoving;
    this.pivotIndex = pivotIndex;
  }
}

let currentElement = new TShape();

function rotate() {
  let newPosition = JSON.parse(JSON.stringify(currentElement.position));
  let pivot = currentElement.position[currentElement.pivotIndex];
  for (const item of newPosition) {
    item[0] -= pivot[0];
    item[1] -= pivot[1];


    let tempVariable = item[0];
    item[0] = item[1];
    item[1] = -tempVariable;

    item[0] += pivot[0];
    item[1] += pivot[1];

    if (item[1] < 1 || item[1] > 10) {
      console.log("out of borders");
      return false;
    }
  }
  console.log(newPosition)
  currentElement.position = newPosition;
}

function generateElement(array) {
  for (let i = 0; i < array.length; i++) {
    let row = array[i][0];
    let column = array[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile element";
  }
}

function turnElement() {
  for (let i = 0; i < currentElement.position.length; i++) {
    let row = currentElement.position[i][0];
    let column = currentElement.position[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile";
  }
  rotate();
  console.log(currentElement.position);
  generateElement(currentElement.position);
}

console.log(currentElement);

function generateBoardArray() {
  let tempArray = [];
  num = 0;
  for (let i = 0; i < 21; i++) {
    let temp2Array = [];
    for (let y = 0; y < 10; y++) {
      temp2Array.push(num);
    }
    tempArray.push(temp2Array);
  }
  return tempArray;
}

function generateBoard(boardArray) {
  let container = document.querySelector(".gameContainer");
  let board = "";
  row = 1;
  column = 1;
  for (let i = 1; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray[i].length; j++) {
      if (boardArray[i][j]) {
        board += `<div class="tile element" id="${row}:${column}"></div>`;
        index++;
      } else {
        board += `<div class="tile" id="${row}:${column}"></div>`;
      }
      column += 1;
    }
    column = 1;
    row += 1;
  }

  container.innerHTML = board;
}

generateBoard(boardArray);
// document.getElementById(5).className = "tile element";
generateElement(currentElement.position);

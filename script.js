let boardArray = generateBoardArray();

let tickDelay = 1000; // Initial value is 1 tick per 1000ms, so 1 tick a second

// Default value is false, when game is started set it to true and when it is set to false during the gameloop, the gameloop will exit.

let gameState = false;

const positions = {
  I: [[]],
  J: [[]],
  L: [[]],
  O: [[]],
  S: [[]],
  T: [
    [1, 5],
    [1, 6],
    [1, 7],
    [2, 6],
  ],
  Z: [[]],
};

class Tetromino {
  constructor(position, name, isMoving = true, pivotIndex = 1) {
    this.position = position;
    this.isMoving = isMoving;
    this.pivotIndex = pivotIndex;
    this.name = name;
  }
}

let tshape = new Tetromino(positions.T, "tshape");
let currentElement = tshape;

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

    if (item[1] < 1 || item[1] > 10 || item[0] < 1) {
      console.log("out of borders");
      return false;
    }
  }

  console.log(newPosition);
  currentElement.position = newPosition;
}

function moveDown() {
  let newPosition = JSON.parse(JSON.stringify(currentElement.position));
  for (const item of newPosition) {
    item[0] += 1;
  }
  return newPosition;
}

function moveHorizontal(direction) {
  //Direction is a member of [-1,1]
  let newPosition = JSON.parse(JSON.stringify(currentElement.position));

  for (const item of newPosition) {
    item[1] += direction;
  }

  return newPosition;
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

function moveElementDown() {
  for (let i = 0; i < currentElement.position.length; i++) {
    let row = currentElement.position[i][0];
    let column = currentElement.position[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile";
  }
  currentElement.position = moveDown();
  console.log(currentElement.position);
  console.log(currentElement.position);
  generateElement(currentElement.position);
}

function moveElementLeft() {
  for (let i = 0; i < currentElement.position.length; i++) {
    let row = currentElement.position[i][0];
    let column = currentElement.position[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile";
  }
  currentElement.position = moveHorizontal(-1);
  console.log(currentElement.position);
  generateElement(currentElement.position);
}

function moveElementRight() {
  for (let i = 0; i < currentElement.position.length; i++) {
    let row = currentElement.position[i][0];
    let column = currentElement.position[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile";
  }
  currentElement.position = moveHorizontal(1);
  console.log(currentElement.position);
  generateElement(currentElement.position);
}

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

function gameLoop() {
  if (!gameState) {
    alert("Game Over");
    return;
  }

  setTimeout(() => {
    // CODE THAT WILL BE RUN EVERY TICK
    moveElementDown();
    gameLoop();
  }, tickDelay);
}

generateBoard(boardArray);

generateElement(currentElement.position);

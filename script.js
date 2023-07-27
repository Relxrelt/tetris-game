let boardArray = generateBoardArray();

class TShape {
  constructor(
    position = [
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 6],
    ],
    isMoving = true,
    rotationCount = 0
  ) {
    this.position = position;
    this.isMoving = isMoving;
    this.rotationCount = rotationCount;
  }

  rotate() {
    if (!this.rotationCount) {
      console.log("hey");

      let popped = this.position.splice(2, 1)[0];
      popped[0] -= 1;
      popped[1] -= 1;

      this.position.unshift(popped);
      this.rotationCount += 1;
    } else if (this.rotationCount === 1) {
      let popped = this.position.splice(3, 1)[0];
      popped[0] -= 1;
      popped[1] += 1;
      this.position.push(popped);
      this.rotationCount += 1;
    } else if (this.rotationCount === 2) {
      let popped = this.position.splice(1, 1)[0];
      popped[0] += 1;
      popped[1] += 1;
      this.position.push(popped);
      this.rotationCount += 1;
    } else if (this.rotationCount === 3) {
      let popped = this.position.splice(0, 1)[0];
      popped[0] += 1;
      popped[1] -= 1;
      this.position.unshift(popped);
      this.rotationCount = 0;
    }

    return this.position;
  }
}

let currentElement = new TShape();

function turnElement() {
  let array = currentElement.position;
  for (let i = 0; i < array.length; i++) {
    let row = array[i][0];
    let column = array[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile";
  }
  generateElement(currentElement.rotate());
  console.log(currentElement.position);
}
function generateElement(array) {
  for (let i = 0; i < array.length; i++) {
    let row = array[i][0];
    let column = array[i][1];
    let id = `${row}:${column}`;
    document.getElementById(`${row}:${column}`).className = "tile element";
  }
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

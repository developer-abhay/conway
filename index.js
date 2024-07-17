const container = document.querySelector(".grid-container");
const nextButton = document.querySelector(".next-btn");
const autoNextButton = document.querySelector(".auto-next-btn");
const sizeButtons = document.querySelectorAll(".create-grid");
const resetGrid = document.querySelector(".grid-reset");
let gridArray = [];
let totalCells = 0;

//creating grid of 30x30
const createGrid = (rows = 30, cols = 30) => {
  totalCells = rows * cols;
  let arr = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    arr.push(row);
  }
  return arr;
};

// To render the array on the browser in form of a grid
const renderGrid = (array) => {
  const grid = array.map((rows, index1) => {
    return `<div>
    ${rows.map((value, index2) => {
      return `<div data-row="${index1}" data-col="${index2}" class='cell' style="background-color: ${
        value ? "yellow" : "gray"
      }"></div>`;
    })}
            </div>`;
  });
  container.innerHTML = grid.join().replace(/\,/g, "");

  //adding click handler on cells and changing dimensions
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < totalCells; i++) {
    cells[i].addEventListener("click", (e) => changeCellState(e));
    if (totalCells == 2500) {
      cells[i].style.height = "12px";
      cells[i].style.width = "12px";
    } else if (totalCells == 10000) {
      cells[i].style.height = "8px";
      cells[i].style.width = "8px";
    }
  }
};

// To change the state of individual cell on click
const changeCellState = (e) => {
  const cell = e.target;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;

  if (gridArray[row][col] === 0) {
    gridArray[row][col] = 1;
    cell.style.backgroundColor = "yellow";
  } else {
    gridArray[row][col] = 0;
    cell.style.backgroundColor = "gray";
  }
};

//To change state of entire grid
const nextState = () => {
  const newGrid = gridArray.map((row) => [...row]);
  const cells = document.querySelectorAll(".cell");
  let row = 0;
  let col = 0;

  //Looping through each cell
  for (let i = 0; i < totalCells; i++) {
    row = Number(cells[i].dataset.row);
    col = Number(cells[i].dataset.col);

    const initialState = gridArray[row][col];
    let count = 0;

    // calculate count
    count = calculateCount(row, col);

    // Dead to alive
    if (initialState == 0 && count == 3) {
      newGrid[row][col] = 1;
    }
    // Alive to dead
    if (
      (initialState == 1 && count >= 4) ||
      (initialState == 1 && count <= 1)
    ) {
      newGrid[row][col] = 0;
    }
  }
  gridArray = newGrid;
  renderGrid(newGrid);
};

// To calculate total alive neighbours of a cell
const calculateCount = (row, col) => {
  let value = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i != 0 || j != 0) {
        if (
          0 <= row + i &&
          row + i < gridArray.length &&
          0 <= col + j &&
          col + j < gridArray.length
        ) {
          value = value + gridArray[row + i][col + j];
        }
      }
    }
  }
  return value;
};

//Automatic Play next generation
let intervalID = "";
const autoNextState = (e) => {
  if (e.target.innerHTML == "Auto Play") {
    autoNextButton.innerHTML = "Stop Play";
    intervalID = setInterval(() => {
      nextState();
    }, 200);
  } else if (e.target.innerHTML == "Stop Play") {
    autoNextButton.innerHTML = "Auto Play";
    clearInterval(intervalID);
  }
};

//Increase grid size
const changeGridSize = (e) => {
  if (autoNextButton.innerHTML == "Stop Play") {
    autoNextButton.innerHTML = "Auto Play";
    clearInterval(intervalID);
  }
  const size = Number(e.target.dataset.size);
  gridArray = createGrid(size, size);
  renderGrid(gridArray);
};

// Reset Grid
const displayInitialGrid = () => {
  if (autoNextButton.innerHTML == "Stop Play") {
    autoNextButton.innerHTML = "Auto Play";
    clearInterval(intervalID);
  }
  gridArray = createGrid();
  examplePattern();
  renderGrid(gridArray);
};

const examplePattern = () => {
  //Initial Heart State
  gridArray[10][9] = 1;
  gridArray[11][8] = 1;
  gridArray[12][8] = 1;
  gridArray[13][8] = 1;
  gridArray[14][9] = 1;

  gridArray[10][21] = 1;
  gridArray[11][22] = 1;
  gridArray[12][22] = 1;
  gridArray[13][22] = 1;
  gridArray[14][21] = 1;

  gridArray[8][11] = 1;
  gridArray[8][12] = 1;
  gridArray[9][13] = 1;
  gridArray[9][17] = 1;
  gridArray[8][18] = 1;
  gridArray[8][19] = 1;

  gridArray[9][10] = 1;
  gridArray[9][14] = 1;
  gridArray[9][16] = 1;
  gridArray[9][20] = 1;
  gridArray[10][15] = 1;

  gridArray[15][10] = 1;
  gridArray[16][11] = 1;
  gridArray[17][12] = 1;
  gridArray[18][13] = 1;
  gridArray[19][14] = 1;
  gridArray[20][15] = 1;
  gridArray[19][16] = 1;
  gridArray[18][17] = 1;
  gridArray[17][18] = 1;
  gridArray[16][19] = 1;
  gridArray[15][20] = 1;
};

//Next gen buttons
nextButton.addEventListener("click", nextState);
autoNextButton.addEventListener("click", (e) => autoNextState(e));
sizeButtons[0].addEventListener("click", (e) => changeGridSize(e));
sizeButtons[1].addEventListener("click", (e) => changeGridSize(e));
resetGrid.addEventListener("click", () => displayInitialGrid());

//Displays the intial state
displayInitialGrid();

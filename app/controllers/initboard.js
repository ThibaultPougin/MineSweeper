function getRandomInt() {
  return Math.floor(Math.random() * 9) + 1;
};

function initBoard(event) {
    let bombArray = [];
    let closeCells = [];
    let firstCellRow = parseInt(event.target.id.charAt(5));
    let firstCellColumn = parseInt(event.target.id.charAt(7));
  
    do {
      let cellId = `cell_${getRandomInt()}_${getRandomInt()}`;
  
      if (
        bombArray.indexOf(cellId) === -1 &&
        cellId !== event.target.id &&
        cellId !== `cell_${firstCellRow - 1}_${firstCellColumn - 1}` &&
        cellId !== `cell_${firstCellRow - 1}_${firstCellColumn}` &&
        cellId !== `cell_${firstCellRow - 1}_${firstCellColumn + 1}` &&
        cellId !== `cell_${firstCellRow}_${firstCellColumn - 1}` &&
        cellId !== `cell_${firstCellRow}_${firstCellColumn + 1}` &&
        cellId !== `cell_${firstCellRow + 1}_${firstCellColumn - 1}` &&
        cellId !== `cell_${firstCellRow + 1}_${firstCellColumn}` &&
        cellId !== `cell_${firstCellRow + 1}_${firstCellColumn + 1}`
      ) {
        bombArray.push(cellId);
      }
    } while (bombArray.length < 10);
  
    bombArray.forEach((element) => {
      let bombCell = document.getElementById(element);
      bombCell.classList.add("bomb");
      bombCell.classList.add("fa-solid");
      bombCell.classList.add("fa-land-mine-on");
      // bombCell.innerHTML = "X";
      let row = parseInt(element.charAt(5));
      let column = parseInt(element.charAt(7));
      closeCells.push(
        `cell_${row - 1}_${column - 1}`,
        `cell_${row - 1}_${column}`,
        `cell_${row - 1}_${column + 1}`,
        `cell_${row}_${column - 1}`,
        `cell_${row}_${column + 1}`,
        `cell_${row + 1}_${column - 1}`,
        `cell_${row + 1}_${column}`,
        `cell_${row + 1}_${column + 1}`
      );
    });
  
    closeCells.forEach((element) => {
      let cell = document.getElementById(element);
      let row = parseInt(element.charAt(5));
      let column = parseInt(element.charAt(7));
      let numberOfCloseBomb = 0;
      let secondClosest = [];
      secondClosest.push(
        `cell_${row - 1}_${column - 1}`,
        `cell_${row - 1}_${column}`,
        `cell_${row - 1}_${column + 1}`,
        `cell_${row}_${column - 1}`,
        `cell_${row}_${column + 1}`,
        `cell_${row + 1}_${column - 1}`,
        `cell_${row + 1}_${column}`,
        `cell_${row + 1}_${column + 1}`
      );
  
      secondClosest.forEach((element) => {
        let cell = document.getElementById(element);
        if (cell && cell.classList.contains("bomb")) {
          numberOfCloseBomb++;
        }
      });
  
      if (cell && !cell.classList.contains("bomb")) {
        cell.innerHTML = `${numberOfCloseBomb}`;
        cell.classList.add(`number-${numberOfCloseBomb}`);
        cell.classList.add('number');
      }
    });

    
      
  };

let board = document.querySelector(".board");

board.addEventListener("mousedown", (event) => {
    initBoard(event);       
  },
  { once: true }
);

  
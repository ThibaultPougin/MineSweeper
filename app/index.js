// const cell = document.getElementById("cell_1_2");
let bombArray = [];
let closeCells = [];

// function getCloseCells(cellId) {
//   let row = parseInt(cellId.charAt(5));
//   let column = parseInt(cellId.charAt(7));
//   let closeCells = [];
//     closeCells.push(
//       `cell_${row - 1}_${column - 1}`,
//       `cell_${row - 1}_${column}`,
//       `cell_${row - 1}_${column + 1}`,
//       `cell_${row}_${column - 1}`,
//       `cell_${row}_${column + 1}`,
//       `cell_${row + 1}_${column - 1}`,
//       `cell_${row + 1}_${column}`,
//       `cell_${row + 1}_${column + 1}`
//     );

//     return closeCells;
// };





//HANDLE LEFT CLICK\\
let allCells = document.querySelectorAll(".cell");
allCells.forEach((element) => {
  element.addEventListener("click", (event) => {
    
    //Si chiffre, révéler la case
    if(event.target.classList.contains('number')) {
      console.log('chiffre');
      element.classList.remove("hidden");
      element.classList.add("reveal");
    };

    
    //Si mine, révéler toutes les cases,mettre en évidence la case, mettre en evidence les bombes trouvées puis afficher game over
    if(event.target.classList.contains('bomb')) {
      console.log('bomb');
      event.target.classList.add('clickbomb')
      event.target.classList.remove('fa-land-mine-on')
      event.target.classList.add('fa-explosion')

      allCells.forEach(cell => {
        if(cell.classList.contains('flag') && cell.classList.contains('bomb')) {
          cell.classList.remove('flag');
          cell.classList.add('findbomb');
        } else {
          cell.classList.remove("hidden");
        cell.classList.add("reveal");
        };
       
      });
      
    }
    
    
    element.classList.remove("hidden");
    element.classList.add("reveal");

    // revealCells(event);
  });

});
//HANDLE LEFT CLICK\\


//HANDLE RIGHT CLICK\\
allCells.forEach((element) => {
  element.addEventListener("contextmenu", (event) => addFlag(event));
});

//Add and remove flag on right-click
function addFlag(event) {
  if (!event.target.classList.contains("reveal")) {
    event.preventDefault();
    event.target.classList.remove("hidden");
    event.target.classList.add("flag");
    event.target.addEventListener("contextmenu", (e) => removeFlag(e));
  } else {
    event.preventDefault();
  }
}

function removeFlag(event) {
  event.preventDefault();
  event.target.classList.remove("flag");
  event.target.classList.add("hidden");
  event.target.addEventListener("contextmenu", (e) => addFlag(e));
}
//HANDLE RIGHT CLICK\\

// function revealCells2(cellId) {

// const closeCells = getCloseCells(cellId);
// console.log(closeCells);


// closeCells.forEach((e) => {
//   let closeCell = document.getElementById(e);
//   if(closeCell && !closeCell.classList.contains('bomb')) {
//     closeCell.classList.remove("hidden");
//         closeCell.classList.add("reveal");
//   } else {

// // TODO
//   }

// })


// }


// function revealCells(event) {
//   const currentCellId = event.target.id;
  
//   revealCells2(currentCellId);

// };

// let bombCells = document.querySelectorAll(".bomb");
   
//     console.log(bombCells);
//     bombCells.forEach((element) => {
//       element.addEventListener("click", async function () {
//         // allCells.classList.remove("hidden");
//         element.classList.add("bombclick");


//         confirm("PERDU !");
//       });
//     });












function getCloseCells(cellId) {
  let row = parseInt(cellId.charAt(5));
  let column = parseInt(cellId.charAt(7));
  let closeCells = [];

  if(document.getElementById(`cell_${row - 1}_${column - 1}`)){
    closeCells.push(`cell_${row - 1}_${column - 1}`);
  };

  if(document.getElementById(`cell_${row - 1}_${column}`)){
    closeCells.push(`cell_${row - 1}_${column}`);
  };

  if(document.getElementById(`cell_${row - 1}_${column + 1}`)){
    closeCells.push(`cell_${row - 1}_${column + 1}`);
  };

  if(document.getElementById(`cell_${row}_${column - 1}`)){
    closeCells.push(`cell_${row}_${column - 1}`);
  };

  if(document.getElementById(`cell_${row}_${column + 1}`)){
    closeCells.push(`cell_${row}_${column + 1}`);
  };

  if(document.getElementById(`cell_${row + 1}_${column - 1}`)){
    closeCells.push(`cell_${row + 1}_${column - 1}`);
  };

  if(document.getElementById(`cell_${row + 1}_${column}`)){
    closeCells.push(`cell_${row + 1}_${column}`);
  };

  if(document.getElementById(`cell_${row + 1}_${column + 1}`)){
    closeCells.push(`cell_${row + 1}_${column + 1}`);
  };

    return closeCells;
};

function revealCloseBlank(cellId) {
  let closeCells = getCloseCells(cellId);
  console.log(closeCells);
  closeCells.forEach(cId => {
  cell = document.getElementById(cId);
  
        //Si case pas encore révélée
        if(cell.classList.contains('hidden')) {

          //Si la case est un chiffre
          if(cell.classList.contains('number')) {
            cell.classList.remove("hidden");
            cell.classList.add("reveal");
            
          };

          //Si la case est vide
          if(!cell.classList.contains('number') && !cell.classList.contains('bomb')) {
            cell.classList.remove("hidden");
            cell.classList.add("reveal");
            console.log('heho');
            revealCloseBlank(cell.id);
          }

        };
  }

)};

function handleGame() {

  //HANDLE LEFT CLICK\\
let allCells = document.querySelectorAll(".cell");
allCells.forEach((element) => {
  element.addEventListener("click", (event) => {
    
    //Si chiffre, révéler la case
    if(event.target.classList.contains('number')) {
      element.classList.remove("hidden");
      element.classList.add("reveal");
    };

    
    //Si mine, révéler toutes les cases,mettre en évidence la case, mettre en evidence les bombes trouvées puis afficher game over
    if(event.target.classList.contains('bomb')) {
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
      
    };
    
    //Si case vide, on révéle la case puis on regarde celles autour
    if(!event.target.classList.contains('number') && !event.target.classList.contains('bomb')) {
      console.log('case vide');
      element.classList.remove("hidden");
      element.classList.add("reveal");
      let cellId = event.target.id;
      revealCloseBlank(cellId);

      

    };
    
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


};

handleGame();













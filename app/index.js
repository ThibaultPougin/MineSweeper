let allCells = document.querySelectorAll(".cell");
let modal = document.getElementById("myModal");
let modalText = document.getElementById("modal-text");
let span = document.getElementsByClassName("close")[0];

//Handle Win or Lose Modale
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

span.onclick = function() {
  modal.style.display = "none";
};

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
            revealCloseBlank(cell.id);
          }

        };
  }

)};

function handleCounter() {

  let flags = document.getElementsByClassName('flag');
  let counter = document.getElementById('mine-count');
  let counterText = document.getElementById('mine-text');
  counter.innerHTML = 10 - flags.length;

  if(flags.length === 9 || flags.length === 10 || flags.length === 11) {
    counterText.innerHTML = '&nbsp;mine restante';
  } else {
    counterText.innerHTML = '&nbsp;mines restantes';
  };

};

function handleWin() {
  let numberHidden = document.querySelectorAll('.number.hidden');
  let blankHidden = document.querySelectorAll(':not(.bomb):not(.number).hidden');
  if(numberHidden.length === 0 && blankHidden.length === 0) {
    
    

    allCells.forEach(cell => {
      if(cell.classList.contains('hidden')) {
        cell.classList.remove('hidden');
        cell.classList.add('findbomb');
      }
      if(cell.classList.contains('flag')) {
        cell.classList.remove('hidden');
        cell.classList.remove('flag');
        cell.classList.add('findbomb');
      }

     
    });
    
  modalText.innerHTML = 'Partie gagnée !';
  modal.style.display = "block";
    
  }

};

function handleGame() {

  //HANDLE LEFT CLICK\\
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

      //Afficher les mines qui ont été trouvées
      allCells.forEach(cell => {
        if(cell.classList.contains('flag') && cell.classList.contains('bomb')) {
          cell.classList.remove('flag');
          cell.classList.add('findbomb');
        } else {
          cell.classList.remove("hidden");
          cell.classList.add("reveal");
        };
       
      });
      return;
    };
    
    //Si case vide, on révéle la case puis on regarde celles autour
    if(!event.target.classList.contains('number') && !event.target.classList.contains('bomb')) {
      element.classList.remove("hidden");
      element.classList.add("reveal");
      let cellId = event.target.id;
      revealCloseBlank(cellId);

      

    };

    handleWin();

    
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
    handleCounter();
  } else {
    event.preventDefault();
  }
}

function removeFlag(event) {
  event.preventDefault();
  event.target.classList.remove("flag");
  event.target.classList.add("hidden");
  event.target.addEventListener("contextmenu", (e) => addFlag(e));
  handleCounter();

}
//HANDLE RIGHT CLICK\\

};

handleGame();













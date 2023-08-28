const gameBoardFactory = () => {
  const gameBoardArray = [];
  for (let i = 0; i < 9; i++) {
      gameBoardArray.push("");
  }

  const render = () => {
      const gridCell = document.querySelectorAll('.card');
      gridCell.forEach(cell => {
          cell.addEventListener("click", () => {
              const gridName = cell.getAttribute("data-grid-name");
              const gridIndex = convertGridNameToIndex(gridName);
              
              if (gameBoardArray[gridIndex] === "") {
                  const currentPlayer = play === 1 ? playerX : playerO;
                  const nextPlayer = play === 1 ? playerO : playerX;
                  gameBoard.updateGrid(gridName, currentPlayer.marker);
                  gameBoard.display(gridName, currentPlayer.marker, nextPlayer.playerid);
                  play = play === 1 ? 0 : 1;
                  
              }
          });
      });
     
  }

  const updateGrid = (gridName, marker) => {
      const gridIndex = convertGridNameToIndex(gridName);
      if (gameBoardArray[gridIndex] === "") {
          gameBoardArray[gridIndex] = marker;
      }
  }
  const win=(winner)=>{
        const winPlayer=document.querySelector(".winner");
        const winn=document.createElement("div");
        winn.textContent=`Player ${winner} has won! Congrats BROOO :)`
        winPlayer.classList.add('winn');
        winPlayer.appendChild(winn);
  }
  const nowinner=()=>{
    const winPlayer=document.querySelector(".winner");
    const winn=document.createElement("div");
    winn.textContent=`It's a tie`
    winPlayer.classList.add('winn');
    winPlayer.appendChild(winn);
}
  const display = (gridName, marker, name) => {
      const nameDis = document.querySelector(".turn");
      const turn = document.createElement('div');
      nameDis.innerHTML = '';
      turn.textContent = `${name}'s turn`;
      nameDis.classList.add('turn');
      nameDis.appendChild(turn);
    
      const gridbox = document.querySelector("." + gridName);
      const displayUp = document.createElement('div');
      const gridIndex = convertGridNameToIndex(gridName);

          displayUp.textContent = marker;
          gridbox.classList.add('displayUp');
          gridbox.appendChild(displayUp);
          updateGrid(gridName, marker);
          if(checkWinCondition(marker)){
            win(marker);
          }
          

  }
  const checkWinCondition=(marker)=>{
   
            console.log(gameBoardArray);
            if((gameBoardArray[0]===marker && gameBoardArray[1]===marker && gameBoardArray[2]===marker)||
            (gameBoardArray[0]===marker && gameBoardArray[3]===marker && gameBoardArray[6]===marker)||
            (gameBoardArray[0]===marker && gameBoardArray[4]===marker && gameBoardArray[8]===marker)||
            (gameBoardArray[1]===marker && gameBoardArray[4]===marker && gameBoardArray[7]===marker)||
            (gameBoardArray[2]===marker && gameBoardArray[4]===marker && gameBoardArray[6]===marker)||
            (gameBoardArray[2]===marker && gameBoardArray[5]===marker && gameBoardArray[8]===marker)||
            (gameBoardArray[3]===marker && gameBoardArray[4]===marker && gameBoardArray[5]===marker)||
            (gameBoardArray[6]===marker && gameBoardArray[7]===marker && gameBoardArray[8]===marker)
            ){
                return true;
            }
            else 
           {
            let count=0;
            for(i=0;i<9;i++){
                if(gameBoardArray[i]!=""){
                    count+=1;
                }
            }
            if(count==9){
            nowinner();
            }
           } 
  }

  return {
      render,
      updateGrid,
      win,
      checkWinCondition,
      display
  };
}

const convertGridNameToIndex = (gridName) => {
  switch (gridName) {
      case "one":
          return 0;
      case "two":
          return 1;
      case "three":
          return 2;
      case "four":
          return 3;
      case "five":
          return 4;
      case "six":
          return 5;
      case "seven":
          return 6;
      case "eight":
          return 7;
      case "nine":
          return 8;
      default:
          return -1;
  }
};

const playerFactory = (playerid, marker) => {
  return {
      playerid,
      marker
  };
}

let play = 1;
const gameBoard = gameBoardFactory();
const playerX = playerFactory("Player X", "X");
const playerO = playerFactory("Player O", "O");

function myfunction() {
    location.reload();  
    
}
function myfunctionForRe() {
    gameBoard.render();
}
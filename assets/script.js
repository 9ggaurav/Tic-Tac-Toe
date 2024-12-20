const form = (() => {
  const startGameButton = document.getElementById("submitstartgame");
  const form = document.getElementById("controls");
  const heading = document.getElementById("heading");
  let formSubmitted = false;

  const formDone = () => {
    form.remove();
  };

  startGameButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      alert("Add your details first!");
      return;
    }

    gameController.getPlayers();
    heading.innerText = `${players[0].name.toUpperCase()}  v/s  ${players[1].name.toUpperCase()}`;
    formSubmitted = true;
    gameController.renderBoard();

    formDone();
  });

  return { formDone, formSubmitted };
})();

//stores state of board, display board and updates board-----------------------------------------------------------------
const gameBoard = (() => {
  const boardContainer = document.getElementById("gameboard");
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  const rows = 3;
  const cols = 3;

  const render = () => {
    boardContainer.innerHTML = "";
    boardContainer.style.display = "grid";
    boardContainer.style.gridTemplateColumns = "100px 100px 100px";
    boardContainer.style.gridTemplateRows = "100px 100px 100px";
    boardContainer.style.gap = "12px";
    let cellid = 0;

    gameBoardArray.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.innerText = value;
      cell.style.border = "1px solid black";
      cell.style.fontSize = "3em";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.borderRadius = "12px";
      cell.style.justifyContent = "center";
      cell.setAttribute("id", index);
      cell.setAttribute("class", "cells");

      cell.addEventListener("click", () => {
        gameController.handleClick(index);
      });

      boardContainer.appendChild(cell);
    });
  };

  return {
    render,
    gameBoardArray,
  };
})();

//creates instance of new player by giving it name and marker--------------------------------------------------------
const playerFactory = (name, marker) => {
  return {
    name,
    marker,
  };
};

//controls all the game-----------------------------------------------------------------------------------------------
const gameController = (function () {
  players = [];
  let currentPlayer = 0;
  let isGameOver=false;
  let winner=null;
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkTermination = () => {
    let i = 0;
    j = 0;

    for (i; i < 8; i++) {
      if (
        gameBoard.gameBoardArray[winCondition[i][j]] ===
          gameBoard.gameBoardArray[winCondition[i][j + 1]] &&
        gameBoard.gameBoardArray[winCondition[i][j + 1]] ===
          gameBoard.gameBoardArray[winCondition[i][j + 2]] &&
        gameBoard.gameBoardArray[winCondition[i][j]] != "" &&
        gameBoard.gameBoardArray[winCondition[i][j + 1]] != "" &&
        gameBoard.gameBoardArray[winCondition[i][j + 2]] != ""
      ) {
        console.log("someone won!");
        if (currentPlayer === 0) {
          console.log("x won");
          console.log(players[currentPlayer].name);
          isGameOver=true;
          return players[currentPlayer].name;
        } else {
          console.log("O won");
          isGameOver=true;
          console.log(players[currentPlayer].name);
          return players[currentPlayer].name;
        }
      }
    }
    if (!gameBoard.gameBoardArray.includes("")) {
      console.log("Draw");
      isGameOver=true;
      return -1;
    }
  };

  // const getRoundInfo=()=>{
  //   if(isGameOver===true && checkTermination()!=-1){
  //     console.log(`${currentPlayer} has won the round!?`)

  //   }
  // }

  const getPlayers = () => {
    players = [
      playerFactory(document.getElementById("player1name").value, "X"),
      playerFactory(document.getElementById("player2name").value, "O"),
    ];
  };

  const handleClick = (index) => {
    if (gameBoard.gameBoardArray[index] === "" && !isGameOver) {
      gameBoard.gameBoardArray[index] = `${players[currentPlayer].marker}`;
      gameBoard.render();
      checkTermination();
      // getRoundInfo();
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    if (currentPlayer === 0) {
      currentPlayer = 1;
    } else {
      currentPlayer = 0;
    }
  };

  const renderBoard = () => {
    gameBoard.render();
  };

  return {
    getPlayers,
    renderBoard,
    handleClick,
    checkTermination,
    players,
    currentPlayer,
  };
})();

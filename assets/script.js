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

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.innerText = gameBoardArray[i * cols + j];
        cell.style.border = "1px solid black";
        cell.style.fontSize = "3em";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.borderRadius = "12px";
        cell.style.justifyContent = "center";
        cell.setAttribute("id", `${cellid++}`);
        cell.setAttribute("class", "cells");
        boardContainer.appendChild(cell);
      }
    }

    const cells = document.querySelectorAll(".cells");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        gameBoardArray[cell.id] = "X";
      });
    });
  };

  return {
    render,
    gameBoardArray
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

  const getPlayers = () => {
    players = [
      playerFactory(document.getElementById("player1name").value, "X"),
      playerFactory(document.getElementById("player2name").value, "O"),
    ];
  };

  const renderBoard=()=>{
    gameBoard.render();
  }

  return {
    getPlayers,
    renderBoard,
    players,
    currentPlayer,
  };
})();

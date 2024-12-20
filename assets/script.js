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

  const getPlayers = () => {
    players = [
      playerFactory(document.getElementById("player1name").value, "X"),
      playerFactory(document.getElementById("player2name").value, "O"),
    ];
  };

  const handleClick = (index) => {
    if (gameBoard.gameBoardArray[index] === "") {
      gameBoard.gameBoardArray[index] = `${players[currentPlayer].marker}`;
      gameBoard.render();
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
    players,
    currentPlayer,
  };
})();

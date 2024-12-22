const form = (() => {
  const startGameButton = document.getElementById("submitstartgame");
  const form = document.getElementById("controls");
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
    gameController.updateDisplay();
    formSubmitted = true;
    gameController.renderBoard();

    formDone();
  });

  return { formDone, formSubmitted };
})();

//stores all varialbes required for the game---------------------------------------------------------------------------
const gameStats = (() => {
  let currentPlayer = 0;
  let isGameOver = false;
  let isDraw = false;
  let player1Score = 0;
  let player2Score = 0;
  let gameRound = 1;
  let checkWin = false;

  return {
    currentPlayer,
    isGameOver,
    player1Score,
    player2Score,
    gameRound,
    checkWin,
  };
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

  const heading = document.getElementById("heading");
  const scoreBoard = document.getElementById("scoreboard");
  const message = document.getElementById("message");
  const restartButtonContainer = document.getElementById("restartbutton");
  const restartButton = document.createElement("button");
  const gameResult = document.getElementById("gameresultdisplay");
  restartButton.innerHTML = "play-again";
  restartButton.setAttribute("id", "restartButton");

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
        if (gameStats.currentPlayer === 0) {
          console.log("x won");
          console.log(players[gameStats.currentPlayer].name);
          gameStats.isGameOver = true;
          gameStats.player1Score++;
          return players[gameStats.currentPlayer].name;
        } else {
          console.log("O won");
          gameStats.isGameOver = true;
          gameStats.player2Score++;
          console.log(players[gameStats.currentPlayer].name);
          return players[gameStats.currentPlayer].name;
        }
      }
    }
    if (!gameBoard.gameBoardArray.includes("")) {
      console.log("Draw");
      gameStats.isGameOver = true;
      gameStats.isDraw = true;
      message.innerText = "Round Draw";
      return -1;
    }
  };

  const getPlayers = () => {
    players = [
      playerFactory(document.getElementById("player1name").value, "X"),
      playerFactory(document.getElementById("player2name").value, "O"),
    ];
  };

  const updateDisplay = () => {
    if (gameStats.isGameOver && !gameStats.isDraw && !gameStats.checkWin) {
      message.innerText = `${players[
        gameStats.currentPlayer
      ].name.toUpperCase()} Wins`;
      scoreBoard.innerText = `${players[0].name.toUpperCase()} : ${
        gameStats.player1Score
      } | ${players[1].name.toUpperCase()} : ${gameStats.player2Score}`;
      restartButtonContainer.appendChild(restartButton);
    } else if (
      gameStats.isGameOver &&
      gameStats.isDraw &&
      !gameStats.checkWin
    ) {
      message.innerText = "Draw";
      scoreBoard.innerText = `${players[0].name.toUpperCase()} : ${
        gameStats.player1Score
      } | ${players[1].name.toUpperCase()} : ${gameStats.player2Score}`;

      restartButtonContainer.appendChild(restartButton);
    } else if (!gameStats.checkWin) {
      heading.innerText = `${players[0].name.toUpperCase()}  v/s  ${players[1].name.toUpperCase()}`;

      scoreBoard.innerText = `${players[0].name.toUpperCase()} : ${
        gameStats.player1Score
      } | ${players[1].name.toUpperCase()} : ${gameStats.player2Score}`;

      message.style.display = "block";
      message.innerText = `Round ${gameStats.gameRound}`;
    }
  };

  const handleClick = (index) => {
    if (
      gameBoard.gameBoardArray[index] === "" &&
      !gameStats.isGameOver &&
      !gameStats.checkWin
    ) {
      gameBoard.gameBoardArray[index] = `${
        players[gameStats.currentPlayer].marker
      }`;
      gameBoard.render();

      checkTermination();
      updateDisplay();
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    if (gameStats.currentPlayer === 0) {
      gameStats.currentPlayer = 1;
    } else {
      gameStats.currentPlayer = 0;
    }
  };

  const renderBoard = () => {
    gameBoard.render();
  };

  restartButton.addEventListener("click", () => {
    console.log("restart clicked");
    restartRound();
  });

  const checkWin = () => {
    if (gameStats.gameRound === 5) {
      gameStats.checkWin = true;
      heading.style.color = "black";
      heading.style.opacity = "1";
      // alert("Game Over");
      if (gameStats.player1score === gameStats.player2Score) {
        heading.innerText = `Game Draw. ${gameStats.player1Score} - ${gameStats.player2Score}`;
      } else if (gameStats.player1Score > gameStats.player2Score) {
        heading.innerText = `${players[0].name} Won by ${
          gameStats.player1Score - gameStats.player2Score
        } Point/s`;
      } else {
        heading.innerText = `${players[1].name} Won by ${
          gameStats.player2Score - gameStats.player1Score
        } Point/s`;
      }
    }
  };

  const restartRound = () => {
    checkWin();
    gameBoard.gameBoardArray.fill("");
    gameStats.isGameOver = false;
    gameStats.isDraw = false;
    gameStats.currentPlayer = 0;
    gameBoard.render();
    message.innerHTML = `Round ${++gameStats.gameRound}`;
    restartButton.remove();
  };

  return {
    getPlayers,
    renderBoard,
    handleClick,
    checkTermination,
    updateDisplay,
    players,
  };
})();

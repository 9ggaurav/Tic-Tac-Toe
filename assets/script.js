const Modal = (() => {
  const modal = document.getElementById("formdialog");
  const start = document.getElementById("submitstartgame");
  const gameForm = document.getElementById("gameform");

  window.addEventListener("DOMContentLoaded", () => {
    modal.showModal();
  });

  const openModal = () => {
    modal.showModal();
  };

  start.addEventListener("click", (event) => {
    event.preventDefault();
    if(!gameForm.checkValidity()){
      alert("please fill out the form!");
      return;
    }
    gameForm.remove();
    modal.close();
  });

  const closeModal = () => {
    modal.close();
  };

  return { openModal, closeModal };
})();

const playerFactory=function(name, marker){
  
}

const gameBoard = (() => {
  const gameContainer = document.getElementById("gameboard");
  let gameBoardArray = ["X", "", "O", "X", "", "", "", "g", ""];
  const rows = 3;
  const cols = 3;

  const render = function (gameBoardArray) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cells");
        cell.style.height = "100px";
        cell.style.width = "100px";
        cell.style.border = "1px solid black";
        cell.style.textAlign = "center";
        cell.style.fontSize = "1em";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.innerText = gameBoardArray[i * cols + j];
        gameContainer.appendChild(cell);
      }
    }
  };


  return { render };

})();

console.log("hell0");

const boxes = document.querySelectorAll(".box");

let Board = ["", "", "", "", "", "", "", "", ""];
let currentMarker = "X";

function switchMarker() {
  if (currentMarker === "X") {
    currentMarker = "O";
  } else {
    currentMarker = "X";
  }
}

function checkWin(board) {
  if (
    (board[0] === board[1] &&
      board[1] === board[2] &&
      board[0] != "" &&
      board[1] != "" &&
      board[2] != "") ||
    (board[3] === board[4] &&
      board[4] === board[5] &&
      board[3] != "" &&
      board[4] != "" &&
      board[5] != "") ||
    (board[6] === board[7] &&
      board[7] === board[8] &&
      board[6] != "" &&
      board[7] != "" &&
      board[8] != "") ||
    (board[0] === board[3] &&
      board[3] === board[6] &&
      board[3] != "" &&
      board[0] != "" &&
      board[6] != "") ||
    (board[1] === board[4] &&
      board[4] === board[7] &&
      board[1] != "" &&
      board[4] != "" &&
      board[7] != "") ||
    (board[2] === board[5] &&
      board[5] === board[8] &&
      board[2] != "" &&
      board[5] != "" &&
      board[8] != "") ||
    (board[0] === board[4] &&
      board[4] === board[8] &&
      board[0] != "" &&
      board[4] != "" &&
      board[8] != "") ||
    (board[2] === board[4] &&
      board[4] === board[6] &&
      board[2] != "" &&
      board[4] != "" &&
      board[6] != "")
  ) {
    console.log("someone won");
  }
}

function displayBoard(array) {
  let i = 0;
  boxes.forEach((box) => {
    box.setAttribute("id", `${i}`);
    box.innerText = `${array[i++]}`;
  });
}

displayBoard(Board);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    Board[box.id] = `${currentMarker}`;
    displayBoard(Board);
    checkWin(Board);
    switchMarker();
  });
});

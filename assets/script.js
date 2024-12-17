console.log("hell0");

const boxes = document.querySelectorAll(".box");
const roundResult = document.getElementById("round-result");

let Board = ["", "", "", "", "", "", "", "", ""];
let currentMarker = "X";
let roundOver = false;
let round = 1;

function switchMarker() {
  if (currentMarker === "X") {
    currentMarker = "O";
  } else {
    currentMarker = "X";
  }
}

function roundStatus(board) {
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
    console.log(`${currentMarker} Won the round`);
    roundOver = true;
    roundResult.innerText = `${currentMarker} Won the Round! Click anywhere to start new Round`;
  }
  else if(!Board.includes("")){
    console.log("Round Draw");
    roundOver = true;
    roundResult.innerText = `Round Draw! Click anywhere to start new Round`;

}
}

function displayBoard(array) {
  let i = 0;
  boxes.forEach((box) => {
    box.setAttribute("id", `${i}`);
    box.innerText = `${array[i++]}`;
  });
}

function playRound(box) {
  if (roundOver) {
    console.log("Round Over!");
    console.log("Start new Round");
    Board = ["", "", "", "", "", "", "", "", ""];
    currentMarker = "X";
    roundOver = false;
    displayBoard(Board);
    round = round + 1;
    roundResult.innerText = `Round ${round}`;
  } else {
    if (Board[box.id] === "") {
      Board[box.id] = `${currentMarker}`;
      displayBoard(Board);
      roundStatus(Board);
      switchMarker();
    } else {
      console.log("Can't play there");
    }
  }
}

displayBoard(Board);

boxes.forEach((box) => {
  box.addEventListener("click", () => playRound(box));
});

"use strict";
const boxes = document.querySelectorAll(".grid-container__btn");
const winnerMsg = document.querySelector(".main__winner-msg");
const restartBtn = document.querySelector(".controller__button");
const audioPlayer = document.getElementById("audioPlayer");

audioPlayer.volume = 0.4;

const startMusic = document.getElementById("playButton");
startMusic.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    startMusic.textContent = "Pause Audio";
  } else {
    audioPlayer.pause();
    startMusic.textContent = "Play Audio";
  }
});

let turn = "X";
let gameOver = false;
let gameStarted = true;

const winCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

function checkIfWin() {
  for (let winCombo of winCombinations) {
    const [a, b, c] = winCombo;

    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      gameOver = true;

      showWin(boxes[a].textContent);
      highlightWinner(winCombo);
      return true;
    }
  }
  if ([...boxes].every((box) => box.textContent != "")) {
    gameOver = true;
    showWin("draw");
    return true;
  }
  return false;
}

function showWin(winner) {
  winnerMsg.textContent = winner === "draw" ? "Draw" : `${winner} is winner`;
}

function highlightWinner(winBox) {
  for (let i of winBox) {
    boxes[i].classList.add("controller__button--winner");
  }
}

function clickEvent(event) {
  if (!gameStarted || gameOver) return;

  const btn = event.target;

  if (btn.textContent !== "") return;

  btn.textContent = turn;

  if (!checkIfWin()) turn = changeTurn();
}
function restartGame() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("controller__button--winner");
  });

  turn = "X";
  gameOver = false;
  gameStarted = true;
  winnerMsg.textContent = "";
}

const play = () =>
  boxes.forEach((box) => box.addEventListener("click", clickEvent));
play();
restartBtn.addEventListener("click", restartGame);

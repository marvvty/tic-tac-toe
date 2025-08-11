class Player {
  constructor(game, board) {
    this.player = "X";

    this.game = game;
    this.boardObject = board;
  }

  changePlayer() {
    this.player = this.player === "X" ? "O" : "X";
  }

  makeMove(row, col) {
    if (this.game.getIsGameOver()) return;
    if (this.boardObject.board[row][col] !== "") return;

    this.boardObject.board[row][col] = this.player;
    this.boardObject.drawBoard();

    if (this.game.checkWin()) {
      this.game.msg.textContent = `Winner is ${this.player}`;
      this.game.setIsGameOver(true);

      return;
    }

    if (this.game.checkDraw()) {
      this.game.msg.textContent = `Draw`;
      this.game.setIsGameOver(true);

      return;
    }
    this.changePlayer();
  }

  setPlayer(newPlayer) {
    this.player = newPlayer;
  }
}
class TicTacToeBoard {
  constructor(game) {
    this.board = [];
    this.boardSize = 3;

    this.boardDiv = document.getElementById("board");
    this.game = game;
  }

  createBoard() {
    for (let row = 0; row < this.boardSize; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        this.board[row][col] = "";
      }
    }
  }

  createCell(row, col) {
    const btn = document.createElement("button");
    btn.classList = "btn controller__element grid-container__btn";

    btn.textContent = this.board[row][col];
    btn.addEventListener("click", () => this.player.makeMove(row, col));

    return btn;
  }

  drawBoard() {
    this.boardDiv.replaceChildren();
    this.boardDiv.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cellBtn = this.createCell(row, col);
        this.boardDiv.appendChild(cellBtn);
      }
    }
  }

  checkWin() {
    if (this.checkColumns()) return true;

    if (this.checkRows()) return true;

    if (this.checkDiagonals()) return true;

    return false;
  }

  checkDraw() {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.board[row][col] === "") {
          return false;
        }
      }
    }

    return true;
  }

  getRow(rowNumber) {
    return this.board[rowNumber];
  }

  getColumn(colNumber) {
    let column = [];

    for (let row = 0; row < this.boardSize; row++) {
      column.push(this.board[row][colNumber]);
    }

    return column;
  }

  getMainDiagonal() {
    let diagonal = [];

    for (let i = 0; i < this.boardSize; i++) {
      diagonal.push(this.board[i][i]);
    }

    return diagonal;
  }

  getSecondDiagonal() {
    let diagonal = [];

    for (let i = 0; i < this.boardSize; i++) {
      diagonal.push(this.board[i][this.boardSize - 1 - i]);
    }

    return diagonal;
  }

  checkColumns() {
    for (let col = 0; col < this.boardSize; col++) {
      if (this.checkOneLine(this.getColumn(col))) {
        return true;
      }
    }

    return false;
  }

  checkRows() {
    for (let row = 0; row < this.boardSize; row++) {
      if (this.checkOneLine(this.getRow(row))) {
        return true;
      }
    }

    return false;
  }

  checkDiagonals() {
    if (this.checkOneLine(this.getMainDiagonal())) {
      return true;
    }

    if (this.checkOneLine(this.getSecondDiagonal())) {
      return true;
    }
    return false;
  }

  checkOneLine(line) {
    let firstSymbol = line[0];

    if (firstSymbol === "") return false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] !== firstSymbol) {
        return false;
      }
    }

    return true;
  }
  changeBoardSize(newBoardSize) {
    if (3 > newBoardSize || newBoardSize > 100) {
      alert("need >=3 or <=100");
      return;
    }

    this.boardSize = newBoardSize;
    this.game.initGame();
  }
}
class TicTacToeGame {
  constructor() {
    this.isGameOver = false;

    this.msg = document.getElementById("msg");
    this.restartBtn = document.getElementById("restartBtn");
    this.boardSizeInput = document.getElementById("boardSizeInput");
    this.setBoardSizeBtn = document.getElementById("setBoardSizeBtn");

    this.player = new Player(this, null);
    this.boardObject = new TicTacToeBoard(this);
    this.player.board = this.boardObject;

    this.initGame();
    this.addListeners();
  }

  getIsGameOver() {
    return this.isGameOver;
  }

  setIsGameOver(isGameOver) {
    this.isGameOver = isGameOver;
  }

  clearMsg() {
    this.msg.textContent = "";
  }

  handlerBoardSize() {
    let newSize = parseInt(this.boardSizeInput.value, 10);

    this.boardObject.changeBoardSize(newSize);
  }

  initGame() {
    this.player.setPlayer("X");
    this.isGameOver = false;

    this.clearMsg();
    this.boardObject.createBoard();
    this.boardObject.drawBoard();
  }

  addListeners() {
    this.restartBtn.addEventListener("click", () => this.initGame());
    this.setBoardSizeBtn.addEventListener("click", () =>
      this.handlerBoardSize()
    );
    this.boardSizeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handlerBoardSize();
      }
    });
  }
}
class Music {
  constructor() {
    this.playBtn = document.getElementById("playBtn");
    this.audioPlayer = document.getElementById("audioPlayer");
    this.audioPlayer.volume = 0.4;
    this.addButtonListeners();
  }

  changeButtonTitle(newTitle) {
    this.playBtn.textContent = newTitle;
  }
  addButtonListeners() {
    this.playBtn.addEventListener("click", () => {
      if (this.audioPlayer.paused) {
        this.audioPlayer.play();
        this.changeButtonTitle("pause music");
      } else {
        this.audioPlayer.pause();
        this.changeButtonTitle("play music");
      }
    });
  }
}
const ticTacToe = new TicTacToeGame();
const music = new Music();

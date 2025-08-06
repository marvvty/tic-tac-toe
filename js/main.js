class TicTacToe {
  constructor() {
    this.boardSize = 3;
    this.player = "X";
    this.board = [];
    this.isGameOver = false;

    this.boardDiv = document.getElementById("board");
    this.msg = document.getElementById("msg");
    this.restartBtn = document.getElementById("restartBtn");
    this.addRowBtn = document.getElementById("addRow");
    this.removeRowBtn = document.getElementById("removeRow");

    this.initGame();
    this.addButtonListeners();
  }

  createBoard() {
    for (let row = 0; row < this.boardSize; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        this.board[row][col] = "";
      }
    }
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

  createCell(row, col) {
    const btn = document.createElement("button");
    btn.classList = "btn grid-container__btn";

    btn.textContent = this.board[row][col];
    btn.addEventListener("click", () => this.makeMove(row, col));

    return btn;
  }

  changePlayer() {
    this.player = this.player === "X" ? "O" : "X";
  }

  makeMove(row, col) {
    if (this.isGameOver) return;
    if (this.board[row][col] !== "") return;

    this.board[row][col] = this.player;
    this.drawBoard();

    if (this.checkWin()) {
      this.msg.textContent = `Winner is ${this.player}`;
      this.isGameOver = true;

      return;
    }

    if (this.checkDraw()) {
      this.msg.textContent = `Draw`;
      this.isGameOver = true;

      return;
    }
    this.changePlayer();
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

  clearMsg() {
    this.msg.textContent = "";
  }

  changeBoardSize(newBoardSize) {
    if (3 > newBoardSize || newBoardSize > 100) return;

    this.boardSize = newBoardSize;
    this.initGame();
  }

  initGame() {
    this.player = "X";
    this.isGameOver = false;

    this.clearMsg();
    this.createBoard();
    this.drawBoard();
  }

  addButtonListeners() {
    this.restartBtn.addEventListener("click", () => this.initGame());
    this.addRowBtn.addEventListener("click", () =>
      this.changeBoardSize(this.boardSize + 1)
    );
    this.removeRowBtn.addEventListener("click", () =>
      this.changeBoardSize(this.boardSize - 1)
    );
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
const ticTacToe = new TicTacToe();
const music = new Music();

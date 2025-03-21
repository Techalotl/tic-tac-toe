function gameBoard() {
  const squaresPerSide = 3;
  const board = [];

  for (let i = 0; i < squaresPerSide; i++) {
      board[i] = [];
      for (let j = 0; j < squaresPerSide; j++) {
          board[i].push("-");
      }
  }

  const getBoard = () => board;

  const putMark = (row, column, playerMark) => {
      board[row][column] = playerMark;
  };

  const printBoard = () => console.log(board);

  return { getBoard, putMark, printBoard }
}

function users() {
const playerOneName = prompt("Player one: enter your name");
const playerTwoName = prompt("Player two: enter your name");
const player = [
  {
    name: playerOneName,
    mark: "x",
  },
  {
    name: playerTwoName,
    mark: "o",
  }
]
let activePlayer = player[0];
const getActivePlayer = () => activePlayer;
const switchPlayerTurn = () => {
  activePlayer === player[0] ? activePlayer = player[1] : activePlayer = player[0];
}
return { getActivePlayer, switchPlayerTurn }
}

function playing() {
const players = users();
const board = gameBoard();
const newRound = () => {
  board.printBoard();
  console.log(`It's ${players.getActivePlayer().name} turn`);
}
const playRound = (row, column) => {
  if (board.getBoard()[row][column] === "-") {
    board.putMark(row, column, players.getActivePlayer().mark);
    console.log(`${players.getActivePlayer().name} has put "${players.getActivePlayer().mark}" into row ${row}, column ${column}`);
    players.switchPlayerTurn();
    newRound();
  } else {
      console.log("That square is occupied, dummy!")
      newRound();
      return;
  }
}

newRound();
return { playRound };
}

const game = playing();
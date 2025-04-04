function gameBoard() {
  const squaresPerSide = 3;
  const board = [];

  const fillBoard = () => {
    for (let i = 0; i < squaresPerSide; i++) {
      board[i] = [];
      for (let j = 0; j < squaresPerSide; j++) {
        board[i].push("-");
      }
    }
  }

  fillBoard();

  const getBoard = () => board;

  const putMark = (row, column, playerMark) => {
      board[row][column] = playerMark;
  };

  const printBoard = () => console.log(board);

  const resetBoard = () => {
    for (let i = 0; i < squaresPerSide; i++) {
      board[i] = [];
      for (let j = 0; j < squaresPerSide; j++) {
        board[i].pop();
      }
    }
    fillBoard();
  }

  return { getBoard, putMark, printBoard, resetBoard }
}

function users() {
  const playerOneName = prompt("Player one: enter your name");
  const playerTwoName = prompt("Player two: enter your name");
  const player = [
    {
      name: playerOneName,
      mark: "x",
      wins: 0,
    },
    {
      name: playerTwoName,
      mark: "o",
      wins: 0,
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
    board.resetBoard();
    console.log(`Let's start a new round, shall we?`);
    newTurn();
  }
  const newTurn = () => {
    board.printBoard();
    console.log(`It's your turn, ${players.getActivePlayer().name}`);
  }
  const playTurn = (row, column) => {
    if (board.getBoard()[row][column] === "-") {
      board.putMark(row, column, players.getActivePlayer().mark);
      console.log(`${players.getActivePlayer().name} has put "${players.getActivePlayer().mark}" into row ${row}, column ${column}`);
      checkWin(row, column);
    } else {
        console.log("Check your input, please. Something is wrong with it.")
        newTurn();
        return;
    }
  }
  const tieCounter = () => {
    let tie = 0;
    return () => {
      tie++;
      console.log(`It's a tie... Number of ties: ${tie}`);
    };
  };
  const tie = tieCounter();
  const checkWin = (row, column) => {
    const checkFullBoard = board.getBoard().map(row => row.filter(cell => cell != "-")).filter(row => row.length === 3);
    const currentRow = board.getBoard()[row].filter(cell => cell === players.getActivePlayer().mark);
    const currentColumn = board.getBoard().map(cell => cell[column]).filter(cell => cell === players.getActivePlayer().mark);
    const leftDiagonal = [[board.getBoard()[0][0]],[board.getBoard()[1][1]],[board.getBoard()[2][2]]].filter(cell => cell == players.getActivePlayer().mark);
    const rightDiagonal = [[board.getBoard()[2][0]],[board.getBoard()[1][1]],[board.getBoard()[0][2]]].filter(cell => cell == players.getActivePlayer().mark);
    if (currentRow.length === 3 || currentColumn.length === 3 || leftDiagonal.length === 3 || rightDiagonal.length === 3) {
      players.getActivePlayer().wins++;
      console.log(`${players.getActivePlayer().name} won! It's your win #${players.getActivePlayer().wins}`);
      board.printBoard();
      players.switchPlayerTurn();
      newRound();
    } else if (checkFullBoard.length === 3) {
        board.printBoard();
        tie();
        players.switchPlayerTurn();
        newRound()
     } else {
        players.switchPlayerTurn();
        newTurn();
    }
  }
  
  newRound();
  return { playTurn };
}

const game = playing();
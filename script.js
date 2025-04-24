function gameBoard() {
  const squaresPerSide = 3;
  const board = [];

  const fillBoard = () => {
    for (let i = 0; i < squaresPerSide; i++) {
      board[i] = [];
      for (let j = 0; j < squaresPerSide; j++) {
        board[i].push("");
      }
    }
  }

  fillBoard();

  const getBoard = () => board;

  const putMark = (row, column, playerMark) => {
      board[row][column] = playerMark;
  };

  const resetBoard = () => {
    for (let i = 0; i < squaresPerSide; i++) {
      board[i] = [];
      for (let j = 0; j < squaresPerSide; j++) {
        board[i].pop();
      }
    }
    fillBoard();
  }

  return { getBoard, putMark, resetBoard }
}

function playing() {
  const board = gameBoard();
  const messages = document.querySelector(".messages");
  const ties = document.querySelector(".ties");
  const winsP1 = document.querySelector(".win-p1");
  const winsP2 = document.querySelector(".win-p2");

  const player = [
    {
      name: "Player One",
      mark: "x",
      wins: 0,
    },
    {
      name: "Player Two",
      mark: "o",
      wins: 0,
    }
  ]
  let activePlayer = player[0];
  const getActivePlayer = () => activePlayer;
  const switchPlayerTurn = () => {
    activePlayer === player[0] ? activePlayer = player[1] : activePlayer = player[0];
  }

  const newRound = () => {
    board.resetBoard();
    messages.textContent = `It's your turn, ${getActivePlayer().name}`;
  }

  const playTurn = (row, column) => {
      board.putMark(row, column, getActivePlayer().mark);
  }

  const tieCounter = (() => {
    let tie = 0;
    return () => {
      tie++;
      ties.textContent = tie;
      messages.textContent = `It's a tie...`;
    };
  })();

  const checkWin = (row, column) => {
    const checkFullBoard = board.getBoard().map(row => row.filter(cell => cell != "")).filter(row => row.length === 3);
    const currentRow = board.getBoard()[row].filter(cell => cell === getActivePlayer().mark);
    const currentColumn = board.getBoard().map(cell => cell[column]).filter(cell => cell === getActivePlayer().mark);
    const leftDiagonal = [[board.getBoard()[0][0]],[board.getBoard()[1][1]],[board.getBoard()[2][2]]].filter(cell => cell == getActivePlayer().mark);
    const rightDiagonal = [[board.getBoard()[2][0]],[board.getBoard()[1][1]],[board.getBoard()[0][2]]].filter(cell => cell == getActivePlayer().mark);
    if (currentRow.length === 3 || currentColumn.length === 3 || leftDiagonal.length === 3 || rightDiagonal.length === 3) {
      getActivePlayer().wins++;
      messages.textContent = `${getActivePlayer().name} won! Congrats!`;
      winsP1.textContent = player[0].wins;
      winsP2.textContent = player[1].wins;
      const square = document.querySelectorAll(".square");
      square.forEach(button => button.disabled = true);
      switchPlayerTurn();
    } else if (checkFullBoard.length === 3) {
        tieCounter();
        switchPlayerTurn();
     } else {
        switchPlayerTurn();
        messages.textContent = `It's your turn, ${getActivePlayer().name}`;
    }
  }
  return { player, getActivePlayer, playTurn, newRound, getBoard: board.getBoard, checkWin };
}

function displayGame () {
  const game = playing();
  const boardDiv = document.querySelector(".board");
  const winsP1 = document.querySelector(".win-p1");
  const winsP2 = document.querySelector(".win-p2");
  const ties = document.querySelector(".ties");
  winsP1.textContent = "0";
  winsP2.textContent = "0";
  ties.textContent = "0";
  
  const boardSection = document.querySelector(".game-board");
  boardSection.style.display = "none";

  const playButton = document.querySelector("#play-button");
  const roundButton = document.querySelector("#round-button");
  const newGame = document.querySelector("#new-game");

  playButton.addEventListener("click", (e) => {
    e.preventDefault();
    const userData = document.querySelector(".user-data");
    userData.style.display = "none";
    boardSection.style.display = "flex";
    game.player[0].name = document.querySelector("#nameP1").value || "Player One";
    game.player[1].name = document.querySelector("#nameP2").value || "Player Two";
    game.newRound();
    displayBoard();
  })
  roundButton.addEventListener("click", () => {
    game.newRound();
    displayBoard();
  });
  newGame.addEventListener("click", () => {
    location.reload();
  })

  const displayBoard = () => {
    const buttonCounter = (function() {
      let counter = 0;
      return function() {
          counter++;
          return counter;
      }
    })();
    boardDiv.textContent = "";
    const board = game.getBoard();
    board.forEach(row => {
      row.forEach(cell => {
        const square = document.createElement("button");
        boardDiv.appendChild(square);
        square.setAttribute("class", "square");
        square.setAttribute("id", buttonCounter());
        square.textContent = cell;
        if (cell != "") {
          square.disabled = true;
        }
    })});
  }
  
  boardDiv.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "1":
      game.playTurn(0,0);
      displayBoard();
      game.checkWin(0,0);
      break;
    case "2":
      game.playTurn(0,1);
      displayBoard()
      game.checkWin(0,1);
      break;
    case "3":
      game.playTurn(0,2);
      displayBoard();
      game.checkWin(0,2)
      break;
    case "4":
      game.playTurn(1,0);
      displayBoard();
      game.checkWin(1,0);
      break;
    case "5":
      game.playTurn(1,1);
      displayBoard();
      game.checkWin(1,1);
      break;
    case "6":
      game.playTurn(1,2);
      displayBoard();
      game.checkWin(1,2)
      break;
    case "7":
      game.playTurn(2,0);
      displayBoard();
      game.checkWin(2,0)
      break;
    case "8":
      game.playTurn(2,1);
      displayBoard();
      game.checkWin(2,1)
      break;
    case "9":
      game.playTurn(2,2);
      displayBoard();
      game.checkWin(2,2)
      break;
    default:
      break;
  }
  });
};

displayGame();
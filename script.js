window.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-grid");
  const score = document.querySelector(".score");
  const newGame = document.querySelector(".new-game");
  const gameOverContainer = document.querySelector(".game-over-container");
  const grid = 4;
  const squares = [];

  // game over
  const gameOver = () => {
    let count = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML !== "") count++;
    }
    if (count === 16) {
      document.removeEventListener("keyup", keyPressHandler);
      gameOverContainer.style.display = "flex";
    }
  };

  // generate random twos
  const generateTwos = () => {
    const randomTwos = Math.floor(Math.random() * (grid * grid));
    if (squares[randomTwos].innerHTML === "") squares[randomTwos].innerHTML = 2;
    else {
      generateTwos();
    }
    gameOver();
  };

  // create grids of the game
  const createBoard = () => {
    for (let i = 0; i < grid * grid; i++) {
      let square = document.createElement("div");
      square.innerHTML = "";
      gameContainer.appendChild(square);
      squares.push(square);
    }
    generateTwos();
    generateTwos();
  };

  // swipe right
  const moveRight = () => {
    for (let i = 0; i < squares.length; i++) {
      if (i % grid === 0) {
        const row = [
          squares[i].innerHTML,
          squares[i + 1].innerHTML,
          squares[i + 2].innerHTML,
          squares[i + 3].innerHTML,
        ];
        const filteredEl = row.filter((num) => num);
        const emptyArr = new Array(grid - filteredEl.length).fill("");
        const newRow = emptyArr.concat(filteredEl);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  // swipe left
  const moveLeft = () => {
    for (let i = 0; i < squares.length; i++) {
      if (i % grid === 0) {
        const row = [
          squares[i].innerHTML,
          squares[i + 1].innerHTML,
          squares[i + 2].innerHTML,
          squares[i + 3].innerHTML,
        ];
        const filteredEl = row.filter((num) => num);
        const emptyArr = new Array(grid - filteredEl.length).fill("");
        const newRow = filteredEl.concat(emptyArr);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  // swipe bottom
  const moveBottom = () => {
    for (let i = 0; i < grid; i++) {
      const col = [
        squares[i].innerHTML,
        squares[i + grid].innerHTML,
        squares[i + 2 * grid].innerHTML,
        squares[i + 3 * grid].innerHTML,
      ];
      const filteredEl = col.filter((num) => num);
      const emptyArr = new Array(grid - filteredEl.length).fill("");
      const newCol = emptyArr.concat(filteredEl);

      squares[i].innerHTML = newCol[0];
      squares[i + grid].innerHTML = newCol[1];
      squares[i + 2 * grid].innerHTML = newCol[2];
      squares[i + 3 * grid].innerHTML = newCol[3];
    }
  };

  // swipe top
  const moveTop = () => {
    for (let i = 0; i < grid; i++) {
      const col = [
        squares[i].innerHTML,
        squares[i + grid].innerHTML,
        squares[i + 2 * grid].innerHTML,
        squares[i + 3 * grid].innerHTML,
      ];
      const filteredEl = col.filter((num) => num);
      const emptyArr = new Array(grid - filteredEl.length).fill("");
      const newCol = filteredEl.concat(emptyArr);

      squares[i].innerHTML = newCol[0];
      squares[i + grid].innerHTML = newCol[1];
      squares[i + 2 * grid].innerHTML = newCol[2];
      squares[i + 3 * grid].innerHTML = newCol[3];
    }
  };

  // generate background & font color for combined grid
  const gridColorUpgrade = (arrCount, sum) => {
    gameContainer.children[arrCount].style.color = "#ffffff";
    switch (sum) {
      case 4: {
        gameContainer.children[arrCount].style.backgroundColor = "#C2F261";
        break;
      }
      case 8: {
        gameContainer.children[arrCount].style.backgroundColor = "#F2F230";
        break;
      }
      case 16: {
        gameContainer.children[arrCount].style.backgroundColor = "#B1B1D3";
        break;
      }
      case 32: {
        gameContainer.children[arrCount].style.backgroundColor = "#FF9233";
        break;
      }
      case 64: {
        gameContainer.children[arrCount].style.backgroundColor = "#FF9999";
        break;
      }
      case 128: {
        gameContainer.children[arrCount].style.backgroundColor = "#FF3333";
        break;
      }
      case 256: {
        gameContainer.children[arrCount].style.backgroundColor = "#FF70B5";
        break;
      }
      case 512: {
        gameContainer.children[arrCount].style.backgroundColor = "#1FDAFF";
        break;
      }
      case 1024: {
        gameContainer.children[arrCount].style.backgroundColor = "#98D7B7";
        break;
      }
      case 2048: {
        gameContainer.children[arrCount].style.backgroundColor = "#7B4B94";
        break;
      }
      default: {
        gameContainer.children[arrCount].style.backgroundColor = "#979696dc";
        gameContainer.children[arrCount].style.color = "#383838e3";
      }
    }
  };

  // combined rows to add numbers
  const combinedRows = (right) => {
    for (let i = 0; i < 15; i++) {
      gridColorUpgrade(i, parseInt(squares[i].innerHTML));
      if (
        parseInt(squares[i].innerHTML) == parseInt(squares[i + 1].innerHTML)
      ) {
        let combinedVal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        if (!right) {
          squares[i].innerHTML = combinedVal;
          gridColorUpgrade(i, combinedVal);
          squares[i + 1].innerHTML = "";
          gridColorUpgrade(i + 1, "");
        } else {
          squares[i + 1].innerHTML = combinedVal;
          gridColorUpgrade(i + 1, combinedVal);
          squares[i].innerHTML = "";
          gridColorUpgrade(i, "");
        }
        score.innerHTML = parseInt(score.innerHTML) + parseInt(combinedVal);
      }
    }
    gridColorUpgrade(15, parseInt(squares[15].innerHTML));
  };

  // combined columns to add numbers
  const combinedCols = (bottom) => {
    for (let i = 0; i < 12; i++) {
      gridColorUpgrade(i, parseInt(squares[i].innerHTML));
      if (
        parseInt(squares[i].innerHTML) == parseInt(squares[i + grid].innerHTML)
      ) {
        let combinedVal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + grid].innerHTML);
        if (!bottom) {
          squares[i].innerHTML = combinedVal;
          gridColorUpgrade(i, combinedVal);
          squares[i + grid].innerHTML = "";
          gridColorUpgrade(i + grid, "");
        } else {
          squares[i + grid].innerHTML = combinedVal;
          gridColorUpgrade(i + grid, combinedVal);
          squares[i].innerHTML = "";
          gridColorUpgrade(i, "");
        }
        score.innerHTML = parseInt(score.innerHTML) + parseInt(combinedVal);
      }
    }
    for (let i = 12; i < squares.length; i++) {
      gridColorUpgrade(i, parseInt(squares[i].innerHTML));
    }
  };

  // key press
  const keyRight = () => {
    moveRight();
    combinedRows(true);
    generateTwos();
  };

  const keyLeft = () => {
    moveLeft();
    combinedRows(false);
    generateTwos();
  };

  const keyBottom = () => {
    moveBottom();
    combinedCols(true);
    generateTwos();
  };

  const keyTop = () => {
    moveTop();
    combinedCols(false);
    generateTwos();
  };

  const keyPressHandler = (e) => {
    switch (e.keyCode) {
      case 39: {
        keyRight();
        break;
      }
      case 37: {
        keyLeft();
        break;
      }
      case 40: {
        keyBottom();
        break;
      }
      case 38: {
        keyTop();
        break;
      }
    }
  };

  // new game handler
  const newGameHandler = (e) => {
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerHTML = "";
      gameContainer.children[i].style.backgroundColor = "#979696dc";
      gameContainer.children[i].style.color = "#383838e3";
    }
    score.innerHTML = 0;
    generateTwos();
    generateTwos();
    gameOverContainer.style.display = "none";
    document.addEventListener("keyup", keyPressHandler);
  };

  createBoard();

  document.addEventListener("keyup", keyPressHandler);

  newGame.addEventListener("click", newGameHandler);
});

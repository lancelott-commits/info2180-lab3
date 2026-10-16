document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll("#board > div");
  const status = document.getElementById("status");
  const btn = document.querySelector(".btn");
  const boardState = ["", "", "", "", "", "", "", "", ""];
  const winningCombos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  const defaultMessage = "Move your mouse over a square and click to play an X or an O.";
  let currentPlayer = "X";

  squares.forEach(function (square, index) {
    square.classList.add("square");

    square.addEventListener("click", function () {
      if (boardState[index] !== "") return;

      boardState[index] = currentPlayer;
      square.classList.add(currentPlayer);
      square.textContent = currentPlayer;

      if (checkWinner(currentPlayer)) {
        status.textContent = "Congratulations! " + currentPlayer + " is the Winner!";
        status.classList.add("you-won");
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });

    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });

    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  });

  btn.addEventListener("click", function () {
    squares.forEach(function (square, index) {
      square.textContent = "";
      square.classList.remove("X", "O");
      boardState[index] = "";
    });

    currentPlayer = "X";
    status.textContent = defaultMessage;
    status.classList.remove("you-won");
  });

  function checkWinner(player) {
    return winningCombos.some(function (combo) {
      return combo.every(function (i) {
        return boardState[i] === player;
      });
    });
  }
});





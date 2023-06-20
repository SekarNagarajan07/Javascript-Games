const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelector(".controls i");

let foodX = 13,
  foodY = 10;

const initGame = () => {
  let htmlMarkup = `<div class = "food" style = "grid-area: ${foodX} / ${foodY}"> </div>`;
  playBoard.innerHTML = htmlMarkup;
};

initGame();

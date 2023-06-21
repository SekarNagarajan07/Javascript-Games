const playBoard = document.querySelector(".play-board");

let foodX = 13,
  foodY = 10;

let snakeX = 5,
  snakeY = 10;

let velocityX = 0,
  velocityY = 1;

const changeFoodPosition = () => {
  //passing a random 0 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  //Changing velocity value based on key press
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
};
const initGame = () => {
  let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"> </div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
  }

  //Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  htmlMarkup += `<div class = "head" style = "grid-area: ${snakeY} / ${snakeX}"> </div>`;
  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);

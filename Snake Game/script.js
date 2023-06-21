const playBoard = document.querySelector(".play-board");

let gameOver = false;
let foodX = 13,
  foodY = 10;

let snakeX = 5,
  snakeY = 10;

let velocityX = 0,
  velocityY = 1;

let snakeBody = [];

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
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"> </div>`;

  //Checking if the snake hit the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //pushing food position to snake body array.

    // console.log(snakeBody);
  }

  //Shifting forward the values of the elements in the snake body by one.
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; //setting first element of snake body to current snake position.

  //Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    // console.log("Game Over!!");
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    //Adding a div for each part of the snake's body
    htmlMarkup += `<div class = "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"> </div>`;
  }

  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);

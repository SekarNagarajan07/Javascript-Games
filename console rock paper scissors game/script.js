let playGame = confirm("Shall we play rock, paper, scissors game?");
if (playGame) {
  //play
  let playerChoice = prompt("Enter Rock, Paper, or Scissors.");
  if (playerChoice) {
    let playerOne = playerChoice.trim().toLowerCase();
    if (
      playerOne === "rock" ||
      playerOne === "paper" ||
      playerOne === "scissors"
    ) {
      let computerChoice = Math.floor(Math.random() * 3 + 1);
      let computer =
        computerChoice === 1
          ? "rock"
          : computerChoice === 2
          ? "paper"
          : "scissors";

      let result =
        playerOne === computer
          ? "Tie Game"
          : playerOne === "rock" && computer === "paper"
          ? `playerOne: ${playerOne}\n computer: ${computer}\n Computer wins!`
          : playerOne === "paper" && computer === "scissors"
          ? `playerOne: ${playerOne}\n computer: ${computer}\n Computer wins!`
          : playerOne === "scissors" && computer === "rock"
          ? `playerOne: ${playerOne}\n computer: ${computer}\n Computer wins!`
          : `playerOne: ${playerOne}\n computer: ${computer}\n Player wins!`;
      alert(result);
      let playAgain = confirm("Play Again");
      playAgain ? location.reload() : alert("OK, Thanks for playing");
    } else {
      alert("You didn't enter rock, paper, or scissors");
    }
  } else {
    alert("I guess you changed your mind. Maybe next time.");
  }
} else {
  alert("ok, maybe next time");
}

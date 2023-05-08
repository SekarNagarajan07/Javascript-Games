const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// 1.Deposit some money
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount:₹ ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Please enter a valid deposit amount");
    } else {
      return numberDepositAmount;
    }
  }
};

// 2.Determine number of lines to bet on

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Please enter a valid deposit amount: ₹ ");
    } else {
      return numberOfLines;
    }
  }
};

// 3.Collect a bet amount

const getBet = (balance, lines) => {
  while (true) {
    const betAmount = prompt("Enter the bet per line: ");
    const numberBetAmount = parseFloat(betAmount);

    if (
      isNaN(numberBetAmount) ||
      numberBetAmount <= 0 ||
      numberBetAmount > balance / lines
    ) {
      console.log("Please enter a valid bet amount");
    } else {
      return numberBetAmount;
    }
  }
};

// 4. Spin the slot machine

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// 5. check if the user won

const getWinnings = (rows, betAmount, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += betAmount * SYMBOLS_VALUE[symbols[0]];
    }
  }

  return winnings;
};

// 6. give the user their winnings

const game = () => {
  let balance = deposit();
  while(true) {
    console.log("You have a balance of ₹" + balance)
  const numberOfLines = getNumberOfLines();
  const betAmount = getBet(balance, numberOfLines);
  balance -= betAmount * numberOfLines;
  const reels = spin();
  const rows = transpose(reels);
  printRows(rows);
  const winnings = getWinnings(rows.betAmount, numberOfLines);
  balance += winnings;
  console.log("You Won!, ₹" + winnings.toString());

  if(balance <= 0) {
    console.log("You Lost!");
    break;
  }
  }

  // 7. play again
  const playAgain = prompt("Do you want to play again? (y/n): ");
  if (playAgain.toLowerCase() === "y") {

  }
};

game();

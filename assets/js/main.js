// Variablen benennen und deklarien
const roundResult = document.getElementById("round-result");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const rockElement = document.getElementById("rock");
const paperElement = document.getElementById("paper");
const scissorsElement = document.getElementById("scissors");
const wellElement = document.getElementById("well");
const changePlayerClass = document.getElementById("main-image");
const changeComputerClass = document.getElementById("main-image2");
const restartBtn = document.getElementById("restart");
const exitBtn = document.getElementById("exit");
const mainImage = document.getElementById("main-image");
const mainImage2 = document.getElementById("main-image2");
const windowMessage = document.getElementById("myModal");
const finalScore = document.getElementById("finalres");
const standardText = document.getElementById("standard-txt");
const wellText = document.getElementById("well-txt");
const closeButton = document.getElementById("closeButton");
const startModal = document.getElementById("start-modal");
const startGame = document.getElementById("start-game");
const roundsInfo = document.getElementById("rounds-info");
const STATE_WIN = "You win 😎";
const STATE_LOSE = "You lose 😭";
const STATE_DRAW = "Round Tie 😐";
let gameOptions = [];
let playerSelection = null;
let computerSelection = null;
let tieRound = null;
let selectedRounds = null;
let currentRound = 0;
// Startbildschirm

const audio = new Audio("../music/marsMissionTheme.mp3");

const playMusic = () => {
  audio.play();
  audio.volume = 0.2;
};

const stopMusic = () => {
  audio.pause();
  audio.currentTime = 0;
};

const standardMode = () => {
  gameOptions = ["rock", "scissors", "paper"];
  wellText.style.color = "green";
  standardText.style.color = "orange";
  wellElement.style.display = "none";
  checkSelectedOptions();
};

const wellMode = () => {
  gameOptions = ["rock", "scissors", "paper", "well"];
  wellText.style.color = "orange";
  standardText.style.color = "green";
  wellElement.style.display = "block";
  checkSelectedOptions();
};

const displayRadioValue = () => {
  const rounds = document.getElementsByName("round");
  for (i = 0; i < rounds.length; i++) {
    if (rounds[i].checked) {
      selectedRounds = rounds[i].id;
    }
  }
  checkSelectedOptions();
};

const uncheckInputs = () => {
  const rounds = document.getElementsByName("round");
  for (i = 0; i < rounds.length; i++) {
    rounds[i].checked = "";
  }
};

const checkSelectedOptions = () => {
  if (gameOptions.length > 0 && selectedRounds) {
    startGame.disabled = "";
  }
};

const startRounds = () => {
  startModal.style.display = "none";
  roundsInfo.innerHTML = `Rounds ${selectedRounds}/${currentRound}`;
  computerScore.innerHTML = "0";
  playerScore.innerHTML = "0";
  playMusic();
};
resetAllValues = () => {
  currentRound = 0;
  selectedRounds = null;
  gameOptions = [];
  playerSelection = null;
  computerSelection = null;
  roundResult.innerHTML = "";
  wellText.style.color = "green";
  standardText.style.color = "green";
  startGame.disabled = "disabled";
};

const addBtnColor = (element) => {
  element.target.classList.add(roundResult.innerHTML.split(" ")[1]);
  const timeOut = setTimeout(() => {
    element.target.classList.remove(roundResult.innerHTML.split(" ")[1]);
  }, 500);
};

// create a function which makes random selection for the computer
const computerPlay = () => {
  return gameOptions[Math.floor(Math.random() * gameOptions.length)];
};
// create a function which removes the added classes at every begin of the round
const removeClasses = () => {
  mainImage.classList.remove("rock", "scissors", "paper", "well");
  mainImage2.classList.remove("rock", "scissors", "paper", "well");
};

const compareTheChoices = (player, computer) => {
  const win = () => {
    roundResult.innerHTML = STATE_WIN;
    playerScore.innerHTML = +playerScore.innerHTML + 1;
    currentRound += 1;
    roundsInfo.innerHTML = `Rounds ${selectedRounds}/${currentRound}`;
  };
  const lose = () => {
    roundResult.innerHTML = STATE_LOSE;
    computerScore.innerHTML = +computerScore.innerHTML + 1;
    currentRound += 1;
    roundsInfo.innerHTML = `Rounds ${selectedRounds}/${currentRound}`;
  };
  const tie = () => {
    roundResult.innerHTML = STATE_DRAW;
    currentRound += 1;
    roundsInfo.innerHTML = `Rounds ${selectedRounds}/${currentRound}`;
  };
  if (computer === "paper" && player === "paper") {
    mainImage2.classList.add("paper");
    tie();
  }
  if (
    (computer === "paper" && player === "rock") ||
    (computer === "paper" && player === "well")
  ) {
    mainImage2.classList.add("paper");
    lose();
  }
  if (computer === "paper" && player === "scissors") {
    mainImage2.classList.add("paper");
    win();
  }
  if (computer === "scissors" && player === "paper") {
    mainImage2.classList.add("scissors");
    lose();
  }
  if (
    (computer === "scissors" && player === "rock") ||
    (computer === "scissors" && player === "well")
  ) {
    mainImage2.classList.add("scissors");
    win();
  }
  if (computer === "scissors" && player === "scissors") {
    mainImage2.classList.add("scissors");
    tie();
  }
  if (
    (computer === "rock" && player === "paper") ||
    (computer === "rock" && player === "well")
  ) {
    mainImage2.classList.add("rock");
    win();
  }
  if (computer === "rock" && player === "rock") {
    mainImage2.classList.add("rock");
    tie();
  }
  if (computer === "rock" && player === "scissors") {
    mainImage2.classList.add("rock");
    lose();
  }
  if (computer === "well" && player === "paper") {
    mainImage2.classList.add("well");
    win();
  }
  if (
    (computer === "well" && player === "rock") ||
    (computer === "well" && player === "scissors")
  ) {
    mainImage2.classList.add("well");
    lose();
  }
  if (computer === "well" && player === "well") {
    mainImage2.classList.add("well");
    tie();
  }
  if (currentRound === +selectedRounds) {
    finalScore.innerHTML = `You ${playerScore.innerHTML} - ${computerScore.innerHTML} Computer `;
    resetAllValues();
    uncheckInputs();
    stopMusic();
    startModal.style.display = "block";
  }
};

rockElement.addEventListener("click", (e) => {
  roundResult.innerHTML = "";
  removeClasses();
  const timeOut = setTimeout(() => {
    mainImage.classList.add("rock");
    playerSelection = gameOptions.find((element) => element === "rock");
    computerSelection = computerPlay();
    compareTheChoices(playerSelection, computerSelection);
    addBtnColor(e, roundResult);
  }, 1000);
});

paperElement.addEventListener("click", (e) => {
  roundResult.innerHTML = "";
  removeClasses();
  const timeOut = setTimeout(() => {
    mainImage.classList.add("paper");
    roundResult.innerHTML = "";
    playerSelection = "paper";
    computerSelection = computerPlay();
    compareTheChoices(playerSelection, computerSelection);
    addBtnColor(e, roundResult);
  }, 1000);
});
scissorsElement.addEventListener("click", (e) => {
  roundResult.innerHTML = "";
  removeClasses();
  const timeOut = setTimeout(() => {
    mainImage.classList.add("scissors");
    roundResult.innerHTML = "";
    playerSelection = "scissors";
    computerSelection = computerPlay();
    compareTheChoices(playerSelection, computerSelection);
    addBtnColor(e, roundResult);
  }, 1000);
});

wellElement.addEventListener("click", (e) => {
  roundResult.innerHTML = "";
  removeClasses();
  const timeOut = setTimeout(() => {
    mainImage.classList.add("well");
    roundResult.innerHTML = "";
    playerSelection = "well";
    computerSelection = computerPlay();
    compareTheChoices(playerSelection, computerSelection);
    addBtnColor(e, roundResult);
  }, 1000);
});

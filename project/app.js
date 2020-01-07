window.addEventListener("load", init);

//Dom Elements
const headBtn = document.querySelector("#headBtn");
const easyBtn = document.querySelector("#easyBtn");
const medBtn = document.querySelector("#medBtn");
const hardBtn = document.querySelector("#hardBtn");
const startBtn = document.querySelector("#startBtn");
const currentWord = document.querySelector("#word");
const timer = document.querySelector("#timer");
const input = document.querySelector("#input");
const message = document.querySelector("#message");
const currentScore = document.querySelector("#currentScore");
const scoreBoard = document.querySelector("#score");
const info = document.querySelector("#info");

//Globals
let score = 0;
const easy = 6;
const med = 4;
let num = 0;
const hard = 2;
let start = false;
const btnArray = [5];
let time = btnArray[btnArray.length - 1];
const highScores = [];

const words = [
  "recruit",
  "prevalence",
  "stick",
  "murder",
  "attic",
  "hold",
  "circle",
  "ideal",
  "swipe",
  "slave",
  "trend",
  "option",
  "magnitude",
  "peanut",
  "braid",
  "inquiry",
  "thaw",
  "supply",
  "tract",
  "post",
  "systematic",
  "owl",
  "disagreement",
  "glacier",
  "dairy",
  "breast",
  "tempt",
  "identity",
  "domination",
  "novel"
];

//Config and start events
startBtn.addEventListener("click", beginGame);
easyBtn.addEventListener("click", clickHandler.bind(event, easy));
medBtn.addEventListener("click", clickHandler.bind(event, med));
hardBtn.addEventListener("click", clickHandler.bind(event, hard));
window.addEventListener("keydown", ({ keyCode }) => {
  if (keyCode === 8 && start === false) {
    beginGame();
  }
});

//Initialze Game
function init() {
  //load word from array
  showWord(words);
  //matching word input
  input.addEventListener("input", startMatch);
  //call countdown every second
  setInterval(countdown, 1000);
  //check game status
  setInterval(checkStatus, 50);
}

//after the game started
function startMatch() {
  if (matchWords() && start == true) {
    showWord(words);
    time = btnArray[btnArray.length - 1] + 1;
    input.value = "";
    score++;
  }
  currentScore.innerHTML = `score: ${score}`;
}

//Checks if the input is correct during the round
function matchWords() {
  if (input.value === currentWord.innerHTML && start === true) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//Takes in the words array
//Generate random array index
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

//Check if the round started
//Dec the time every second
function countdown() {
  if (time > 0 && start === true) {
    time--;
  }
  timer.innerHTML = `time left: ${time}`;
}

//Checks every 0.05 seconds
//If the game is still running
//Doing the right thing according to the status
function checkStatus() {
  if (time === 0) {
    message.innerHTML = "Game Over!!!";
    startBtn.style.display = "block";
    info.style.display = "block";
    start = false;
    input.value = "";
    if (score > 0 && time === 0) {
      highScores.push(score);
      highScores.sort();
      highScores.reverse();
      if (highScores.length > 5) highScores.pop();
      scoreBoard.innerHTML = highScores
        .map(function(score) {
          return "<li>" + score + " points" + "</li>";
        })
        .join("");
    }
    score = 0;
    currentScore.innerHTML = `score: ${score}`;
  }
}

function clickHandler(num) {
  btnArray.push(num);
  btnArray.shift();
  if (start !== true) time = btnArray[btnArray.length - 1];
}

function beginGame() {
  showWord(words);
  start = true;
  time = btnArray[btnArray.length - 1] + 1;
  startBtn.style.display = "none";
  info.style.display = "none";
}

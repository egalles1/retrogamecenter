let wordsPool = ["abejorro", "galaxias", "montañas", "sistema", "naranja"];
let coins = 10, currentWord = "", guessedWord = [], attempts = 6;

const menu = document.getElementById("menu");
const gameContainer = document.getElementById("game-container");
const coinsEl = document.getElementById("coins");
const wordEl = document.getElementById("word");
const messageEl = document.getElementById("message");
const keyboardEl = document.getElementById("keyboard");
const playAgainBtn = document.getElementById("play-again");
const difficultySelect = document.getElementById("difficulty");

function startMenu() {
  menu.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
}

function backToMenu() {
  menu.style.display = "block";
  gameContainer.style.display = "none";
}

function startGame() {
  let difficulty = difficultySelect.value;
  if (coins < 2) {
    messageEl.textContent = "No tienes suficientes monedas para jugar.";
    return;
  }
  coins -= 2;
  coinsEl.textContent = coins;

  attempts = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
  currentWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];
  guessedWord = Array(currentWord.length).fill("_");
  updateWordDisplay();
  messageEl.textContent = "";
  generateKeyboard();
  playAgainBtn.style.display = "none";
}

function updateWordDisplay() {
  wordEl.textContent = guessedWord.join(" ");
}

function generateKeyboard() {
  keyboardEl.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    let button = document.createElement("button");
    button.textContent = String.fromCharCode(i);
    button.addEventListener("click", () => handleGuess(button.textContent.toLowerCase()));
    keyboardEl.appendChild(button);
  }
}

function handleGuess(letter) {
  if (currentWord.includes(letter)) {
    currentWord.split("").forEach((char, i) => {
      if (char === letter) guessedWord[i] = letter;
    });
    updateWordDisplay();
    if (!guessedWord.includes("_")) endGame(true);
  } else {
    attempts--;
    if (attempts === 0) endGame(false);
  }
}

function endGame(win) {
  messageEl.textContent = win ? "¡Ganaste!" : `Perdiste. La palabra era: ${currentWord}`;
  playAgainBtn.style.display = "inline-block";
  keyboardEl.innerHTML = "";
}

playAgainBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);

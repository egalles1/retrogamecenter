const words = {
  easy: ["gato", "perro", "casa"],
  medium: ["computadora", "elefante", "playa"],
  hard: ["desarrollador", "astronauta", "electricidad"],
  passive: ["aaaaa", "eeeee", "iiiii"]
};

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let coins = 10;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");
const coinsDisplay = document.getElementById("coins");
const difficultySelect = document.getElementById("difficulty");

function startGame() {
  const difficulty = difficultySelect.value;
  const wordList = words[difficulty];
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  message.textContent = "";
  playAgainBtn.style.display = "none";
  updateWordDisplay();
  generateKeyboard();
  updateFigure();
}

function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;

  if (!display.includes("_")) {
    message.textContent = "¡Ganaste!";
    coins += 5;
    coinsDisplay.textContent = coins;
    playAgainBtn.style.display = "block";
  }
}

function generateKeyboard() {
  keyboard.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => handleGuess(letter, btn);
    keyboard.appendChild(btn);
  }
}

function handleGuess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();
  } else {
    wrongGuesses++;
    updateFigure();
    if (wrongGuesses === 6) {
      message.textContent = `Perdiste. La palabra era: ${selectedWord}`;
      coins = Math.max(0, coins - 3);
      coinsDisplay.textContent = coins;
      playAgainBtn.style.display = "block";
    }
  }
}

function updateFigure() {
  const parts = document.querySelectorAll(".figure > div");
  parts.forEach((part, index) => {
    part.style.display = index < wrongGuesses ? "block" : "none";
  });
}

function generateKeyboard() {
  keyboard.innerHTML = "";
  const letters = "abcdefghijklmnopqrstuvwxyzñ";
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.id = `key-${letter}`;
    btn.onclick = () => handleGuess(letter, btn);
    keyboard.appendChild(btn);
  }
}


playAgainBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);

window.addEventListener("load", () => {
  coinsDisplay.textContent = coins;
  startGame();
});

document.addEventListener("keydown", (event) => {
  const letter = event.key.toLowerCase();
  const validLetters = "abcdefghijklmnopqrstuvwxyzñ";

  if (validLetters.includes(letter) && !guessedLetters.includes(letter) && wrongGuesses < 6) {
    const button = document.getElementById(`key-${letter}`);
    if (button && !button.disabled) {
      handleGuess(letter, button);
    }
  }
});

const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const coinsDisplay = document.getElementById("coins-display");

const modeSelection = document.getElementById("mode-selection");
const vsAIButton = document.getElementById("vs-ai");
const vsPlayerButton = document.getElementById("vs-player");
const difficultySelection = document.getElementById("difficulty-selection");
const difficultyButtons = document.querySelectorAll(".difficulty");

const winnerScreen = document.getElementById("winner-screen");
const winnerMessage = document.getElementById("winner-message");
const winnerClose = document.getElementById("winner-close");

let playerCoins = 100;
let isGameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];
let gameMode = "AI";  // Per defecte, juguem contra la màquina
let currentPlayer = "X";

// Variables de dificultat
let difficulty = "medium"; // Dificultat per defecte
let betAmount = 20;
let winAmount = 50;

// Pantalla inicial per triar mode de joc
window.onload = () => {
    modeSelection.style.display = "flex";
};

// Elecció del mode de joc
vsAIButton.addEventListener("click", () => {
    gameMode = "AI";
    difficultySelection.style.display = "block"; // Mostrar la selecció de dificultat
});

// Elecció per jugar 1v1
vsPlayerButton.addEventListener("click", () => {
    gameMode = "1v1";
    modeSelection.style.display = "none";
    initGame();
});

// Selecció de dificultat
difficultyButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        difficulty = event.target.dataset.difficulty;

        if (difficulty === "easy") { betAmount = 10; winAmount = 10; }
        else if (difficulty === "medium") { betAmount = 20; winAmount = 50; }
        else if (difficulty === "hard") { betAmount = 50; winAmount = 100; }

        if (gameMode === "AI") {
            playerCoins -= betAmount; // Restar les monedes inicials
            updateCoins();
        }

        modeSelection.style.display = "none"; // Ocultar el mode de selecció
        initGame();
    });
});

// Inicialitzar el joc
function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("placed");
    });
    coinsDisplay.textContent = `Monedes: ${playerCoins}`;
}

// Actualitzar el nombre de monedes
function updateCoins() {
    coinsDisplay.textContent = `Monedes: ${playerCoins}`;
}

// Gestió de clics en el taulell
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!isGameActive || board[index] !== "") return;

    placePiece(cell, index, currentPlayer);

    if (gameMode === "AI" && isGameActive) {
        setTimeout(machineMove, 500);
    } else if (gameMode === "1v1") {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

// Col·locar una peça
function placePiece(cell, index, symbol) {
    board[index] = symbol;
    cell.textContent = symbol;
    cell.classList.add("placed");

    checkWinner();
}

// Moviment de la màquina
function machineMove() {
    if (!isGameActive) return;

    let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    let cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    
    placePiece(cell, randomIndex, "O");
}

// Comprovar si hi ha guanyador
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            endGame(`${board[a]} ha guanyat!`);
            return;
        }
    }

    if (!board.includes("")) endGame("Empat!");
}

// Mostrar pantalla de resultat
function endGame(message) {
    isGameActive = false;

    if (message.includes("X ha guanyat!") && gameMode === "AI") playerCoins += winAmount;
    if (message.includes("O ha guanyat!") && gameMode === "AI") playerCoins -= betAmount;

    winnerMessage.textContent = message;
    winnerScreen.style.display = "flex";
}

winnerClose.addEventListener("click", () => {
    winnerScreen.style.display = "none";
    initGame();
});

restartButton.addEventListener("click", initGame);
// Moviment de la màquina
function machineMove() {
    if (!isGameActive) return;

    // Primer, bloqueja les jugades guanyadores del jugador
    let move = findWinningMove("O");
    if (move === -1) {
        // Si no pot guanyar, bloqueja el jugador
        move = findWinningMove("X");
    }

    if (move === -1) {
        // Si no pot bloquejar o guanyar, fa una jugada aleatòria
        let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Realitza la jugada
    let cell = document.querySelector(`.cell[data-index='${move}']`);
    placePiece(cell, move, "O");
}

// Funció per trobar un moviment guanyador
function findWinningMove(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === "") return c;
        if (board[a] === player && board[c] === player && board[b] === "") return b;
        if (board[b] === player && board[c] === player && board[a] === "") return a;
    }
    return -1; // No es pot guanyar
}

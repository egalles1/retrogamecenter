// Variables globals
let playerCoins = 100;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Jugador sempre comença
let isGameActive = true;

// Selecció dels elements del DOM
const coinsDisplay = document.getElementById("coins");
const boardElement = document.getElementById("board");
const restartButton = document.getElementById("restart-button");
const playerPiece = document.getElementById("player-piece");

// Inicialitza el joc
function initGame() {
    boardElement.innerHTML = "";
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (!cell.classList.contains("taken")) cell.classList.add("highlight");
        });
        cell.addEventListener("dragleave", () => cell.classList.remove("highlight"));
        cell.addEventListener("drop", (e) => handleDrop(e, index));
        boardElement.appendChild(cell);
    });

    renderBoard();
}

// Gestió del drop
function handleDrop(event, index) {
    event.preventDefault();
    if (board[index] === "" && isGameActive && playerCoins >= 20) {
        board[index] = currentPlayer;
        renderBoard();

        // 🔥 Elimina el color verd després de col·locar la peça
        event.target.classList.remove("highlight");

        const winCombo = checkWinner();
        if (winCombo) {
            playerCoins += 100;
            playerWins++;
            updateScoreboard();
            drawWinLine(winCombo);
            setTimeout(() => endGame(`${currentPlayer} ha guanyat!`), 800);
        } else if (!board.includes("")) {
            endGame("Empat!");
        } else {
            currentPlayer = "O";
            setTimeout(aiMove, 500);
        }
    }
}


// Moviment de la màquina amb dificultat millorada
function aiMove() {
    const emptyCells = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter((index) => index !== null);

    // Estratègia: prioritza guanyar o bloquejar
    let move = emptyCells.find((index) =>
        winningCombinations.some(
            (combination) =>
                combination.includes(index) &&
                combination.filter((i) => board[i] === "O").length === 2 &&
                combination.filter((i) => board[i] === "").length === 1
        )
    );

    if (move === undefined) {
        move = emptyCells.find((index) =>
            winningCombinations.some(
                (combination) =>
                    combination.includes(index) &&
                    combination.filter((i) => board[i] === "X").length === 2 &&
                    combination.filter((i) => board[i] === "").length === 1
            )
        );
    }

    if (move === undefined) {
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    const cell = boardElement.children[move];
    board[move] = "O";
    cell.classList.add("highlight");

    setTimeout(() => {
        cell.classList.remove("highlight");
        renderBoard();

        if (checkWinner()) {
            endGame("La màquina ha guanyat!");
        } else if (!board.includes("")) {
            endGame("Empat!");
        } else {
            currentPlayer = "X";
        }
    }, 500);
}

// Comprova si hi ha guanyador
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    return winningCombinations.some((combination) =>
        combination.every((index) => board[index] === currentPlayer)
    );
}

// Renderitza el tauler
function renderBoard() {
    boardElement.childNodes.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.toggle("taken", board[index] !== "");
    });
    coinsDisplay.textContent = `Monedes: ${playerCoins}`;
}

// Finalitza el joc
function endGame(message) {
    alert(message);
    isGameActive = false;

    // 🔥 Només restem monedes si el jugador ha perdut, no si empata
    if (message === "La màquina ha guanyat!") {
        playerCoins -= 20;
    }

    coinsDisplay.textContent = `Monedes: ${playerCoins}`;
}


// Reinicia el joc
restartButton.addEventListener("click", () => {
    playerCoins = Math.max(playerCoins - 20, 0);
    currentPlayer = "X";
    initGame();
});

// Inicia el joc al carregar
initGame();

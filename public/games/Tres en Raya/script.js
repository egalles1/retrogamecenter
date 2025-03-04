// Game state
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameMode = 'ai';
let difficulty = 'easy';
let gameStatus = 'playing';

// Stats
let stats = JSON.parse(localStorage.getItem('tictactoe-stats')) || {
  wins: 0,
  losses: 0,
  draws: 0,
  coins: 0
};

// DOM elements
const cells = document.querySelectorAll('.cell');
const aiModeBtn = document.getElementById('ai-mode');
const multiplayerModeBtn = document.getElementById('multiplayer-mode');
const difficultyBtns = document.querySelectorAll('.difficulty');
const resetBtn = document.getElementById('reset');
const statsToggle = document.getElementById('stats-toggle');
const statsPanel = document.getElementById('stats');
const coinsCount = document.getElementById('coins-count');
const gameEndMessage = document.getElementById('game-end-message');
const difficultySelector = document.getElementById('difficulty-selector');

// Update UI from stats
function updateStats() {
  document.querySelector('.wins').textContent = stats.wins;
  document.querySelector('.losses').textContent = stats.losses;
  document.querySelector('.draws').textContent = stats.draws;
  coinsCount.textContent = stats.coins;
  localStorage.setItem('tictactoe-stats', JSON.stringify(stats));
}

// Sound effects
const sounds = {
  move: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
  win: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'),
  draw: new Audio('https://assets.mixkit.co/active_storage/sfx/2/2-preview.mp3'),
  lose: new Audio('https://assets.mixkit.co/active_storage/sfx/1367/1367-preview.mp3')
};

function playSound(type) {
  sounds[type].play().catch(() => {});
}

// Game logic
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function checkWinner() {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isBoardFull() {
  return board.every(cell => cell !== null);
}

function minimax(boardState, depth, isMaximizing) {
  const winner = checkWinnerForBoard(boardState);
  if (winner === 'O') return 1;
  if (winner === 'X') return -1;
  if (isBoardFullForBoard(boardState) || depth === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === null) {
        boardState[i] = 'O';
        bestScore = Math.max(bestScore, minimax(boardState, depth - 1, false));
        boardState[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === null) {
        boardState[i] = 'X';
        bestScore = Math.min(bestScore, minimax(boardState, depth - 1, true));
        boardState[i] = null;
      }
    }
    return bestScore;
  }
}

function checkWinnerForBoard(boardState) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
}

function isBoardFullForBoard(boardState) {
  return boardState.every(cell => cell !== null);
}

function getAIMove() {
  const availableMoves = board.map((cell, index) => cell === null ? index : -1).filter(i => i !== -1);
  
  if (difficulty === 'easy') {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  const maxDepth = difficulty === 'medium' ? 2 : 5;
  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = 'O';
    const score = minimax(newBoard, maxDepth, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function showGameEndMessage(type) {
  gameEndMessage.textContent = type === 'win' ? '¡Victoria!' :
                             type === 'lose' ? '¡Derrota!' : '¡Empate!';
  gameEndMessage.className = type;
  gameEndMessage.classList.remove('hidden');
}

function handleGameEnd(result) {
  gameStatus = result;
  
  if (result === 'win') {
    playSound('win');
    stats.wins++;
    const coins = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 5;
    stats.coins += coins;
    showGameEndMessage('win');
  } else if (result === 'lose') {
    playSound('lose');
    stats.losses++;
    showGameEndMessage('lose');
  } else {
    playSound('draw');
    stats.draws++;
    showGameEndMessage('draw');
  }
  
  updateStats();
  
  setTimeout(() => {
    resetGame();
  }, 2000);
}

function makeMove(index) {
  if (board[index] || gameStatus !== 'playing') return;

  board[index] = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  playSound('move');

  const winner = checkWinner();
  if (winner) {
    handleGameEnd(winner === 'X' ? 'win' : 'lose');
  } else if (isBoardFull()) {
    handleGameEnd('draw');
  } else if (gameMode === 'ai' && currentPlayer === 'X') {
    currentPlayer = 'O';
    setTimeout(() => {
      const aiMove = getAIMove();
      board[aiMove] = 'O';
      cells[aiMove].classList.add('o');
      playSound('move');

      const aiWinner = checkWinner();
      if (aiWinner) {
        handleGameEnd('lose');
      } else if (isBoardFull()) {
        handleGameEnd('draw');
      } else {
        currentPlayer = 'X';
      }
    }, 500);
  } else if (gameMode === 'multiplayer') {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameStatus = 'playing';
  gameEndMessage.classList.add('hidden');
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
  });
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => makeMove(index));
});

aiModeBtn.addEventListener('click', () => {
  gameMode = 'ai';
  aiModeBtn.classList.add('active');
  multiplayerModeBtn.classList.remove('active');
  difficultySelector.style.display = 'flex';
  resetGame();
});

multiplayerModeBtn.addEventListener('click', () => {
  gameMode = 'multiplayer';
  multiplayerModeBtn.classList.add('active');
  aiModeBtn.classList.remove('active');
  difficultySelector.style.display = 'none';
  resetGame();
});

difficultyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    difficultyBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    difficulty = btn.classList.contains('easy') ? 'easy' :
                btn.classList.contains('medium') ? 'medium' : 'hard';
    resetGame();
  });
});

resetBtn.addEventListener('click', resetGame);

statsToggle.addEventListener('click', () => {
  statsPanel.classList.toggle('hidden');
  statsToggle.classList.toggle('active');
});

// Initialize
updateStats();
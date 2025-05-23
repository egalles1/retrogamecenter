// 🔤 TEMES DISPONIBLES
const themes = {
  poker: ['A♠', '2♥', '3♦', '4♣', '5♠', '6♥', '7♦', '8♣'],
  animals: ['🐶', '🐱', '🦊', '🐻', '🐸', '🐵', '🐼', '🐧'],
  colors: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫'],
  emojis: ['😀', '😎', '🤖', '👽', '👾', '🥸', '😺', '😈']
};

let selectedTheme = [];
let symbols = [];

let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matches = 0;
let seconds = 0;
let intervalId = null;

// 📊 Actualitza estadístiques
function updateStats() {
  document.getElementById('moves').textContent = moves;
  document.getElementById('matches').textContent = matches;
  document.getElementById('time').textContent = seconds;
}

// ⏱️ Timer
function startTimer() {
  intervalId = setInterval(() => {
    seconds++;
    updateStats();
  }, 1000);
}
function stopTimer() {
  clearInterval(intervalId);
}

// 🔀 Barreja cartes
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 🖼️ Crear el tauler
function createBoard() {
  const board = document.getElementById('game-board');
  const message = document.getElementById('message');
  board.innerHTML = '';
  message.textContent = '';

  const cards = [...symbols, ...symbols];
  const shuffled = shuffle(cards);

  shuffled.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = symbol;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.textContent = '?';

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.dataset.symbol = symbol;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });

  // 🔄 Reiniciem estat
  moves = 0;
  matches = 0;
  seconds = 0;
  updateStats();
  stopTimer();
  startTimer();
}

// 🔁 Reinicia joc
document.getElementById('reset-btn').addEventListener('click', () => {
  createBoard();
});

// 👆 Tria dificultat
function startGame(level) {
  switch (level) {
    case 'easy':
      symbols = selectedTheme.slice(0, 4);
      break;
    case 'medium':
      symbols = selectedTheme.slice(0, 6);
      break;
    case 'hard':
      symbols = selectedTheme.slice(0, 8);
      break;
  }
  createBoard();
}

// 🎭 Tria tema
function selectTheme(themeName) {
  selectedTheme = themes[themeName];

  // 🔠 Actualitzar el títol de la pàgina segons el tema
  const themeNames = {
    poker: '🃏 Memory Poker',
    animals: '🐶 Memory Animals',
    colors: '🌈 Memory Colors',
    emojis: '👾 Memory Emojis'
  };

  document.getElementById('game-title').textContent = themeNames[themeName];

  startGame('easy'); // o pots fer que triïn dificultat després
}


// 🎴 Girar carta
function flipCard(card) {
  if (lock || card.classList.contains('flipped')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    updateStats();
    checkMatch();
  }
}

// ✅ Comprova coincidència
function checkMatch() {
  lock = true;
  const match = firstCard.dataset.symbol === secondCard.dataset.symbol;

  setTimeout(() => {
    if (!match) {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
    } else {
      matches++;
      updateStats();
      if (matches === symbols.length) {
        stopTimer();
        document.getElementById('message').textContent =
          `🎉 VICTÒRIA! Temps: ${seconds}s - Moviments: ${moves}`;
      }
    }

    firstCard = null;
    secondCard = null;
    lock = false;
  }, 800);
}

// ▶️ Inici automàtic amb tema per defecte
window.onload = () => {
  selectTheme('poker'); // pots canviar per 'animals', 'emojis', etc.
};

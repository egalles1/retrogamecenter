let balance = 100;
let wins = 0;
let losses = 0;

function iniciarSesion() {
  const username = document.getElementById('username').value;
  if (username.trim() === '') {
    alert('Por favor, ingresa un nombre de usuario.');
    return;
  }

  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'flex';
}

function play(playerChoice) {
  const betAmount = parseInt(document.getElementById('betAmount').value);
  if (betAmount > balance) {
    alert('No tienes suficientes monedas para esa apuesta.');
    return;
  }

  const choices = ['piedra', 'papel', 'tijeras'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('playerChoiceImage').src = `img/${playerChoice}.png`;
  document.getElementById('computerChoiceImage').src = `img/${computerChoice}.png`;

  let result = '';
  if (playerChoice === computerChoice) {
    result = '¡Empate!';
  } else if (
    (playerChoice === 'piedra' && computerChoice === 'tijeras') ||
    (playerChoice === 'papel' && computerChoice === 'piedra') ||
    (playerChoice === 'tijeras' && computerChoice === 'papel')
  ) {
    result = `¡Ganaste! La máquina eligió ${computerChoice}. Doble de tu apuesta: +${betAmount * 2} monedas.`;
    balance += betAmount;
    wins++;
  } else {
    result = `Perdiste. La máquina eligió ${computerChoice}.`;
    balance -= betAmount;
    losses++;
  }

  document.getElementById('balance').innerText = balance;
  document.getElementById('gameResult').innerText = result;
  document.getElementById('wins').innerText = wins;
  document.getElementById('losses').innerText = losses;
}

function mostrarReglas() {
  alert("🎮 Bienvenido a Piedra, Papel o Tijeras - Apuestas!\n\nReglas:\n- Inicia sesión.\n- Elige piedra, papel o tijeras.\n- Ingresa una cantidad de monedas para apostar.\n- Ganas si tu elección vence a la de la máquina.\n- Si ganas, duplicas tu apuesta.\n- Si pierdes, pierdes tu apuesta.\n- El juego termina si te quedas sin saldo.");
}

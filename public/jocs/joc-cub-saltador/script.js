const player = document.getElementById('player');
const game = document.querySelector('.game');

// Variable per saber si el jugador està saltant
let isJumping = false;

// Escoltem quan es prem la barra d'espai
document.body.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && !isJumping) {
    isJumping = true;
    player.style.animation = 'jump 0.5s ease';
    setTimeout(() => {
      player.style.animation = '';
      isJumping = false;
    }, 500);
  }
});

// Funció per crear un obstacle nou
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');

  // Afegim l'obstacle dins el contenidor
  game.appendChild(obstacle);

  // L’obstacle comença fora del costat dret de la pantalla
  let obstaclePosition = window.innerWidth;

  // Assignem una velocitat aleatòria (mínim 5, màxim 12)
  const speed = Math.floor(Math.random() * 7) + 5; // de 5 a 11

  // Interval per moure l'obstacle
  const obstacleInterval = setInterval(() => {
    obstaclePosition -= speed;
    obstacle.style.right = (window.innerWidth - obstaclePosition) + 'px';

    // Eliminar obstacle si surt de la pantalla
    if (obstaclePosition < -40) {
      clearInterval(obstacleInterval);
      obstacle.remove();
    }

    // Comprovació de col·lisió
    const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (
      obstacleRight > window.innerWidth - 110 &&
      obstacleRight < window.innerWidth - 70 &&
      playerBottom < 40
    ) {
      alert("Has perdut! Torna-ho a intentar.");
      window.location.reload();
    }

  }, 20);
}

// Afegim la classe CSS per als nous obstacles
const style = document.createElement('style');
style.innerHTML = `
@keyframes jump {
  0%   { bottom: 0; }
  50%  { bottom: 100px; }
  100% { bottom: 0; }
}
.obstacle {
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 40px;
  background-color: #e74c3c;
}
`;
document.head.appendChild(style);

// Comencem amb un primer obstacle després d’1 segon
setTimeout(createObstacle, 1000);

// A partir d’aquí, generem obstacles nous cada 1.5 a 2.5 segons
setInterval(() => {
  createObstacle();
}, Math.random() * 1000 + 1500); // interval aleatori entre 1500-2500 ms

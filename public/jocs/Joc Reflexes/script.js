// Variables globales del juego
let gameState = {
    isPlaying: false,           // Estado del juego: jugando o no
    score: 0,                   // Puntuación actual
    timeLeft: 30,               // Tiempo restante en segundos
    gameInterval: null,         // Referencia al intervalo del timer
    targetInterval: null,       // Referencia al intervalo de creación de objetivos
    targetStartTime: 0,         // Tiempo cuando aparece un objetivo
    bestReactionTime: Infinity, // Mejor tiempo de reacción
    currentTargets: []          // Array de objetivos actuales en pantalla
};

// Obtener referencias a elementos del DOM
// document.getElementById() busca elementos por su ID
const elements = {
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    gameArea: document.getElementById('gameArea'),
    scoreElement: document.getElementById('score'),
    timerElement: document.getElementById('timer'),
    reactionElement: document.getElementById('reaction'),
    gameOver: document.getElementById('gameOver'),
    finalScore: document.getElementById('finalScore'),
    bestTime: document.getElementById('bestTime'),
    playAgainBtn: document.getElementById('playAgainBtn')
};

// Event Listeners - Escuchadores de eventos
// addEventListener() añade una función que se ejecuta cuando ocurre un evento
elements.startBtn.addEventListener('click', startGame);
elements.resetBtn.addEventListener('click', resetGame);
elements.playAgainBtn.addEventListener('click', () => {
    hideGameOver();
    startGame();
});

// Función para iniciar el juego
function startGame() {
    // Resetear estado del juego
    gameState.isPlaying = true;
    gameState.score = 0;
    gameState.timeLeft = 30;
    gameState.bestReactionTime = Infinity;
    gameState.currentTargets = [];
    
    // Actualizar interfaz
    updateScore();
    updateTimer();
    updateReactionTime(0);
    
    // Deshabilitar botón de inicio y habilitar reset
    elements.startBtn.disabled = true;
    elements.resetBtn.disabled = false;
    
    // Limpiar área de juego
    clearGameArea();
    
    // Iniciar timer del juego
    // setInterval() ejecuta una función cada X milisegundos
    gameState.gameInterval = setInterval(() => {
        gameState.timeLeft--;
        updateTimer();
        
        // Si se acaba el tiempo, terminar juego
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000); // 1000ms = 1 segundo
    
    // Iniciar creación de objetivos
    createTarget();
    gameState.targetInterval = setInterval(createTarget, 1500); // Crear objetivo cada 1.5 segundos
}

// Función para crear un nuevo objetivo
function createTarget() {
    // Solo crear si el juego está activo
    if (!gameState.isPlaying) return;
    
    // Crear elemento div para el objetivo
    const target = document.createElement('div');
    target.className = 'target';
    
    // Calcular posición aleatoria dentro del área de juego
    const gameAreaRect = elements.gameArea.getBoundingClientRect();
    const targetSize = 60; // Tamaño del objetivo en píxeles
    
    // Math.random() genera número aleatorio entre 0 y 1
    // Math.floor() redondea hacia abajo
    const maxX = elements.gameArea.offsetWidth - targetSize;
    const maxY = elements.gameArea.offsetHeight - targetSize;
    
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    
    // Posicionar el objetivo
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    
    // Guardar tiempo de creación para calcular tiempo de reacción
    target.startTime = Date.now(); // Date.now() devuelve timestamp actual
    
    // Añadir evento click al objetivo
    target.addEventListener('click', handleTargetClick);
    
    // Añadir objetivo al área de juego y al array de seguimiento
    elements.gameArea.appendChild(target);
    gameState.currentTargets.push(target);
    
    // Remover objetivo automáticamente después de 3 segundos si no se hace click
    setTimeout(() => {
        removeTarget(target);
    }, 3000);
}

// Función que maneja el click en un objetivo
function handleTargetClick(event) {
    if (!gameState.isPlaying) return;
    
    const target = event.target;
    
    // Calcular tiempo de reacción
    const reactionTime = Date.now() - target.startTime;
    
    // Actualizar mejor tiempo si es necesario
    if (reactionTime < gameState.bestReactionTime) {
        gameState.bestReactionTime = reactionTime;
    }
    
    // Aumentar puntuación
    gameState.score += 10;
    
    // Actualizar interfaz
    updateScore();
    updateReactionTime(reactionTime);
    
    // Remover objetivo
    removeTarget(target);
    
    // Crear efecto visual de éxito
    createHitEffect(event.clientX, event.clientY);
}

// Función para remover un objetivo específico
function removeTarget(target) {
    // Verificar que el objetivo existe en el DOM
    if (target && target.parentNode) {
        target.parentNode.removeChild(target);
    }
    
    // Remover del array de objetivos actuales
    // filter() crea un nuevo array con elementos que cumplen una condición
    gameState.currentTargets = gameState.currentTargets.filter(t => t !== target);
}

// Función para crear efecto visual cuando se acierta
function createHitEffect(x, y) {
    const effect = document.createElement('div');
    effect.textContent = '+10';
    effect.style.position = 'fixed';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    effect.style.color = '#feca57';
    effect.style.fontSize = '24px';
    effect.style.fontWeight = 'bold';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1001';
    effect.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(effect);
    
    // Animar efecto hacia arriba y desvanecer
    setTimeout(() => {
        effect.style.transform = 'translateY(-50px)';
        effect.style.opacity = '0';
    }, 100);
    
    // Remover efecto después de la animación
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 1100);
}

// Función para terminar el juego
function endGame() {
    gameState.isPlaying = false;
    
    // Limpiar intervalos
    // clearInterval() detiene un intervalo creado con setInterval()
    if (gameState.gameInterval) {
        clearInterval(gameState.gameInterval);
    }
    if (gameState.targetInterval) {
        clearInterval(gameState.targetInterval);
    }
    
    // Limpiar objetivos restantes
    clearGameArea();
    
    // Habilitar botón de inicio
    elements.startBtn.disabled = false;
    elements.resetBtn.disabled = true;
    
    // Mostrar pantalla de game over
    showGameOver();
}

// Función para resetear el juego
function resetGame() {
    endGame();
    
    // Resetear valores
    gameState.score = 0;
    gameState.timeLeft = 30;
    gameState.bestReactionTime = Infinity;
    
    // Actualizar interfaz
    updateScore();
    updateTimer();
    updateReactionTime(0);
    
    // Ocultar game over si está visible
    hideGameOver();
}

// Función para limpiar el área de juego
function clearGameArea() {
    // innerHTML = '' elimina todo el contenido HTML del elemento
    elements.gameArea.innerHTML = '';
    gameState.currentTargets = [];
}

// Función para mostrar la pantalla de game over
function showGameOver() {
    elements.finalScore.textContent = gameState.score;
    
    // Mostrar mejor tiempo solo si se registró alguno
    if (gameState.bestReactionTime === Infinity) {
        elements.bestTime.textContent = 'N/A';
    } else {
        elements.bestTime.textContent = gameState.bestReactionTime;
    }
    
    // Mostrar la pantalla
    elements.gameOver.style.display = 'block';
}

// Función para ocultar la pantalla de game over
function hideGameOver() {
    elements.gameOver.style.display = 'none';
}

// Funciones para actualizar la interfaz
function updateScore() {
    // textContent modifica el texto de un elemento
    elements.scoreElement.textContent = gameState.score;
}

function updateTimer() {
    elements.timerElement.textContent = gameState.timeLeft;
}

function updateReactionTime(time) {
    elements.reactionElement.textContent = time;
}

// Eventos de teclado para mejorar la experiencia
// addEventListener con 'keydown' detecta cuando se presiona una tecla
document.addEventListener('keydown', (event) => {
    // event.code contiene el código de la tecla presionada
    switch(event.code) {
        case 'Space': // Barra espaciadora
            event.preventDefault(); // Prevenir comportamiento por defecto
            if (!gameState.isPlaying) {
                startGame();
            }
            break;
        case 'KeyR': // Tecla R
            resetGame();
            break;
        case 'Escape': // Tecla Escape
            if (gameState.isPlaying) {
                endGame();
            }
            break;
    }
});

// Inicialización al cargar la página
// DOMContentLoaded se ejecuta cuando el HTML está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Juego de reflejos cargado');
    console.log('Controles:');
    console.log('- Espacio: Iniciar juego');
    console.log('- R: Reiniciar');
    console.log('- Escape: Terminar juego');
});
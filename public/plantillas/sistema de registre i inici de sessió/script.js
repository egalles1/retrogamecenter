// Funciones de utilidad
function $(id) { return document.getElementById(id); }

// Estado de la aplicación
let currentUser = null;

// ... (código anterior)



// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    $('homeBtn').addEventListener('click', showHome);
    $('galleryBtn').addEventListener('click', showGallery);
    $('loginBtn').addEventListener('click', showLoginModal);
    $('registerBtn').addEventListener('click', showRegisterModal);
    
    checkLoggedInUser();
    showHome();
});

function checkLoggedInUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateNavigation(true);
    } else {
        updateNavigation(false);
    }
}

function updateNavigation(isLoggedIn) {
    if (isLoggedIn) {
        $('loginBtn').style.display = 'none';
        $('registerBtn').style.display = 'none';
        // Añadir botón de perfil y logout
    } else {
        $('loginBtn').style.display = 'inline';
        $('registerBtn').style.display = 'inline';
        // Remover botón de perfil y logout si existen
    }
}

function showHome() {
    $('mainContent').innerHTML = '<h2>Bienvenido al Retro Game Center</h2>';
    if (currentUser) {
        $('mainContent').innerHTML += `<p>Hola, ${currentUser.username}! Tienes ${currentUser.coins} monedas.</p>`;
    }
}

function showGallery() {
    // Aquí cargarías los juegos desde localStorage o una API
    const games = [
        { id: 1, name: "Pac-Man", cost: 10 },
        { id: 2, name: "Space Invaders", cost: 15 },
        { id: 3, name: "Tetris", cost: 20 }
    ];
    
    let galleryHTML = '<h2>Galería de Juegos</h2>';
    games.forEach(game => {
        galleryHTML += `
            <div class="game-card">
                <h3>${game.name}</h3>
                <p>Costo: ${game.cost} monedas</p>
                <button onclick="playGame(${game.id}, ${game.cost})">Jugar</button>
            </div>
        `;
    });
    
    $('mainContent').innerHTML = galleryHTML;
}

function playGame(gameId, cost) {
    if (!currentUser) {
        alert("Debes iniciar sesión para jugar.");
        return;
    }
    
    if (currentUser.coins < cost) {
        alert("No tienes suficientes monedas para jugar este juego.");
        return;
    }
    
    currentUser.coins -= cost;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert(`¡Estás jugando al juego ${gameId}! Te quedan ${currentUser.coins} monedas.`);
    // Aquí implementarías la lógica real del juego
}
document.addEventListener('DOMContentLoaded', () => {
    // ... (código existente)

    // Cerrar modal al hacer clic fuera de ella
    window.onclick = function(event) {
        if (event.target == $('modalContainer')) {
            closeModal();
        }
    }
});

function showLoginModal() {
    const modalHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <h2>Iniciar Sesión</h2>
            <input type="user" id="loginUser" placeholder="Nombre de Usuario" required>
            <input type="password" id="loginPassword" placeholder="Contraseña" required>
            <button onclick="login()">Iniciar Sesión</button>
        </div>
    `;
    $('modalContainer').innerHTML = modalHTML;
    $('modalContainer').style.display = 'block';
}

function showRegisterModal() {
    const modalHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <h2>Registrarse</h2>
            <input type="user" id="registerUser" placeholder="Nombre de Usuario" required>
            <input type="email" id="registerEmail" placeholder="Correo electrónico" required>
            <input type="password" id="registerPassword" placeholder="Contraseña" required>
            <button onclick="register()">Registrarse</button>
        </div>
    `;
    $('modalContainer').innerHTML = modalHTML;
    $('modalContainer').style.display = 'block';
}

function closeModal() {
    $('modalContainer').style.display = 'none';
}

function login() {
    const username = $('loginUsername').value;
    const password = $('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username] && users[username].password === password) {
        currentUser = { username, coins: users[username].coins };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        $('modalContainer').style.display = 'none';
        updateNavigation(true);
        showHome();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function register() {
    const username = $('registerUsername').value;
    const password = $('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username]) {
        alert("Este usuario ya existe.");
        return;
    }
    
    users[username] = { password, coins: 100 };
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = { username, coins: 100 };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    $('modalContainer').style.display = 'none';
    updateNavigation(true);
    showHome();
}




let zombiesKilled = parseInt(localStorage.getItem("zombiesKilled")) || 0;
let damagePerClick = parseInt(localStorage.getItem("damagePerClick")) || 1;
let damagePerSecond = parseInt(localStorage.getItem("damagePerSecond")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 100;
let maxEnergy = parseInt(localStorage.getItem("maxEnergy")) || 100;
let energyRegen = parseInt(localStorage.getItem("energyRegen")) || 5;
let shopUpgrades = JSON.parse(localStorage.getItem("shopUpgrades")) || {};

function updateZombies() {
    document.getElementById("zombie-a 34count").innerText = zombiesKilled;
    localStorage.setItem("zombiesKilled", zombiesKilled);
    localStorage.setItem("damagePerClick", damagePerClick);
    localStorage.setItem("damagePerSecond", damagePerSecond);
    localStorage.setItem("energy", energy);
    localStorage.setItem("maxEnergy", maxEnergy);
    localStorage.setItem("energyRegen", energyRegen);
    localStorage.setItem("shopUpgrades", JSON.stringify(shopUpgrades));
}


function updateStats() {
    document.getElementById("zombie-count").innerText = zombiesKilled;
    document.getElementById("energy-count").innerText = energy;
    document.getElementById("energy-bar").style.width = (energy / maxEnergy) * 100 + "%";
}
function killZombie() {
    if (energy >= 10) {
        zombiesKilled += damagePerClick;
        energy -= 10;
        clickCount++;               
        updateClickCount();        
        updateStats();
    } else {
        alert("¡Sin energía!");
    }
}


function rechargeEnergy() {
    if (energy < maxEnergy) {
        energy = Math.min(maxEnergy, energy + energyRegen);
        updateStats();
    }
}

function showBossAlert() {
    let bossAlert = document.getElementById("boss-alert");
    bossAlert.style.display = "block";

    setTimeout(() => {
        bossAlert.style.display = "none";
        spawnBoss();
    }, 2000);
}

function spawnBoss() {
    let bossScreen = document.getElementById("boss-screen");
    let bossZombie = document.getElementById("boss-zombie");
    let bossHealthBar = document.getElementById("boss-health-bar");

    bossHealth = 20;
    bossHealthBar.style.width = "100%";
    bossScreen.style.display = "flex";

bossZombie.onclick = function () {
    if (bossHealth <= 0) return;

    bossHealth--;
    bossHealthBar.style.width = (bossHealth / 20) * 100 + "%";
    if (bossHealth <= 0) {
        bossScreen.style.display = "none";
        maxEnergy += 10;
        updateStats();
        alert("¡Boss derrotado! +10 Energía");
        bossZombie.onclick = null; // evitar que se siga haciendo clic
    }
};

    setTimeout(() => bossScreen.style.display = "none", 10000);
}

function buyUpgrade(upgrade) {
    let cost = shopUpgrades[upgrade.name] || upgrade.cost;
    if (zombiesKilled >= cost) {
        zombiesKilled -= cost;
        if (upgrade.type === "click") damagePerClick += upgrade.bonus;
        if (upgrade.type === "second") damagePerSecond += upgrade.bonus;
        if (upgrade.type === "energy") maxEnergy += upgrade.bonus;
        if (upgrade.type === "regen") energyRegen += upgrade.bonus;
        shopUpgrades[upgrade.name] = Math.floor(cost * 1.35);
        updateStats();
        createShop();
    }
}

function createShop() {
    const shop = document.getElementById("shop");
    shop.innerHTML = "";

    const upgrades = [
        { name: "Bate", bonus: 2, cost: 20, type: "click", icon: "../../img_clicker/bate.png" },
        { name: "Sobreviviente", bonus: 1, cost: 50, type: "second", icon: "../../img_clicker/sobreviviente.png" },
        { name: "Pistola", bonus: 5, cost: 100, type: "click", icon: "../../img_clicker/pistola.png" },
        { name: "Barricada", bonus: 5, cost: 200, type: "second", icon: "../../img_clicker/barricada.png" },
        { name: "Escopeta", bonus: 10, cost: 250, type: "click", icon: "../../img_clicker/escopeta.png" },
        { name: "Torreta", bonus: 15, cost: 300, type: "second", icon: "../../img_clicker/torreta.png" },
        { name: "AK47", bonus: 20, cost: 500, type: "click", icon: "../../img_clicker/ak47.png" },
        { name: "Bunker", bonus: 50, cost: 525, type: "second", icon: "../../img_clicker/bunker.png" },
        { name: "Pistola Laser", bonus: 50, cost: 1000, type: "click", icon: "../../img_clicker/PistolaLaser.png" },
        { name: "Torreta laser", bonus: 100, cost: 1250, type: "second", icon: "../../img_clicker/TorretaLaser.png" },
        { name: "Ametralladora laser", bonus: 75, cost: 1500, type: "click", icon: "../../img_clicker/AmetralladoraLaser.png" },
        { name: "Meka", bonus: 200, cost: 1750, type: "second", icon: "../../img_clicker/meka.png" },
        { name: "Regeneración rápida", bonus: 2, cost: 150, type: "regen", icon: "../../img_clicker/RegeneracionVida.png" }
    ];

    upgrades.forEach(upgrade => {
        const div = document.createElement("div");
        let currentCost = shopUpgrades[upgrade.name] || upgrade.cost;
        const canAfford = zombiesKilled >= currentCost;

        div.classList.add("shop-item");
        if (!canAfford) div.classList.add("locked");

        div.innerHTML = `
            <img src="${upgrade.icon}" alt="${upgrade.name}">
            <div>
                <strong>${upgrade.name}</strong><br>
                +${upgrade.bonus} ${upgrade.type} — ${currentCost} zombies
            </div>
        `;

        if (canAfford) {
            div.onclick = () => buyUpgrade(upgrade);
        }

        shop.appendChild(div);
    });
}

function updateShop() {
    createShop();
}

function toggleShop() {
    const shop = document.getElementById("shop");
    shop.style.display = shop.style.display === "none" ? "block" : "none";
}

setInterval(rechargeEnergy, 1000);
setInterval(showBossAlert, 300000);
setInterval(() => { zombiesKilled += damagePerSecond; updateStats(); }, 1000);
updateStats();
createShop();

let clickCount = parseInt(localStorage.getItem("clickCount")) || 0;

function updateClickCount() {
    document.getElementById("click-count").innerText = clickCount;
    localStorage.setItem("clickCount", clickCount);
}

updateClickCount(); // Para mostrar los clics almacenados al cargar el juego

function cambiarFondoSegunProgreso() {
    const body = document.body;

    if (zombiesKilled < 100) {
        body.className = "fondo-ciudad";
    } else if (zombiesKilled < 1315) {
        body.className = "fondo-bosque";
    } else if (zombiesKilled < 1320) {
        body.className = "fondo-laboratorio";
    } else {
        body.className = "fondo-bunker";
    }
}
function updateStats() {
    document.getElementById("zombie-count").innerText = zombiesKilled;
    document.getElementById("energy-count").innerText = energy;
    document.getElementById("energy-bar").style.width = (energy / maxEnergy) * 100 + "%";
    cambiarFondoSegunProgreso(); 
}

  const fondos = {
    'fondo-ciudad': '../../img_clicker/FondoCiudad.png',
    'fondo-ciudad2': '../../img_clicker/Ciudad2.png',
    'fondo-granja': '../../img_clicker/granja.png',
    'fondo-Laboratorio': '../../img_clicker/FondoLaboratorio.png',
  };
 
  const claves = Object.keys(fondos);
  let index = 0;
 
  function cambiarFondo() {
    const clave = claves[index];
    const url = fondos[clave];
    document.body.style.backgroundImage = `url('${url}')`;
 
    index = (index + 1) % claves.length;
  }
 
  // Cambia de fondo cada 5 segundos
  cambiarFondo(); // primera vez al cargar
  setInterval(cambiarFondo, 20000);
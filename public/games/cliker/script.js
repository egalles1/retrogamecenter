let zombiesKilled = parseInt(localStorage.getItem("zombiesKilled")) || 0;
let damagePerClick = parseInt(localStorage.getItem("damagePerClick")) || 1;
let damagePerSecond = parseInt(localStorage.getItem("damagePerSecond")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 100;
let maxEnergy = parseInt(localStorage.getItem("maxEnergy")) || 100;
let energyRegen = parseInt(localStorage.getItem("energyRegen")) || 5;
let shopUpgrades = JSON.parse(localStorage.getItem("shopUpgrades")) || {};

function updateZombies() {
    document.getElementById("zombie-count").innerText = zombiesKilled;
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
        bossHealth--;
        bossHealthBar.style.width = (bossHealth / 20) * 100 + "%";
        if (bossHealth <= 0) {
            bossScreen.style.display = "none";
            maxEnergy += 50;  // Ganas 50 de energía al derrotar al boss
            updateStats();
            alert("¡Boss derrotado! +50 Energía");
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
        { name: "Bate", bonus: 2, cost: 20, type: "click" },
        { name: "Sobreviviente", bonus: 1, cost: 50, type: "second" },
        { name: "Pistola", bonus: 5, cost: 100, type: "click" },
        { name: "Barricada", bonus: 5, cost: 200, type: "second" },
        { name: "Escopeta", bonus: 10, cost: 250, type: "click" },
        { name: "Torreta", bonus: 15, cost: 300, type: "second" },
        { name: "AK47", bonus: 20, cost: 500, type: "click" },
        { name: "Bunker", bonus: 50, cost: 525, type: "second" },
        { name: "Pistola Laser", bonus: 50, cost: 1000, type: "click" },
        { name: "Torreta laser", bonus: 100, cost: 1250, type: "second" },
        { name: "Ametralladora laser", bonus: 75, cost: 1500, type: "click" },
        { name: "Meka", bonus: 200, cost: 1750, type: "second" },
        { name: "Regeneración rápida", bonus: 2, cost: 150, type: "regen" }
    ];
    upgrades.forEach(upgrade => {
        const div = document.createElement("div");
        let currentCost = shopUpgrades[upgrade.name] || upgrade.cost;
        div.innerText = `${upgrade.name} (+${upgrade.bonus} ${upgrade.type}) - ${currentCost} zombies`;
        div.classList.add("shop-item");
        div.onclick = () => buyUpgrade(upgrade);
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

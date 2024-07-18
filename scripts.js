let character = {
    name: '',
    location: 'Tallinn',
    money: 100,
    inventory: {
        flour: 0,
        meat: 0,
        sugar: 0,
        gunpowder: 0,
        candles: 0
    },
    days: 0
};

let prices = {
    flour: 0,
    meat: 0,
    sugar: 0,
    gunpowder: 0,
    candles: 0
};

const locations = ['Tallinn', 'Helsinki', 'Stockholm'];

function startGame() {
    const nameInput = document.getElementById('characterName').value;
    if (nameInput) {
        character.name = nameInput;
        document.getElementById('charName').innerText = character.name;
        document.getElementById('start').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        updateUI();
        randomizePrices();
    } else {
        showAlert('Please enter a name for your character.');
    }
}

function updateUI() {
    document.getElementById('location').innerText = character.location;
    document.getElementById('money').innerText = character.money;
    document.getElementById('inventory').innerText = JSON.stringify(character.inventory, null, 2);
    document.getElementById('days').innerText = character.days;

    const goodsContainer = document.getElementById('goods');
    goodsContainer.innerHTML = '';
    for (const good in prices) {
        const goodElement = document.createElement('div');
        goodElement.classList.add('good');
        goodElement.innerHTML = `
            <span>${good}: ${prices[good]} gold</span>
            <button onclick="buyGood('${good}')">Buy</button>
            <button onclick="sellGood('${good}')">Sell</button>
        `;
        goodsContainer.appendChild(goodElement);
    }
}

function travel(location) {
    if (character.location !== location) {
        character.location = location;
        character.days += 1;
        randomizePrices();
        updateUI();
    }
}

function randomizePrices() {
    for (const good in prices) {
        prices[good] = Math.floor(Math.random() * 100) + 1;
    }
    updateUI();
}

function buyGood(good) {
    if (character.money >= prices[good]) {
        character.money -= prices[good];
        character.inventory[good] += 1;
        updateUI();
    } else {
        showAlert('Not enough money!');
    }
}

function sellGood(good) {
    if (character.inventory[good] > 0) {
        character.money += prices[good];
        character.inventory[good] -= 1;
        updateUI();
    } else {
        showAlert('No inventory to sell!');
    }
}

function showAlert(message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

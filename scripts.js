document.addEventListener('DOMContentLoaded', function () {
    var characterNameInput = document.getElementById('characterName');
    characterNameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            startGame();
        }
    });
});
var character = {
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
    lastBoughtPrices: {
        flour: 0,
        meat: 0,
        sugar: 0,
        gunpowder: 0,
        candles: 0
    },
    days: 0
};
var prices = {
    flour: 0,
    meat: 0,
    sugar: 0,
    gunpowder: 0,
    candles: 0
};
var locations = ['Tallinn', 'Helsinki', 'Stockholm'];
function startGame() {
    var nameInput = document.getElementById('characterName').value;
    if (nameInput) {
        character.name = nameInput;
        document.getElementById('charName').innerText = character.name;
        document.getElementById('start').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        updateUI();
        randomizePrices();
    }
    else {
        showAlert('Please enter a name for your character.');
    }
}
function formatMoney(value) {
    return new Intl.NumberFormat('de-DE').format(value);
}
function updateUI() {
    document.getElementById('location').innerText = "Location: ".concat(character.location);
    document.getElementById('money').innerText = "".concat(formatMoney(character.money), " \u20AC");
    document.getElementById('days').innerText = character.days.toString();
    var goodsContainer = document.getElementById('goods');
    goodsContainer.innerHTML = '';
    for (var good in prices) {
        var goodElement = document.createElement('div');
        goodElement.classList.add('good');
        goodElement.innerHTML = "\n            <span><strong>".concat(good, "</strong>: ").concat(prices[good], " \u20AC (Owned: ").concat(character.inventory[good], ") (Last bought for: ").concat(character.lastBoughtPrices[good], " \u20AC)</span>\n            <div class=\"buttons\">\n                <button onclick=\"buyGood('").concat(good, "')\">Buy</button>\n                <button onclick=\"buyMaxGood('").concat(good, "')\">Buy Max</button>\n                <button onclick=\"sellGood('").concat(good, "')\">Sell</button>\n                <button onclick=\"sellAllGood('").concat(good, "')\">Sell All</button>\n            </div>\n        ");
        goodsContainer.appendChild(goodElement);
    }
}
function toggleTravelOptions() {
    var travelOptions = document.getElementById('travelOptions');
    if (travelOptions.style.display === 'none' || travelOptions.style.display === '') {
        updateTravelOptions();
        travelOptions.style.display = 'flex';
        travelOptions.style.animation = 'fadeIn 0.5s forwards';
    }
    else {
        travelOptions.style.display = 'none';
    }
}
function updateTravelOptions() {
    var travelOptions = document.getElementById('travelOptions');
    travelOptions.innerHTML = '';
    locations.forEach(function (location) {
        if (location !== character.location) {
            var button = document.createElement('button');
            button.innerText = "Travel to ".concat(location);
            button.onclick = function () {
                travel(location);
                toggleTravelOptions();
            };
            travelOptions.appendChild(button);
        }
    });
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
    for (var good in prices) {
        prices[good] = Math.floor(Math.random() * 100) + 1;
    }
    updateUI();
}
function buyGood(good) {
    var price = prices[good];
    if (character.money >= price) {
        character.money -= price;
        character.inventory[good] += 1;
        character.lastBoughtPrices[good] = price;
        updateUI();
    }
    else {
        showAlert('Not enough money!');
    }
}
function buyMaxGood(good) {
    var price = prices[good];
    var maxBuyable = Math.floor(character.money / price);
    if (maxBuyable > 0) {
        character.money -= maxBuyable * price;
        character.inventory[good] += maxBuyable;
        character.lastBoughtPrices[good] = price;
        updateUI();
    }
    else {
        showAlert('Not enough money!');
    }
}
function sellGood(good) {
    if (character.inventory[good] > 0) {
        var price = prices[good];
        character.money += price;
        character.inventory[good] -= 1;
        updateUI();
    }
    else {
        showAlert('You don\'t own that good!');
    }
}
function sellAllGood(good) {
    var quantity = character.inventory[good];
    if (quantity > 0) {
        var price = prices[good];
        character.money += quantity * price;
        character.inventory[good] = 0;
        updateUI();
    }
    else {
        showAlert('No inventory to sell!');
    }
}
function showAlert(message) {
    var alertBox = document.getElementById('alertBox');
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(function () {
        alertBox.style.display = 'none';
    }, 3000);
}

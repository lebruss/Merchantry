//Merchantry by lebruss
//press Enter to startGame
document.addEventListener('DOMContentLoaded', () => {
    const characterNameInput = document.getElementById('characterName') as HTMLInputElement;
    characterNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            startGame();
        }
    });
});

interface Character {
    name: string;
    location: string;
    money: number;
    inventory: Inventory;
    lastBoughtPrices: Inventory;
    days: number;
}

interface Inventory {
    flour: number;
    meat: number;
    sugar: number;
    gunpowder: number;
    candles: number;
}

interface Prices {
    flour: number;
    meat: number;
    sugar: number;
    gunpowder: number;
    candles: number;
}

let character: Character = {
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

let prices: Prices = {
    flour: 0,
    meat: 0,
    sugar: 0,
    gunpowder: 0,
    candles: 0
};

const locations: string[] = ['Tallinn', 'Helsinki', 'Stockholm'];

function startGame(): void {
    const nameInput = (document.getElementById('characterName') as HTMLInputElement).value;
    if (nameInput) {
        character.name = nameInput;
        (document.getElementById('charName') as HTMLSpanElement).innerText = character.name;
        (document.getElementById('start') as HTMLDivElement).style.display = 'none';
        (document.getElementById('game') as HTMLDivElement).style.display = 'block';
        updateUI();
        randomizePrices();
    } else {
        showAlert('Please enter a name for your character.');
    }
}

function updateUI(): void {
    (document.getElementById('location') as HTMLSpanElement).innerText = character.location;
    (document.getElementById('money') as HTMLSpanElement).innerText = `${character.money} €`;
    (document.getElementById('days') as HTMLSpanElement).innerText = character.days.toString();

    const goodsContainer = document.getElementById('goods') as HTMLDivElement;
    goodsContainer.innerHTML = '';
    for (const good in prices) {
        const goodElement = document.createElement('div');
        goodElement.classList.add('good');
        goodElement.innerHTML = `
            <span>${good}: ${prices[good as keyof Prices]} € (Owned: ${character.inventory[good as keyof Inventory]}) (Last bought for: ${character.lastBoughtPrices[good as keyof Inventory]} €)</span>
            <div class="buttons">
                <button onclick="buyGood('${good}')">Buy</button>
                <button onclick="buyMaxGood('${good}')">Buy Max</button>
                <button onclick="sellGood('${good}')">Sell</button>
                <button onclick="sellAllGood('${good}')">Sell All</button>
            </div>
        `;
        goodsContainer.appendChild(goodElement);
    }
}

function travel(location: string): void {
    if (character.location !== location) {
        character.location = location;
        character.days += 1;
        randomizePrices();
        updateUI();
    }
}

function randomizePrices(): void {
    for (const good in prices) {
        prices[good as keyof Prices] = Math.floor(Math.random() * 100) + 1;
    }
    updateUI();
}

function buyGood(good: string): void {
    const price = prices[good as keyof Prices];
    if (character.money >= price) {
        character.money -= price;
        character.inventory[good as keyof Inventory] += 1;
        character.lastBoughtPrices[good as keyof Inventory] = price;
        updateUI();
    } else {
        showAlert('Not enough money!');
    }
}

function buyMaxGood(good: string): void {
    const price = prices[good as keyof Prices];
    const maxBuyable = Math.floor(character.money / price);
    if (maxBuyable > 0) {
        character.money -= maxBuyable * price;
        character.inventory[good as keyof Inventory] += maxBuyable;
        character.lastBoughtPrices[good as keyof Inventory] = price;
        updateUI();
    } else {
        showAlert('Not enough money!');
    }
}

function sellGood(good: string): void {
    if (character.inventory[good as keyof Inventory] > 0) {
        const price = prices[good as keyof Prices];
        character.money += price;
        character.inventory[good as keyof Inventory] -= 1;
        updateUI();
    } else {
        showAlert('No inventory to sell!');
    }
}

function sellAllGood(good: string): void {
    const quantity = character.inventory[good as keyof Inventory];
    if (quantity > 0) {
        const price = prices[good as keyof Prices];
        character.money += quantity * price;
        character.inventory[good as keyof Inventory] = 0;
        updateUI();
    } else {
        showAlert('No inventory to sell!');
    }
}

function showAlert(message: string): void {
    const alertBox = document.getElementById('alertBox') as HTMLDivElement;
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

//EventListener takes keyboard input. (press enter to Start)
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
    julianDate: Date;
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
    days: 0,
    julianDate: new Date()
};

//Goods' default prices = 0 (these are randomly generated later in code)
let prices: Prices = {
    flour: 0,
    meat: 0,
    sugar: 0,
    gunpowder: 0,
    candles: 0
};

//list of locations
//right now these are only aesthetic difference, no different features per city yet
const locations: string[] = ['Tallinn', 'Helsinki', 'Stockholm'];

//start screen / splash screen
function startGame(): void {
    const nameInput = (document.getElementById('characterName') as HTMLInputElement).value;
    if (nameInput) {
        character.name = nameInput;
        character.julianDate = generateRandomJulianDate();
        (document.getElementById('charName') as HTMLSpanElement).innerText = character.name;
        (document.getElementById('start') as HTMLDivElement).style.display = 'none';
        (document.getElementById('game') as HTMLDivElement).style.display = 'block';
        updateUI();
        randomizePrices();
    } else {
        showAlert('Please enter a name for your character.');
    }
}

//generate starting date for game, using Julian calendar
function generateRandomJulianDate(): Date {
    const startYear = 800;
    const endYear = 1400;
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12); // 0-11 for Date object month
    const day = Math.floor(Math.random() * 31) + 1; // 1-31
    return new Date(year, month, day);
}

//format the date
function formatJulianDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

//Money format will be displayed as 5.008.286€
function formatMoney(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value);
}

//Update user interface when values change
function updateUI(): void {
    (document.getElementById('location') as HTMLSpanElement).innerText = `Location: ${character.location}`;
    (document.getElementById('money') as HTMLSpanElement).innerText = `${formatMoney(character.money)} €`;
    (document.getElementById('julianDate') as HTMLSpanElement).innerText = formatJulianDate(character.julianDate);

    const goodsContainer = document.getElementById('goods') as HTMLDivElement;
    goodsContainer.innerHTML = '';
    for (const good in prices) {
        const goodElement = document.createElement('div');
        goodElement.classList.add('good');
        goodElement.innerHTML = `
            <span><strong>${good}</strong>: ${prices[good as keyof Prices]} € (Owned: ${character.inventory[good as keyof Inventory]}) (Last bought for: ${character.lastBoughtPrices[good as keyof Inventory]} €)</span>
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

//Travel buttons
function toggleTravelOptions(): void {
    const travelOptions = document.getElementById('travelOptions') as HTMLDivElement;
    if (travelOptions.style.display === 'none' || travelOptions.style.display === '') {
        updateTravelOptions();
        //click Travel button, and travel options' buttons will fade in
        travelOptions.style.display = 'flex';
        travelOptions.style.animation = 'fadeIn 0.5s forwards';
    } else {
        travelOptions.style.display = 'none';
    }
}

function updateTravelOptions(): void {
    const travelOptions = document.getElementById('travelOptions') as HTMLDivElement;
    travelOptions.innerHTML = '';
    locations.forEach((location) => {
        if (location !== character.location) {
            const button = document.createElement('button');
            button.innerText = `Travel to ${location}`;
            button.onclick = () => {
                travel(location);
                toggleTravelOptions();
            };
            travelOptions.appendChild(button);
        }
    });
}

//Travel
function travel(location: string): void {
    if (character.location !== location) {
        character.location = location;
        //Pass 1 day
        character.days += 1;
        character.julianDate.setDate(character.julianDate.getDate() + 1); // Increment the Julian date by one day
        //Set prices for destination city (just randomize the prices)
        randomizePrices();
        updateUI();
    }
}
//Set prices for destination city (just randomize the prices)
function randomizePrices(): void {
    for (const good in prices) {
        prices[good as keyof Prices] = Math.floor(Math.random() * 100) + 1;//Prices are currently randomized between 1 and 100
    }
    updateUI();
}

//Buy a good
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

//Buy Max for a good; spend all money buying one good (with remainder money)
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

//Sell a good
function sellGood(good: string): void {
    if (character.inventory[good as keyof Inventory] > 0) {
        const price = prices[good as keyof Prices];
        character.money += price;
        character.inventory[good as keyof Inventory] -= 1;
        updateUI();
    } else {
        showAlert('You don\'t own that good!');
    }
}

//Sell All; if player has 400 candles, sell all of them at once
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

//Alert messages
function showAlert(message: string): void {
    const alertBox = document.getElementById('alertBox') as HTMLDivElement;
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

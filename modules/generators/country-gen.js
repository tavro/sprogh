function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function generateCurrencyName() {
    const prefixes = ["Zar", "Eld", "Thal", "Xar", "Quel", "Drak", "Fyr", "Kyl", "Myr", "Zeph"];
    const suffixes = ["ix", "or", "en", "yl", "ar", "ir", "us", "yth", "ium", "yn"];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return randomPrefix + randomSuffix;
}

function generateData() {
    const area = getRandomNumber(2, 17000000);
    const population = area * getRandomNumber(10, 30);
    const money = getRandomNumber(0, 150000);
    
    const formattedArea = formatNumberWithSpaces(area);
    const formattedPopulation = formatNumberWithSpaces(population);
    const formattedMoney = formatNumberWithSpaces(money);
    
    const areaElement = document.getElementById("co-area");
    const populationElement = document.getElementById("co-population");
    const economyElement = document.getElementById("co-economy");
    const currencyElement = document.getElementById("co-currency");

    areaElement.innerHTML += formattedArea + " km<sup>2</sup>";
    populationElement.innerHTML += formattedPopulation + " st";
    economyElement.innerHTML += formattedMoney + " bn $";
    currencyElement.innerHTML += generateCurrencyName().toLowerCase();
}

generateData();

const canvas = document.getElementById('countryCanvas');
const ctx = canvas.getContext('2d');

function generateRandomNonOverlappingCycle(numVertices, gridSize) {
    const vertices = [];
    for (let i = 0; i < numVertices; i++) {
        const x = Math.random() * gridSize;
        const y = Math.random() * gridSize;
        vertices.push({ x, y });
    }

    vertices.sort((a, b) => {
        const angleA = Math.atan2(a.y - gridSize / 2, a.x - gridSize / 2);
        const angleB = Math.atan2(b.y - gridSize / 2, b.x - gridSize / 2);
        return angleA - angleB;
    });

    return vertices;
}

const numVertices = getRandomNumber(3, 16);
const gridSize = 156;
const randomCoordinates = generateRandomNonOverlappingCycle(numVertices, gridSize);

function drawCountryShape(coordinates) {
    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);

    for (let i = 1; i < coordinates.length; i++) {
        ctx.lineTo(coordinates[i].x, coordinates[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
}

drawCountryShape(randomCoordinates);
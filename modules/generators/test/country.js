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
const gridSize = 300;
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
    ctx.lineWidth = getRandomNumber(2,6);
    ctx.fill();
    ctx.stroke();
}

drawCountryShape(randomCoordinates);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


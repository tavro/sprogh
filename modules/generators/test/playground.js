function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomOpacity() {
    return generateRandomNumber(0, 100);
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function setCornerProperties(cornerElement, randomBorderRadius, randomOpacity) {
    const shouldShowCorner = Math.random() >= 0.5; // 50% chance of showing up
    if (shouldShowCorner) {
        cornerElement.style.borderRadius = randomBorderRadius;
        cornerElement.style.backgroundColor = `rgba(255, 255, 255, ${randomOpacity / 100})`; // Set background color with opacity
        cornerElement.style.color = `#556B2F`;
        cornerElement.innerText = randomValue;
    } else {
        cornerElement.style.display = 'none'; // Hide the corner
    }
}

const randomValue = getRandomElement([20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000]);
const randomBorderRadius = generateRandomNumber(0, 50) + '%'; // Generate a random border radius for all corners
const randomOpacity = generateRandomOpacity(); // Generate a random opacity for all corners
const corners = document.querySelectorAll('.corner');

corners.forEach(corner => {
    setCornerProperties(corner, randomBorderRadius, randomOpacity);
});

const canvas = document.getElementById('paperCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 200; // Set canvas width
canvas.height = 100; // Set canvas height

function drawRandomShapesAndLines() {
    const numShapes = generateRandomNumber(3, 10); // Number of random shapes to draw

    for (let i = 0; i < numShapes; i++) {
        const shapeType = generateRandomNumber(1, 3); // 1: Rectangle, 2: Circle, 3: Line
        const shapeWidth = generateRandomNumber(8, 256); // Width of the shape
        const shapeHeight = generateRandomNumber(8, 256); // Height of the shape
        const startX = generateRandomNumber(0, canvas.width - shapeWidth); // Starting X coordinate
        const startY = generateRandomNumber(0, canvas.height - shapeHeight); // Starting Y coordinate

        ctx.beginPath();

        if (shapeType === 1) {
            // Draw rectangle
            ctx.rect(startX, startY, shapeWidth, shapeHeight);
        } else if (shapeType === 2) {
            // Draw circle
            const radius = shapeWidth / 2;
            const centerX = startX + radius;
            const centerY = startY + radius;
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        } else {
            // Draw line
            const endX = generateRandomNumber(0, canvas.width);
            const endY = generateRandomNumber(0, canvas.height);
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
        }

        ctx.closePath();
        const randomOpacity = generateRandomNumber(5, 25) / 100;
        ctx.fillStyle = `rgba(0, 0, 0, ${randomOpacity})`;
        ctx.fill();
    }
}

drawRandomShapesAndLines();
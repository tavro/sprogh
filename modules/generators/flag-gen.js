function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHexColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomYellowColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * red);

    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');

    const hexColor = `#${redHex}${greenHex}00`;

    return hexColor;
}


const colorPalette = ["#FF5733", "#FFC300", "#DAF7A6", "#58D68D", "#3498DB", "#AF7AC5"];
function getRandomColorFromPalette() {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
}

function generateRay() {
    var ray = document.createElement("div");
    ray.classList.add("ray");

    var sun = document.getElementById("sun");
    sun.appendChild(ray);
}

function generateSun() {
    const startRotation = -150;
    const endRotation = 180;
    const totalRange = 360;
    const rayAmount = getRandomNumber(4, 32);

    const rayLen = getRandomNumber(10, 30);
    const rayColor = generateRandomYellowColor();

    const step = totalRange / rayAmount;

    var style = document.createElement('style');
    document.head.appendChild(style);
    var sheet = style.sheet;

    const rayRule = ".ray { border-bottom: " + rayLen + "px solid " + rayColor + "; }"
    sheet.insertRule(rayRule, 0);
    for(let i = 0; i < rayAmount; i++) {
        generateRay();
        const cssRule = ".ray:nth-child(" + (i+1) + ") { transform: translate(-50%, -33px) rotate(" + (startRotation+step*i) + "deg); }";
        sheet.insertRule(cssRule, 0);
    }
}

function generateFlag() {
    var genSun = getRandomBoolean();
    var flagElement = document.getElementById("flag");
    flagElement.style.display = "flex";
    flagElement.style.width = "96px";
    flagElement.style.height = "64px";
    flagElement.style.border = "1px solid black";
    flagElement.style.position = "relative";

    const stripes = getRandomNumber(1, 4);

    for(let i = 0; i < stripes; i++) {
        var div = document.createElement("div");
        div.style.backgroundColor = getRandomColorFromPalette();
        div.style.width = "100%";
        div.style.height = "100%";
        flagElement.appendChild(div);
    }

    flagElement.style.flexDirection = getRandomBoolean() ? "column" : "row";

    if(getRandomBoolean()) {
        if(getRandomBoolean()) {
            var crossSize = "100%";
            var crossColor = getRandomBoolean() ? getRandomColorFromPalette() : getRandomHexColor();

            var horizontalLine = document.createElement("div");
            horizontalLine.style.backgroundColor = crossColor;
            horizontalLine.style.width = crossSize;
            horizontalLine.style.height = "10px";
            horizontalLine.style.position = "absolute";
            horizontalLine.style.left = "50%";
            horizontalLine.style.top = "50%";
            var perY = getRandomNumber(-100, 100);
            horizontalLine.style.transform = "translate(-50%, " + perY + "%)";
            flagElement.appendChild(horizontalLine);

            var verticalLine = document.createElement("div");
            verticalLine.style.backgroundColor = crossColor;
            verticalLine.style.width = "10px";
            verticalLine.style.height = crossSize;
            verticalLine.style.position = "absolute";
            verticalLine.style.left = "50%";
            verticalLine.style.top = "50%";
            var perX = getRandomNumber(-300, 300);
            verticalLine.style.transform = "translate(" + perX + "%, -50%)";
            flagElement.appendChild(verticalLine);
            genSun = false;
        }
        else {
            var circle = document.createElement("div");
            circle.style.backgroundColor = getRandomBoolean() ? getRandomColorFromPalette() : getRandomHexColor();
            circle.style.borderRadius = "50%";
            var circleSize = getRandomNumber(25, 50);
            circle.style.width = circleSize + "px";
            circle.style.height = circleSize + "px";
            circle.style.position = "absolute";
            circle.style.left = "50%";
            circle.style.top = "50%";
            circle.style.transform = "translate(-50%, -50%)";
            flagElement.appendChild(circle);
        }
    }
    if(genSun) {
        generateSun();
    }
}

generateFlag();
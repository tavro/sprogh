function getRandomHexColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFlag() {
    var flagElement = document.getElementById("flag");
    flagElement.style.display = "flex";
    flagElement.style.width = "96px";
    flagElement.style.height = "64px";
    flagElement.style.border = "1px solid black"

    const stripes = getRandomNumber(2, 4);

    for(let i = 0; i < stripes; i++) {
        var div = document.createElement("div");
        div.style.backgroundColor = getRandomHexColor();
        div.style.width = "100%";
        div.style.height = "100%";
        flagElement.appendChild(div);
    }

    if(getRandomBoolean()) {
        flagElement.style.flexDirection = "column";
    }
    else {
        flagElement.style.flexDirection = "row";
    }
}

generateFlag();
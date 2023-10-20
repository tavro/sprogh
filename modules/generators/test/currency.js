function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const goldPallette = {
    light: "#FFD700",
    dark: "#B8860B",
    rgb: "rgba(184, 134, 11, 0.5)"
};

const silverPallette = {
    light: "#C0C0C0",
    dark: "#A9A9A9",
    rgb: "rgba(169, 169, 169, 0.5)"
};

function styleCoin() {
    const value = getRandomElement([1, 2, 5, 10]);
    const valueElement = document.getElementById("coin-value");

    const coinElement = document.getElementById("coin");
    const coinInnerElement = document.getElementById("coin-inner");

    const activePallette = getRandomBoolean() ? goldPallette : silverPallette;
    coinInnerElement.style.backgroundColor = activePallette.light;
    //coinInnerElement.style.boxShadow = "inset 0px 0px 16px 8px " + activePallette.rgb;
    coinElement.style.backgroundColor = activePallette.dark;
    valueElement.style.color = activePallette.dark;

    var curvedText = document.getElementById('curved-text');
    curvedText.style.fill = activePallette.dark;

    const fontSize = getRandomNumber(32, 56);

    valueElement.innerHTML = value;
    valueElement.style.fontSize = fontSize + "px";
}

styleCoin();
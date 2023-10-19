function generateRay() {
    var ray = document.createElement("div");
    ray.classList.add("ray");

    var sun = document.getElementById("sun");
    sun.appendChild(ray);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generate() {
    const startRotation = -150;
    const endRotation = 180;
    const totalRange = 360;
    const rayAmount = getRandomInt(4, 48);

    const step = totalRange / rayAmount;

    var style = document.createElement('style');
    document.head.appendChild(style);
    var sheet = style.sheet;

    for(let i = 0; i < rayAmount; i++) {
        generateRay();
        const cssRule = ".ray:nth-child(" + (i+1) + ") { transform: translate(-50%, -50%) rotate(" + (startRotation+step*i) + "deg); }";
        sheet.insertRule(cssRule, 0);
    }
}

generate();

document.addEventListener("DOMContentLoaded", function() {
    const triangle = document.querySelector(".triangle");
    const minWidth = 16;
    const maxWidth = 94;
    const randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;

    triangle.style.borderLeftWidth = randomWidth + "px";
});
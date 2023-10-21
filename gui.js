function addCSSVariables(colors) {
    const root = document.documentElement;

    for (const key in colors) {
        if (colors.hasOwnProperty(key)) {
            const value = colors[key];
            root.style.setProperty(`--${key}`, value);
        }
    }
}

const colors = {
    "header": "rgba(55, 55, 55, 1)",
    "header-hover": "rgba(90, 90, 90, 1)",
    "bg-main": "rgba(255, 255, 255, 1)",
    "bg-light": "rgba(240, 240, 240, 1)",
    "dark-solid": "rgba(30, 30, 30, 1)"
};

addCSSVariables(colors);

const grammarTab = document.getElementById("grammarTab");
const grammarContent = document.getElementById("grammarContent");

const overviewTab = document.getElementById("overviewTab");
const overviewContent = document.getElementById("overviewContent");

const dictionaryTab = document.getElementById("dictionaryTab");
const dictionaryContent = document.getElementById("dictionaryContent");

const collapseButton = document.getElementById("collapseButton");
collapseButton.addEventListener("click", function() {
    const collapsable = document.getElementById("collapsable");
    collapsable.style.display = collapsable.style.display === "block" ? "none" : "block";
    collapseButton.innerHTML = collapseButton.innerHTML === "_" ? "■" : "_";
});

grammarTab.addEventListener("click", function() {
    overviewContent.style.display = "none";
    dictionaryContent.style.display = "none";
    grammarContent.style.display = "block";

    overviewTab.classList.remove("active");
    dictionaryTab.classList.remove("active");
    grammarTab.classList.add("active");
});

overviewTab.addEventListener("click", function() {
    grammarContent.style.display = "none";
    dictionaryContent.style.display = "none";
    overviewContent.style.display = "block";

    grammarTab.classList.remove("active");
    dictionaryTab.classList.remove("active");
    overviewTab.classList.add("active");
});

dictionaryTab.addEventListener("click", function() {
    overviewContent.style.display = "none";
    grammarContent.style.display = "none";
    dictionaryContent.style.display = "block";

    overviewTab.classList.remove("active");
    grammarTab.classList.remove("active");
    dictionaryTab.classList.add("active");
});

const cOverviewTab = document.getElementById("cOverviewTab");
const cOverview = document.getElementById("c-overview");

const cPopulationTab = document.getElementById("cPopulationTab");
const cPopulation = document.getElementById("c-population");

const cEconomyTab = document.getElementById("cEconomyTab");
const cEconomy = document.getElementById("c-economy");

const cCultureTab = document.getElementById("cCultureTab");
const cCulture = document.getElementById("c-culture");

const cGeografyTab = document.getElementById("cGeografyTab");
const cGeografy = document.getElementById("c-geografy");

cOverviewTab.addEventListener("click", function() {
    cGeografy.style.display = "none";
    cCulture.style.display = "none";
    cEconomy.style.display = "none";
    cPopulation.style.display = "none";
    cOverview.style.display = "block";

    cGeografyTab.classList.remove("active");
    cCultureTab.classList.remove("active");
    cEconomyTab.classList.remove("active");
    cPopulationTab.classList.remove("active");
    cOverviewTab.classList.add("active");
});

cPopulationTab.addEventListener("click", function() {
    cGeografy.style.display = "none";
    cCulture.style.display = "none";
    cEconomy.style.display = "none";
    cPopulation.style.display = "block";
    cOverview.style.display = "none";

    cGeografyTab.classList.remove("active");
    cCultureTab.classList.remove("active");
    cEconomyTab.classList.remove("active");
    cPopulationTab.classList.add("active");
    cOverviewTab.classList.remove("active");
});

cEconomyTab.addEventListener("click", function() {
    cGeografy.style.display = "none";
    cCulture.style.display = "none";
    cEconomy.style.display = "block";
    cPopulation.style.display = "none";
    cOverview.style.display = "none";

    cGeografyTab.classList.remove("active");
    cCultureTab.classList.remove("active");
    cEconomyTab.classList.add("active");
    cPopulationTab.classList.remove("active");
    cOverviewTab.classList.remove("active");
});

cCultureTab.addEventListener("click", function() {
    cGeografy.style.display = "none";
    cCulture.style.display = "block";
    cEconomy.style.display = "none";
    cPopulation.style.display = "none";
    cOverview.style.display = "none";

    cGeografyTab.classList.remove("active");
    cCultureTab.classList.add("active");
    cEconomyTab.classList.remove("active");
    cPopulationTab.classList.remove("active");
    cOverviewTab.classList.remove("active");
});

cGeografyTab.addEventListener("click", function() {
    cGeografy.style.display = "block";
    cCulture.style.display = "none";
    cEconomy.style.display = "none";
    cPopulation.style.display = "none";
    cOverview.style.display = "none";

    cGeografyTab.classList.add("active");
    cCultureTab.classList.remove("active");
    cEconomyTab.classList.remove("active");
    cPopulationTab.classList.remove("active");
    cOverviewTab.classList.remove("active");
});

const aboutTab = document.getElementById("aboutTab");
const aboutContent = document.getElementById("aboutContent");
const changelogTab = document.getElementById("changelogTab");
const changelogContent = document.getElementById("changelogContent");

aboutTab.addEventListener("click", function() {
    changelogContent.style.display = "none";
    aboutContent.style.display = "block";

    changelogTab.classList.remove("active");
    aboutTab.classList.add("active");
});

changelogTab.addEventListener("click", function() {
    changelogContent.style.display = "block";
    aboutContent.style.display = "none";

    changelogTab.classList.add("active");
    aboutTab.classList.remove("active");
});

const changeLog = {
    "0.0.2": [
        "add support for custom configuration of GUI",
        "make GUI windows movable"
    ],
    "0.0.1": [
        "implement changelog system",
        "add header for GUI windows",
        "make GUI windows collapsable",
        "implement country shape generator"
    ]
}

function updateChangelogTab() {
    for (const key in changeLog) {
        if (changeLog.hasOwnProperty(key)) {
            const value = changeLog[key];
            changelogContent.innerHTML += "<p><b>" + key + ":</b></p>"
            for(let i = 0; i < value.length; i++) {
                changelogContent.innerHTML += "<p> • " + value[i] + "</p>"
            }
        }
    }
}
updateChangelogTab();

document.addEventListener("DOMContentLoaded", function() {
    var optionsHeader = document.getElementById('oh1');
    var movableDiv = document.querySelector('.movable');

    var offsetX, offsetY, isDragging = false;

    optionsHeader.addEventListener('mousedown', function(e) {
        offsetX = e.clientX - movableDiv.getBoundingClientRect().left;
        offsetY = e.clientY - movableDiv.getBoundingClientRect().top;
        isDragging = true;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var newX = e.clientX - offsetX;
            var newY = e.clientY - offsetY;

            movableDiv.style.left = newX + 'px';
            movableDiv.style.top = newY + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
});
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

function showTab(tab, content, prefixes) {
    for(let i = 0; i < prefixes.length; i++) {
        const tabId = prefixes[i] + "Tab";
        const tabElement = document.getElementById(tabId);
        const contentId = prefixes[i] + "Content";
        const contentElement = document.getElementById(contentId);

        contentElement.style.display = "none";
        tabElement.classList.remove("active");
    }

    content.style.display = "block";
    tab.classList.add("active");
}

function addWindowListener(prefixes) {
    for(let i = 0; i < prefixes.length; i++) {
        const tabId = prefixes[i] + "Tab";
        const tabElement = document.getElementById(tabId);
        const contentId = prefixes[i] + "Content";
        const contentElement = document.getElementById(contentId);
        tabElement.addEventListener("click", function() {
            showTab(tabElement, contentElement, prefixes);
        });
    }
}

addWindowListener(["grammar", "overview", "dictionary"]);
addWindowListener(["cOverview", "cPopulation", "cEconomy", "cCulture", "cGeografy"]);
addWindowListener(["about", "changelog", "tutorial"]);
addWindowListener(["ci-overview"]);

for(let i = 0; i < 4; i++) {
    const id = "collapseButton" + (i + 1);
    const collapseButton = document.getElementById(id);
    collapseButton.addEventListener("click", function() {
        const id2 = "collapsable" + (i + 1);
        const collapsable = document.getElementById(id2);
        collapsable.style.display = collapsable.style.display === "block" ? "none" : "block";
        collapseButton.innerHTML = collapseButton.innerHTML === "_" ? "■" : "_";
    });
}

const changeLog = {
    "0.0.6": [
        "translate website to english",
        "generate city names",
        "add city overview GUI window"
    ],
    "0.0.5": [
        "implement notification system",
        "generate cities"
    ],
    "0.0.4": [
        "refactor GUI system"
    ],
    "0.0.3": [
        "add voronoi terrain generation",
        "make it possible to select country"
    ],
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

for(let i = 0; i < 4; i++) {
    document.addEventListener("DOMContentLoaded", function() {
        const id = "oh" + (i+1);
        var optionsHeader = document.getElementById(id);
        const cl = '.movable' + (i+1);
        var movableDiv = document.querySelector(cl);

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
}
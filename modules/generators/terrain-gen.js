const canvas2 = document.getElementById("terrainCanvas");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const voronoi = new Voronoi();
const sites = [];
const cities = [];
const diagram = generateVoronoiDiagram();
let hoveredCellIndex = null;
let isSelected = false;

function generateVoronoiDiagram() {
    const bbox = {
        xl: 0,
        xr: canvas2.width,
        yt: 0,
        yb: canvas2.height
    };

    for (let i = 0; i < 100; i++) {
        sites.push({
            x: Math.random() * canvas2.width,
            y: Math.random() * canvas2.height
        });
    }

    return voronoi.compute(sites, bbox);
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); 
    const saturation = Math.floor(Math.random() * 50) + 50;
    const lightness = Math.floor(Math.random() * 50) + 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function cellPath(cell) {
    const path = new Path2D();
    path.moveTo(cell.halfedges[0].getStartpoint().x, cell.halfedges[0].getStartpoint().y);
    cell.halfedges.forEach(halfedge => {
        path.lineTo(halfedge.getEndpoint().x, halfedge.getEndpoint().y);
    });
    path.closePath();
    return path;
}
let selectedCellIndex = null;

canvas2.addEventListener("mousemove", handleMouseMove);
canvas2.addEventListener("click", handleMouseClick);

function handleMouseMove(event) {
    if(!isSelected) {
        const mouseX = event.clientX - canvas2.offsetLeft;
        const mouseY = event.clientY - canvas2.offsetTop;

        hoveredCellIndex = null;
        diagram.cells.forEach((cell, index) => {
            const isInCell = ctx2.isPointInPath(cellPath(cell), mouseX, mouseY);
            if (isInCell) {
                hoveredCellIndex = index;
            }
        });

        drawDiagram();
    }
}

function handleMouseClick(event) {
    if(!isSelected) {
        if (event.button === 0 && hoveredCellIndex !== null) {
            selectedCellIndex = hoveredCellIndex;
            drawDiagram();
        }
    }
}

function drawDiagram() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    diagram.cells.forEach((cell, index) => {
        if (index === selectedCellIndex || index === hoveredCellIndex) {
            ctx2.fillStyle = index === hoveredCellIndex ? "yellow" : "green";
        } else {
            ctx2.fillStyle = "gray";
        }
        ctx2.strokeStyle = "black";

        ctx2.fill(cellPath(cell));
        ctx2.stroke(cellPath(cell));
    });

    /*
    ctx2.fillStyle = "red";
    sites.forEach(site => {
        ctx2.beginPath();
        ctx2.arc(site.x, site.y, 3, 0, 2 * Math.PI);
        ctx2.fill();
    });
    */
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (selectedCellIndex !== null) {
            const gameWindow = document.getElementById("game-window");
            const langWindow = document.getElementById("lang-window");
            const landWindow = document.getElementById("land-window");
            const cityWindow = document.getElementById("city-window");
            gameWindow.style.display = "block";
            langWindow.style.display = "block";
            landWindow.style.display = "block";
            cityWindow.style.display = "block";

            const selectedCell = diagram.cells[selectedCellIndex];

            let minX = Infinity;
            let minY = Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;

            selectedCell.halfedges.forEach(halfedge => {
                const x = halfedge.getStartpoint().x;
                const y = halfedge.getStartpoint().y;
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            });

            const cellWidth = maxX - minX;
            const cellHeight = maxY - minY;

            const scaleFactorX = (canvas2.width * 0.5) / cellWidth;
            const scaleFactorY = (canvas2.height * 0.5) / cellHeight;

            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            const offsetX = canvas2.width / 2 - centerX * scaleFactorX;
            const offsetY = canvas2.height / 2 - centerY * scaleFactorY;

            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.fillStyle = "green";
            ctx2.strokeStyle = "black";
            ctx2.beginPath();
            selectedCell.halfedges.forEach(halfedge => {
                ctx2.lineTo(halfedge.getStartpoint().x * scaleFactorX + offsetX, halfedge.getStartpoint().y * scaleFactorY + offsetY);
            });
            ctx2.closePath();
            ctx2.fill();
            ctx2.stroke();

            isSelected = true;

            
            const numDots = 10;
            const cityNames = generateRandomCityNames(numDots);
            for (let i = 0; i < numDots; i++) {
                ctx2.fillStyle = "red";
                let randomX, randomY;
                let isInsideCell = false;
                while (!isInsideCell) {
                    randomX = minX + Math.random() * cellWidth;
                    randomY = minY + Math.random() * cellHeight;
                    isInsideCell = ctx2.isPointInPath(cellPath(selectedCell), randomX, randomY);
                }
                
                const dotRadius = Math.random() * 4 + 2;
                ctx2.beginPath();
                ctx2.arc(
                    randomX * scaleFactorX + offsetX,
                    randomY * scaleFactorY + offsetY,
                    dotRadius,
                    0,
                    2 * Math.PI
                );
                ctx2.fill();

                const cityName = cityNames[i];
                ctx2.font = "12px Arial";
                ctx2.fillStyle = "black";
                ctx2.textAlign = "center";
                ctx2.fillText(
                    cityName,
                    randomX * scaleFactorX + offsetX,
                    (randomY - dotRadius - 5) * scaleFactorY + offsetY
                );

                const city = {
                    x: randomX * scaleFactorX + offsetX,
                    y: randomY * scaleFactorY + offsetY,
                    radius: dotRadius,
                    name: cityName,
                    happenings: []
                };
                cities.push(city);

            }
            splitNumberIntoGroups(cities, country.population, "population");
            splitNumberIntoGroups(cities, country.area, "area");
        }
    }
});

function getCityName(mouseX, mouseY) {
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const distance = Math.sqrt((mouseX - city.x) ** 2 + (mouseY - city.y) ** 2);
        
        if (distance <= city.radius) {
            return cities[i];
        }
    }
    return undefined;
}

function splitNumberIntoGroups(objects, largeNumber, attribute) {
    const totalRadius = objects.reduce((sum, obj) => sum + obj.radius, 0);

    for (let i = 0; i < objects.length; i++) {
        const ratio = objects[i].radius / totalRadius;
        const value = Math.floor(largeNumber * ratio);
        objects[i][attribute] = value;
    }

    return objects;
}

canvas2.addEventListener('click', function(event) {
    const rect = canvas2.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const city = getCityName(mouseX, mouseY);
    if(city) {
        const title = document.getElementById("ci-name");
        const pop = document.getElementById("ci-population");
        const area = document.getElementById("ci-area");
        title.innerHTML = city.name;
        pop.innerHTML = "<b>Population: </b>" + city.population;
        area.innerHTML = "<b>Area: </b>" + city.area + " km<sup>2</sup>";

        const title2 = document.getElementById("ci-name2");
        
        const happeningDiv = document.getElementById("ci-happenings");
        while (happeningDiv.firstChild) {
            happeningDiv.removeChild(happeningDiv.firstChild);
        }

        if(city.happenings.length === 0) {
            title2.innerHTML = "There has not been any major happenings in this city yet."
        }
        else {
            title2.innerHTML = city.name;
            for(let i = 0; i < city.happenings.length; i++) {
                const paragraph = document.createElement("p");
                paragraph.innerHTML = city.happenings[i];
                happeningDiv.appendChild(paragraph);
            }
        }
    }
});

drawDiagram();
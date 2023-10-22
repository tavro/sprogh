const canvas2 = document.getElementById("terrainCanvas");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const voronoi = new Voronoi();
const sites = [];
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
            gameWindow.style.display = "block";
            langWindow.style.display = "block";
            landWindow.style.display = "block";

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
        }
    }
});

drawDiagram();
function Map()
{
    this.mapData = null; // Placeholder for map data

    this.canvas = document.getElementById("game-layer");
    this.context = this.canvas.getContext("2d");

    this.tilesetImage = new Image();
    this.currentLevelIndex = 0;

    this.loaded = false;

}

Map.prototype.loadMapData = function (mapPath) {
    fetch(mapPath)
        .then(response => response.json())
        .then(data => {
            this.mapData = data;
            this.renderLevel(0); // Render the level after loading the map data
        })
        .catch(error => console.error('Error loading map:', error));

};

Map.prototype.renderLevel = function (levelIndex) {
    if (!this.mapData) {
        console.warn('Map data not loaded yet.');
        return;
    }

    const level = this.mapData.levels[levelIndex];

    if (!level) {
        console.warn('No levels found in map data.');
        return;
    }

    this.levelWidth = level.pxWid / this.mapData.defaultGridSize;
    this.levelHeight = level.pxHei / this.mapData.defaultGridSize;
    this.gridSize = this.mapData.defaultGridSize;
    this.collisionGridSize = this.mapData.defaultGridSize/2;

    this.tileData = {};
    this.collisionData = []; // Array to store wall collision tiles

    level.layerInstances.forEach(layer => {
        if (layer.__type === "Tiles") {
            this.tileData[layer.__identifier] = layer.gridTiles;
        } else if (layer.__type === "IntGrid") {
            // Extract collision data from IntGrid layers
            layer.intGridCsv.forEach((value, index) => {
                if (value === 1) { // Assuming 1 represents a wall
                    const x = index % layer.__cWid;
                    const y = Math.floor(index / layer.__cWid);
                    this.collisionData.push({ x: x * this.collisionGridSize, y: y * this.collisionGridSize});
                }
            });
        }
    }

);

    const tileset = this.mapData.defs.tilesets[0];
    const imagePath = tileset.relPath.startsWith("../") ? tileset.relPath.substring(3) : tileset.relPath;

    this.tilesetImage.src = imagePath;
    this.tilesetImage.onload = () => {
        console.log('Tileset image loaded.');
    };

    this.loaded = true;
};

Map.prototype.renderTiles = function () {
    if (!this.tileData || !this.tilesetImage.complete) return; // Ensure image is loaded

    const tileset = this.mapData.defs.tilesets[0];
    const tileWidth = this.gridSize;
    const tileHeight = this.gridSize;

    // Render tile layers
    for (const layerName in this.tileData) {
        this.tileData[layerName].forEach(tile => {
            const sourceX = tile.src[0];
            const sourceY = tile.src[1];
            const destX = tile.px[0];
            const destY = tile.px[1];

            this.context.drawImage(
                this.tilesetImage,
                sourceX,
                sourceY,
                tileWidth,
                tileHeight,
                destX,
                destY,
                tileWidth,
                tileHeight
            );
        });
    }

    // // Overlay red boxes for collision tiles (debug)
    // this.context.save();
    // this.context.fillStyle = 'rgba(255, 0, 0, 1)'; // semi-transparent red

    // this.collisionData.forEach(coord => {
    //     let tileX, tileY;

    //     if (typeof coord === 'string') {
    //         [tileX, tileY] = coord.split(',').map(Number);
    //     } else {
    //         tileX = coord.x / this.gridSize;
    //         tileY = coord.y / this.gridSize;
    //     }

    //     this.context.fillRect(
    //         tileX * this.gridSize,
    //         tileY * this.gridSize,
    //         this.collisionGridSize,
    //         this.collisionGridSize
    //     );
    // });

    // this.context.restore();
};

Map.prototype.isBlocked = function(pixelX, pixelY) {

    if (!this.loaded) return true; // No collision data available

    const minX = pixelX;
    const minY = pixelY;
    const maxX = pixelX + this.gridSize;
    const maxY = pixelY + this.gridSize;

    // console.log(`${pixelX}, ${pixelY}, ${minX}, ${minY}, ${maxX}, ${maxY}`);

    for (let i = 0; i < this.collisionData.length; i++) {
        const tile = this.collisionData[i];
        if (minX < tile.x + this.collisionGridSize && maxX > tile.x && minY < tile.y + this.collisionGridSize && maxY > tile.y) {
            // Collision detected
            return true;
        }
    }

    return false;
};






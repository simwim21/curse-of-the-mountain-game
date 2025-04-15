

function LevelManager(map) {
    this.map = map;
    this.dynamicEntities = []; // player, enemies, etc.

    this.levelList = [];
}

LevelManager.prototype.levelInitializer = function() 
{
    this.levelList.push(new Level(0, 1, -1, 2, -1)); // Level 0 => Left=1, Up=2
    this.levelList.push(new Level(1, -1, 0, -1, -1)); // Level 1 => Right=0
    this.levelList.push(new Level(2, -1, -1, -1, 0)); // Level 2 => Down=0
}

LevelManager.prototype.addEntity = function(entity) {
    this.dynamicEntities.push(entity);
};

LevelManager.prototype.isCollision = function(x, y, requestingEntity) {
    const tileX = Math.floor(x / this.map.gridSize);
    const tileY = Math.floor(y / this.map.gridSize);

    // Check map collisions
    if (this.map.isBlocked(x, y)) return true;

    // Check other entities (except self)
    for (let entity of this.dynamicEntities) {
        if (entity === requestingEntity) continue;
        if (entity.x === x && entity.y === y) return true; // refine this with bounding box
    }

    return false;
};

LevelManager.prototype.changeLevel = function(x, y)
{
    // x == -1 -> left
    // x == 1 -> right
    // y == -1 -> up
    // y == 1 -> down
    // x, y == 0 -> no change

    if (x == -1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].leftNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].leftNeighbor;
        return;  
    }
    if (x == 1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].rightNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].rightNeighbor;
        return;  
    }
    if (y == -1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].upNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].upNeighbor;
        return;  
    }
    if (y == 1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].downNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].downNeighbor;
        return;  
    }




}


function LevelManager(map) {
    this.map = map;
    this.currentLevelEntities = []; // Immovable (interactable) objects in thw world
    this.currentLevelEntitySprites = [];

    this.currentLevelEnemies = []; // Enemies in the world
    this.currentLevelEnemySprites = [];
    
    this.levelList = [];

    const checkEntityData = setInterval(() => {
        if (this.map.entityData && this.map.entityData.length > 0) {
            this.fillCurrentLevelEntities(this.map.entityData);
            clearInterval(checkEntityData); // Stop checking once initialized
        }
    }, 100); // Check every 100ms

    const checkEnemyData = setInterval(() => {
        if (this.map.enemyData && this.map.enemyData.length > 0) {
            this.fillCurrentLevelEnemies(this.map.enemyData);
            clearInterval(checkEnemyData); // Stop checking once initialized
        }
    }, 100); // Check every 100ms
}

LevelManager.prototype.levelInitializer = function() // Sets the logic which level is next to which level
{
    this.levelList.push(new Level(0, 1, -1, 2, -1, this.map)); // Level 0 => Left=1, Up=2
    this.levelList.push(new Level(1, -1, 0, -1, -1, this.map)); // Level 1 => Right=0
    this.levelList.push(new Level(2, -1, -1, -1, 0, this.map)); // Level 2 => Down=0
}

LevelManager.prototype.fillCurrentLevelEntities = function(entityData) {

    this.currentLevelEntities = [];
    this.currentLevelEntitySprites = [];

    if (!entityData || entityData.length == 0) {
        return;
    }
    
    for (let i = 0; i < entityData.length; i++) {
        if (entityData[i].id == "Firepit") {
            firepit = new Firepit(entityData[i].x, entityData[i].y, 16, 16, 7, this)
            this.currentLevelEntities.push(firepit);
        }
        else if (entityData[i].id == "Chest") {
            chest = new Chest(entityData[i].x, entityData[i].y, 16, 16, 7, this)
            this.currentLevelEntities.push(chest);
        }

        //console.log(this.currentLevelEntities.length);

        this.currentLevelEntities[i].loadAnimations();
        this.currentLevelEntitySprites.push(this.currentLevelEntities[i].Sprite);
    }
}

LevelManager.prototype.fillCurrentLevelEnemies = function(enemyData) {

    this.currentLevelEnemies = [];
    this.currentLevelEnemySprites = [];

    if (!enemyData || enemyData.length == 0) {
        return;
    }
    
    for (let i = 0; i < enemyData.length; i++) {
        if (enemyData[i].id == "BuzzBlob") {
            buzzblob = new Buzzblob(enemyData[i].x, enemyData[i].y, 16, 16, 7, this)
            this.currentLevelEnemies.push(buzzblob);
        }
        // else if (enemyData[i].id == "Chest") {
        //     chest = new Chest(enemyData[i].x, enemyData[i].y, 16, 16, 7, this.map)
        //     this.currentLevelEnemies.push(chest);
        // }

        // console.log(this.currentLevelEnemies);

        this.currentLevelEnemies[i].loadAnimations();
        this.currentLevelEnemySprites.push(this.currentLevelEnemies[i].Sprite);
    }
}

LevelManager.prototype.updateSprites = function(deltaTime) {

    for (let i = 0; i < this.currentLevelEntities.length; i++) {
        this.currentLevelEntities[i].updateAnimation(this.map.collisionData);
    }

    for (let i = 0; i < this.currentLevelEntitySprites.length; i++) {
        this.currentLevelEntitySprites[i].update(deltaTime);
    }

    for (let i = 0; i < this.currentLevelEnemies.length; i++) {
        this.currentLevelEnemies[i].updateAnimation(this.map.collisionData);
    }

    for (let i = 0; i < this.currentLevelEnemySprites.length; i++) {
        this.currentLevelEnemySprites[i].update(deltaTime);
    }
}

LevelManager.prototype.drawSprites = function() {

    for (let i = 0; i < this.currentLevelEntitySprites.length; i++) {
        this.currentLevelEntitySprites[i].draw();
    }

    for (let i = 0; i < this.currentLevelEnemySprites.length; i++) {
        this.currentLevelEnemySprites[i].draw();
    }

}


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
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        return;  
    }
    else if (x == 1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].rightNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].rightNeighbor;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        return;  
    }
    else if (y == -1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].upNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].upNeighbor;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        return;  
    }
    else if (y == 1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].downNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].downNeighbor;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        return;  
    }

}



// Collision Handling
LevelManager.prototype.isCollision = function(x, y, requestingEntity) {
    const tileX = Math.floor(x / this.map.gridSize);
    const tileY = Math.floor(y / this.map.gridSize);

    // Check map collisions
    if (this.map.isBlocked(x, y)) return true;

    // Check other entities (except self)

    return false;
};
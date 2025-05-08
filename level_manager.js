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

LevelManager.prototype.addLink = function(link) {
    this.link = link;
}

LevelManager.prototype.addToolbar = function(toolbar) {
    this.toolbar = toolbar;
}

LevelManager.prototype.levelInitializer = function() // Sets the logic which level is next to which level
{
    // Left, Right, Up, Down
    this.levelList.push(new Level(0, 1, -1, 2, -1, this.map)); // Level 0 => Left=1, Up=2
    this.levelList.push(new Level(1, -1, 0, -1, -1, this.map)); // Level 1 => Right=0
    this.levelList.push(new Level(2, -1, -1, 3, 0, this.map)); // Level 2 => Down=0, Up=3
    this.levelList.push(new Level(3, 12, 4, -1, 2, this.map)); // Level 3 => Down =2, Left=12, Right=4, Up=?
    this.levelList.push(new Level(4, 3, -1, 5, -1, this.map)); // Level 4 => Left=3, Up=5
    this.levelList.push(new Level(5, -1, 6, 7, 4, this.map)); // Level 5 => Right=6, Up=7, Down=4
    this.levelList.push(new Level(6, 5, -1, -1, -1, this.map)); // Level 6 => Left=5
    this.levelList.push(new Level(7, 8, -1, -1, 5, this.map)); // Level 7 => Left=8, Down=5
    this.levelList.push(new Level(8, 9, 7, -1, -1, this.map)); // Level 8 => Left=9, Right=7
    this.levelList.push(new Level(9, 11, 8, -1, 10, this.map)); // Level 9 => Left=11, Right=8, Down=10
    this.levelList.push(new Level(10, -1, -1, 9, 12, this.map)); // Level 10 => Up=9, down=12
    this.levelList.push(new Level(11, -1, 9, 16, -1, this.map)); // Level 11 => Right=9, Up=16
    this.levelList.push(new Level(12, 13, 3, 10, -1, this.map)); // Level 12 => Left=3, Down=10
    this.levelList.push(new Level(13, -1, 12, -1, -1, this.map)); // Level 13 => Up=14
    this.levelList.push(new Level(14, -1, -1, -1, -1, this.map)); // Level 14 => Down=13
    this.levelList.push(new Level(15, -1, -1, -1, -1, this.map)); // Level 15 => Up=16
    this.levelList.push(new Level(16, -1, -1, -1, 11, this.map)); // Level 16 => Left=11, Down=15

}

LevelManager.prototype.fillCurrentLevelEntities = function(entityData) {

    this.currentLevelEntities = [];
    this.currentLevelEntitySprites = [];

    if (!entityData || entityData.length == 0) {
        return;
    }
    
    for (let i = 0; i < entityData.length; i++) {
        if (entityData[i].id == "Firepit") {
            firepit = new Firepit(entityData[i].x, entityData[i].y, 16, 16, 3, this)
            this.currentLevelEntities.push(firepit);
        }
        else if (entityData[i].id == "Chest") {
            chest = new Chest(entityData[i].x, entityData[i].y, 16, 16, 1, this)
            this.currentLevelEntities.push(chest);
        }
        else if (entityData[i].id == "FlowerStatue") {
            flowerStatue = new FlowerStatue(entityData[i].x, entityData[i].y, 16, 32, 1, this)
            this.currentLevelEntities.push(flowerStatue);
        }
        else if (entityData[i].id == "Flower") {
            if (this.link.hasFlower) continue;
            flower = new Flower(entityData[i].x, entityData[i].y, 16, 16, 1, this)
            this.currentLevelEntities.push(flower);
        }
        else if (entityData[i].id == "OldTree") {
            oldTree = new OldTree(entityData[i].x, entityData[i].y, 32, 32, 1, this)
            this.currentLevelEntities.push(oldTree);
        }
        else if (entityData[i].id == "Lantern") {
            if (this.link.hasLantern) continue;
            lantern = new Lantern(entityData[i].x, entityData[i].y, 9, 16, 1, this)
            this.currentLevelEntities.push(lantern);
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
            buzzblob = new Buzzblob(enemyData[i].x, enemyData[i].y, 16, 16, 4, this)
            this.currentLevelEnemies.push(buzzblob);
        }
        else if (enemyData[i].id == "Guard") {
            guard = new Guard(enemyData[i].x, enemyData[i].y, 16, 16, 5, this)
            this.currentLevelEnemies.push(guard);
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
    if (this.map.isBlocked(x, y, requestingEntity.Box.width, requestingEntity.Box.height)) return true;

    // Check collisions with other enemies (except the requesting entity)
    for (let i = 0; i < this.currentLevelEnemies.length; i++) {
        const enemy = this.currentLevelEnemies[i];

        // Skip the requesting entity itself
        if (enemy === requestingEntity) continue;

        // Check for bounding box collision
        if (
            x < enemy.Box.x + enemy.Box.width && 
            x + requestingEntity.Box.width > enemy.Box.x &&
            y < enemy.Box.y + enemy.Box.height && 
            y + requestingEntity.Box.height > enemy.Box.y 
        ) {
            return true; // Collision detected
        }
    }

    // Check collisions with other entities (except the requesting entity)
    for (let i = 0; i < this.currentLevelEntities.length; i++) {
        const entity = this.currentLevelEntities[i];

        // Skip the requesting entity itself
        if (entity === requestingEntity) continue;

        // Check for bounding box collision
        if (
            x < entity.Box.x + entity.Box.width &&  
            x + requestingEntity.Box.width > entity.Box.x &&
            y < entity.Box.y + entity.Box.height && 
            y + requestingEntity.Box.height > entity.Box.y 
        ) {
            return true; // Collision detected
        }
    }

    // Check collision with Link (if the requesting entity is not Link itself)
    if (this.link && requestingEntity !== this.link) {
        if (
            x < this.link.Box.x + this.link.Box.width && 
            x + requestingEntity.Box.width > this.link.Box.x && 
            y < this.link.Box.y + this.link.Box.height && 
            y + requestingEntity.Box.height > this.link.Box.y 
        ) {
            return true; // Collision detected with Link
        }
    }

    return false; // No collision
};
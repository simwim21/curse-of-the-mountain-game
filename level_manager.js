function LevelManager(map) {
    this.map = map;
    this.currentLevelEntities = []; // Immovable (interactable) objects in thw world
    this.currentLevelEntitySprites = [];

    this.currentLevelEnemies = []; // Enemies in the world
    this.currentLevelEnemySprites = [];

    this.currentLevelDropItems = []; // Items dropped by enemies
    this.currentLevelDropItemSprites = [];
    
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

    this.door1opened = false;
    this.door2opened = false;
    this.walllevel7opened = false;
    this.buttonPressed = false;

    
}

LevelManager.prototype.addLink = function(link) {
    this.link = link;
}

LevelManager.prototype.addToolbar = function(toolbar) {
    this.toolbar = toolbar;
}

LevelManager.prototype.addSoundManager = function(soundManager)
{
    this.soundManager = soundManager;
}

LevelManager.prototype.levelInitializer = function() // Sets the logic which level is next to which level
{
    // Left, Right, Up, Down
    this.levelList.push(new Level(0, 1, -1, 2, -1, this.map)); // Level 0 => Left=1, Up=2
    this.levelList.push(new Level(1, -1, 0, -1, -1, this.map)); // Level 1 => Right=0
    this.levelList.push(new Level(2, -1, -1, 3, 0, this.map)); // Level 2 => Down=0, Up=3
    this.levelList.push(new Level(3, 12, 4, 17, 2, this.map)); // Level 3 => Down =2, Left=12, Right=4, Up=17(Boss1)
    this.levelList.push(new Level(4, 3, -1, 5, -1, this.map)); // Level 4 => Left=3, Up=5
    this.levelList.push(new Level(5, -1, 6, 7, 4, this.map)); // Level 5 => Right=6, Up=7, Down=4
    this.levelList.push(new Level(6, 5, -1, -1, -1, this.map)); // Level 6 => Left=5
    this.levelList.push(new Level(7, 8, 18, -1, 5, this.map)); // Level 7 => Left=8, Down=5
    this.levelList.push(new Level(8, 9, 7, -1, -1, this.map)); // Level 8 => Left=9, Right=7
    this.levelList.push(new Level(9, 11, 8, -1, 10, this.map)); // Level 9 => Left=11, Right=8, Down=10
    this.levelList.push(new Level(10, -1, -1, 9, 12, this.map)); // Level 10 => Up=9, down=12
    this.levelList.push(new Level(11, -1, 9, 16, -1, this.map)); // Level 11 => Right=9, Up=16
    this.levelList.push(new Level(12, 13, 3, 10, -1, this.map)); // Level 12 => Left=3, Down=10
    this.levelList.push(new Level(13, -1, 12, -1, -1, this.map)); // Level 13 => Up=14
    this.levelList.push(new Level(14, -1, -1, -1, -1, this.map)); // Level 14 => Down=13
    this.levelList.push(new Level(15, -1, -1, -1, -1, this.map)); // Level 15 => Up=16
    this.levelList.push(new Level(16, -1, -1, -1, 11, this.map)); // Level 16 => Left=11, Down=15
    this.levelList.push(new Level(17, -1, -1, -1, 3, this.map)); // Level 17 => Down=3
    this.levelList.push(new Level(18, 7, -1, -1, -1, this.map)); // Level 18 => Left = 7
    
    this.levelList.push(new Level(19, -1, -1, 20, -1, this.map)); // Level 19 => Up=20
    this.levelList.push(new Level(20, 21, -1, -1, 19, this.map)); // Level 20 => Down=19
    this.levelList.push(new Level(21, -1, 20, -1, -1, this.map)); // Level 21 => Up=22

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
            if (this.link.hasKey1) {
                oldTree.Sprite.setAnimation(HAPPY_OLD_TREE);;
            }
        }
        else if (entityData[i].id == "Lantern") {
            if (this.link.hasLantern) continue;
            lantern = new Lantern(entityData[i].x, entityData[i].y, 9, 16, 1, this)
            this.currentLevelEntities.push(lantern);
        }
        else if (entityData[i].id == "Door") {
            if (this.map.currentLevelIndex == 3) {
                door = new Door(entityData[i].x, entityData[i].y, 32, 16, 1, this)
                if (this.door1opened) {
                    door.Sprite.setAnimation(DOOR_OPENED);
                    door.Box.x = 0;
                    door.Box.y = 0;
                    door.Sprite.x = -100;
                    door.Sprite.y = -100;
                } else {
                    door.Sprite.setAnimation(DOOR_CLOSED);
                }
                this.currentLevelEntities.push(door);
            }
            else if (this.map.currentLevelIndex == 11) {
                door = new Door(entityData[i].x, entityData[i].y, 32, 16, 1, this)
                if (this.door2opened) {
                    door.Sprite.setAnimation(DOOR_OPENED);
                    door.Box.x = 0;
                    door.Box.y = 0;
                    door.Sprite.x = -100;
                    door.Sprite.y = -100;
                } else {
                    door.Sprite.setAnimation(DOOR_CLOSED);
                }
                this.currentLevelEntities.push(door);
            }

        }
        else if (entityData[i].id == "DestructableWall") {
            destructableWall = new DestructableWall(entityData[i].x, entityData[i].y, 16, 16, 1, this)
            if (this.walllevel7opened) {
                destructableWall.Box.x = 0;
                destructableWall.Box.y = 0;
                destructableWall.Sprite.x = -100;
                destructableWall.Sprite.y = -100;
            }
            else {
                destructableWall.Sprite.setAnimation(WALL_CLOSED);
            }
            this.currentLevelEntities.push(destructableWall);
        }
        else if (entityData[i].id == "Button") {
            button = new Button(entityData[i].x, entityData[i].y, 16, 16, 1, this);
            this.currentLevelEntities.push(button);
        }
        else if (entityData[i].id == "Dummy") {
            dummy = new Dummy(entityData[i].x, entityData[i].y, 16, 16, 1, this);
            this.currentLevelEntities.push(dummy);
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
            guard = new Guard(enemyData[i].x, enemyData[i].y, 17, 18, 4, this)
            this.currentLevelEnemies.push(guard);
        }
        else if (enemyData[i].id == "Bat") {
            bat = new Bat(enemyData[i].x, enemyData[i].y, 16, 16, 4, this)
            this.currentLevelEnemies.push(bat);
        }

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

    for (let i = 0; i < this.currentLevelDropItems.length; i++) {
        this.currentLevelDropItems[i].updateAnimation(this.map.collisionData, this.currentLevelEntities);
    }
    for (let i = 0; i < this.currentLevelDropItemSprites.length; i++) {
        this.currentLevelDropItemSprites[i].update(deltaTime);
    }
}

LevelManager.prototype.drawSprites = function() {

    for (let i = 0; i < this.currentLevelEntitySprites.length; i++) {
        this.currentLevelEntitySprites[i].draw();
    }

    for (let i = 0; i < this.currentLevelEnemies.length; i++) {
        this.currentLevelEnemies[i].draw();
    }
    for (let i = 0; i < this.currentLevelDropItemSprites.length; i++) {
        this.currentLevelDropItemSprites[i].draw();
    }

}


LevelManager.prototype.changeLevel = function(x, y, newLevel = 0)
{

    if (newLevel !== 0) {
        this.map.renderLevel(newLevel);
        this.map.currentLevelIndex = newLevel;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        this.currentLevelDropItems = [];
        this.currentLevelDropItemSprites = [];
        return;  
    }

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
        this.currentLevelDropItems = [];
        this.currentLevelDropItemSprites = [];
        return;  
    }
    else if (x == 1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].rightNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].rightNeighbor;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        this.currentLevelDropItems = [];
        this.currentLevelDropItemSprites = [];
        return;  
    }
    else if (y == -1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].upNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].upNeighbor;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        this.currentLevelDropItems = [];
        this.currentLevelDropItemSprites = [];
        return;  
    }
    else if (y == 1) {
        this.map.renderLevel(this.levelList[this.map.currentLevelIndex].downNeighbor);
        this.map.currentLevelIndex = this.levelList[this.map.currentLevelIndex].downNeighbor;
        this.fillCurrentLevelEntities(this.map.entityData);
        this.fillCurrentLevelEnemies(this.map.enemyData);
        this.currentLevelDropItems = [];
        this.currentLevelDropItemSprites = [];
        return;  
    }

}



// Collision Handling
LevelManager.prototype.isCollision = function(x, y, requestingEntity) {

    // 1. Check map collisions
    if (this.map.isBlocked(x, y, requestingEntity.Box.width, requestingEntity.Box.height)) return true;


    // 2. Check collision with Link (if the requesting entity is not Link itself)
    if (this.link && requestingEntity !== this.link) {
        if (
            x - 1 < this.link.Box.x + this.link.Box.width && 
            x + requestingEntity.Box.width + 1 > this.link.Box.x && 
            y - 1 < this.link.Box.y + this.link.Box.height && 
            y + requestingEntity.Box.height + 1 > this.link.Box.y 
        ) {
            return true; // Collision detected with Link
        }
    }

    // 3. Check collisions with other enemies (except the requesting entity)
    for (let i = 0; i < this.currentLevelEnemies.length; i++) {
        const enemy = this.currentLevelEnemies[i];

        // Skip the requesting entity itself
        if (enemy === requestingEntity) continue;

        // Check for bounding box collision with enemy itself
        if (
            x < enemy.Box.x + enemy.Box.width && 
            x + requestingEntity.Box.width > enemy.Box.x &&
            y < enemy.Box.y + enemy.Box.height && 
            y + requestingEntity.Box.height > enemy.Box.y 
        ) {
            if (requestingEntity instanceof Link) {
                this.link.handleDamage(enemy.Box);
            }
            return true;
        }

        // --- NEW: Check for collision with guard's spear if visible ---
        if (enemy.spearSprite && enemy.spearSprite.visible) {
            // Calculate spear hitbox based on current keyframe
            const spearAnim = enemy.spearSprite.animations[enemy.spearSprite.currentAnimation];
            const spearKeyframe = spearAnim[enemy.spearSprite.currentKeyframe];
            const spearX = enemy.spearSprite.x + (spearKeyframe.ox || 0);
            const spearY = enemy.spearSprite.y + (spearKeyframe.oy || 0);
            const spearW = spearKeyframe.sw;
            const spearH = spearKeyframe.sh;

            if (
                x < spearX + spearW &&
                x + requestingEntity.Box.width > spearX &&
                y < spearY + spearH &&
                y + requestingEntity.Box.height > spearY
            ) {
                if (requestingEntity instanceof Link) {
                    this.link.handleDamage({ x: spearX, y: spearY, width: spearW, height: spearH });
                }
                return true;
            }
        }
    }

    // 4. Check collisions with other entities (except the requesting entity)
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

    return false; // No collision
};
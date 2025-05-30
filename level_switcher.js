function LevelSwitcher(map, levelManager) {
    this.map = map;
    this.levelManager = levelManager
}

LevelSwitcher.prototype.switch = function(oldLevel, newLevel, direction) {

    switch (direction) {

        case "LEFT":
            // Level switch logic to the left
            this.map.renderLevel(newLevel);
            this.map.currentLevelIndex = newLevel;
            this.levelManager.fillCurrentLevelEntities(this.map.entityData);
            this.levelManager.fillCurrentLevelEnemies(this.map.enemyData);
            this.levelManager.currentLevelDropItems = [];
            this.levelManager.currentLevelDropItemSprites = [];
            this.levelManager.checkDarkness();
            return;

        case "RIGHT":
            // Level switch logic to the right
            this.map.renderLevel(newLevel);
            this.map.currentLevelIndex = newLevel;
            this.levelManager.fillCurrentLevelEntities(this.map.entityData);
            this.levelManager.fillCurrentLevelEnemies(this.map.enemyData);
            this.levelManager.currentLevelDropItems = [];
            this.levelManager.currentLevelDropItemSprites = [];
            this.levelManager.checkDarkness();
            return;

        case "UP":
            // Level switch logic upwards
            this.map.renderLevel(newLevel);
            this.map.currentLevelIndex = newLevel;
            this.levelManager.fillCurrentLevelEntities(this.map.entityData);
            this.levelManager.fillCurrentLevelEnemies(this.map.enemyData);
            this.levelManager.currentLevelDropItems = [];
            this.levelManager.currentLevelDropItemSprites = [];
            this.levelManager.checkDarkness();
            return;

        case "DOWN":
            // Level switch logic downwards
            this.map.renderLevel(newLevel);
            this.map.currentLevelIndex = newLevel;
            this.levelManager.fillCurrentLevelEntities(this.map.entityData);
            this.levelManager.fillCurrentLevelEnemies(this.map.enemyData);
            this.levelManager.currentLevelDropItems = [];
            this.levelManager.currentLevelDropItemSprites = [];
            this.levelManager.checkDarkness();
            return;
            
    }

}
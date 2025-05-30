function LevelSwitcher(map, levelManager) {
    this.map = map;
    this.levelManager = levelManager
    
    this.progress = 0;
    this.duration = 0;
}

LevelSwitcher.prototype.switch = function(oldLevel, newLevel, direction) {
    // 1. Determine offset direction
    let dx = 0, dy = 0;
    if (direction === "LEFT") dx = 160;
    if (direction === "RIGHT") dx = -160;
    if (direction === "UP") dy = 128;
    if (direction === "DOWN") dy = -128;

    // 2. Render new level offscreen

    this.map.transitioning = true;
    this.map.transitionOldLevel = oldLevel;
    this.map.transitionNewLevel = newLevel;
    this.map.transitionOffsetX = 0;
    this.map.transitionOffsetY = 0;

    // 3. Start transition
    this.levelManager.isTransitioning = true;
    this.progress = 0;
    this.duration = 32; // frames (adjust for speed)
    this.stepX = dx / this.duration;
    this.stepY = dy / this.duration;

    // Store original Link position
    const link = this.levelManager.link;
    this.linkOriginalX = link.Sprite.x;
    this.linkOriginalY = link.Sprite.y;

    // Calculate Link's walk direction (move full screen minus 16px)
    let linkTotalMoveX = 0, linkTotalMoveY = 0;
    if (direction === "LEFT") linkTotalMoveX = -20;
    if (direction === "RIGHT") linkTotalMoveX = +20;
    if (direction === "UP") linkTotalMoveY = -20;
    if (direction === "DOWN") linkTotalMoveY = +20;
    this.linkStepX = linkTotalMoveX / this.duration;
    this.linkStepY = linkTotalMoveY / this.duration;

    // Disable input
    link.isTransitioning = true;

    this.animateTransition(direction);
};

LevelSwitcher.prototype.animateTransition = function(direction) {
    this.progress++;
    // Move camera
    this.map.offsetX += this.stepX;
    this.map.offsetY += this.stepY;
    // Track transition offset for dual rendering
    this.map.transitionOffsetX += this.stepX;
    this.map.transitionOffsetY += this.stepY;

    // Animate Link's position
    const link = this.levelManager.link;
    link.Sprite.x = this.linkOriginalX + this.linkStepX * this.progress;
    link.Sprite.y = this.linkOriginalY + this.linkStepY * this.progress;

    if (this.progress < this.duration) {
        requestAnimationFrame(this.animateTransition.bind(this, direction));
    } else {
        // Snap Link to final position at the edge of the new level
        if (direction === "LEFT") {
            link.Sprite.x = 142; // right edge
        } else if (direction === "RIGHT") {
            link.Sprite.x = 1; // left edge
        } else if (direction === "UP") {
            link.Sprite.y = 110; // bottom edge
        } else if (direction === "DOWN") {
            link.Sprite.y = 1; // top edge
        }
        // If you have a Box or collision box, update it too:
        if (link.Box) {
            link.Box.x = link.Sprite.x + 3;
            link.Box.y = link.Sprite.y + 1;
        }

        // 4. Finish transition
        this.map.currentLevelIndex = this.map.transitionNewLevel;
        this.levelManager.currentLevelDropItems = [];
        this.levelManager.currentLevelDropItemSprites = [];
        this.levelManager.checkDarkness();
        // Reset camera offset and transition state
        this.map.offsetX = 0;
        this.map.offsetY = 0;
        this.map.transitioning = false;
        this.levelManager.link.isTransitioning = false;
    }
};
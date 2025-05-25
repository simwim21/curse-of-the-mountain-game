WALL_CLOSED = 0;
WALL_OPENED = 1;

// WALL

function DestructableWall(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection
    this.health = 1;

}

DestructableWall.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(WALL_CLOSED, [899, 538, 16, 16]);

    this.Sprite.setAnimation(WALL_CLOSED);


}

DestructableWall.prototype.updateAnimation = function(collisionData) {
    this.checkDestruction();
    return;
}

DestructableWall.prototype.checkDestruction = function() {
    // Only allow damage if not already destroyed
    if (this.health <= 0) return;

    const link = this.levelManager.link;

    // Check if Link is attacking (swinging sword)
    const isAttacking =
        link.Sprite.currentAnimation === LINK_SWING_LEFT ||
        link.Sprite.currentAnimation === LINK_SWING_RIGHT ||
        link.Sprite.currentAnimation === LINK_SWING_UP ||
        link.Sprite.currentAnimation === LINK_SWING_DOWN;

    if (!isAttacking) return;

    // Define the sword's attack rectangle based on direction
    const linkBox = link.Box;
    let attackRect = { x: 0, y: 0, width: 0, height: 0 };

    const swordRange = 16;
    const swordWidth = linkBox.width;
    const swordHeight = linkBox.height;

    switch (link.Sprite.currentAnimation) {
        case LINK_SWING_LEFT:
            attackRect.x = linkBox.x - swordRange;
            attackRect.y = linkBox.y - swordRange;
            attackRect.width = swordRange + swordWidth;
            attackRect.height = swordHeight + swordRange;
            break;
        case LINK_SWING_RIGHT:
            attackRect.x = linkBox.x + linkBox.width;
            attackRect.y = linkBox.y;
            attackRect.width = swordRange + swordWidth;
            attackRect.height = swordHeight + swordRange;
            break;
        case LINK_SWING_UP:
            attackRect.x = linkBox.x;
            attackRect.y = linkBox.y - swordRange;
            attackRect.width = swordWidth + swordRange;
            attackRect.height = swordRange + swordHeight;
            break;
        case LINK_SWING_DOWN:
            attackRect.x = linkBox.x - swordRange;
            attackRect.y = linkBox.y + linkBox.height;
            attackRect.width = swordWidth + swordRange;
            attackRect.height = swordRange + swordHeight;
            break;
    }

    // Check if wall's box overlaps with the attack rectangle (AABB collision)
    const wallBox = this.Box;
    const overlap =
        wallBox.x < attackRect.x + attackRect.width &&
        wallBox.x + wallBox.width > attackRect.x &&
        wallBox.y < attackRect.y + attackRect.height &&
        wallBox.y + wallBox.height > attackRect.y;

    if (!overlap) return;

    // Reduce health and trigger destruction logic
    console.log("DestructableWall hit by Link's sword!");
    this.levelManager.soundManager.playSound("stones");
    this.health -= 1;

    if (this.health <= 0) {
        // Remove from entities and sprites arrays (like Bat)
        const idx = this.levelManager.currentLevelEntities.indexOf(this);
        this.levelManager.walllevel7opened = true;
        if (idx !== -1) {
            this.levelManager.currentLevelEntities.splice(idx, 1);
            this.levelManager.currentLevelEntitySprites.splice(idx, 1);
        }
        // Optionally set animation or play effect here
    }
};
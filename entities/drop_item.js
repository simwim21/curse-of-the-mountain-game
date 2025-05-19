IS_HEALTH = 0;
IS_RUPEE = 1;

// DropItem

function DropItem(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/items/Weapons_Items_HUD.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.identity = Math.floor(Math.random() * 2);

    this.startPos = { x: x, y: y };
    this.startTime = 0;

}

DropItem.prototype.loadAnimations = function() 
{
    if (this.identity == IS_HEALTH) {
        this.Sprite.addAnimation();
        this.Sprite.addKeyframe(0, [166, 30, 8, 8]);
    }
    else if (this.identity == IS_RUPEE) {
        this.Sprite.addAnimation();
        this.Sprite.addKeyframe(0, [175, 22, 8, 16]);
    }
    this.Sprite.setAnimation(0);
}

DropItem.prototype.findValidLandingPosition = function(collisionData, entities) {
    // Try to find a nearby valid position (spiral outwards)
    const maxRadius = 30; 
    const step = 2;
    const w = this.Sprite.width;
    const h = this.Sprite.height;

    for (let r = 0; r <= maxRadius; r += step) {
        for (let dx = -r; dx <= r; dx += step) {
            for (let dy = -r; dy <= r; dy += step) {
                // Only check the edge of the square (spiral)
                if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
                let tx = this.startPos.x + dx;
                let ty = this.startPos.y + dy;

                // Check collision with walls
                let blocked = false;
                for (let obj of collisionData || []) {
                    const tileSize = this.levelManager.map.collisionGridSize || 8;
                    if (
                        tx < obj.x + tileSize &&
                        tx + w > obj.x &&
                        ty < obj.y + tileSize &&
                        ty + h > obj.y
                    ) {
                        blocked = true;
                        break;
                    }
                }
                if (blocked) continue;

                // Check collision with entities
                let entityBlocked = false;
                for (let ent of entities || []) {
                    if (!ent.Box) continue;
                    if (
                        tx < ent.Box.x + ent.Box.width &&
                        tx + w > ent.Box.x &&
                        ty < ent.Box.y + ent.Box.height &&
                        ty + h > ent.Box.y
                    ) {
                        entityBlocked = true;
                        break;
                    }
                }
                if (entityBlocked) continue;

                // Found a valid position
                return { x: tx, y: ty };
            }
        }
    }
    // If nothing found, just return startPos
    return { x: this.startPos.x, y: this.startPos.y };
};

DropItem.prototype.updateAnimation = function(collisionData, entities) {
    // Only calculate landing position once
    if (!this._landingPos) {
        this._landingPos = this.findValidLandingPosition(collisionData, entities);
    }

    if (this.landed) return;

    // Move 1px per frame towards landing position
    let dx = this._landingPos.x - this.Sprite.x;
    let dy = this._landingPos.y - this.Sprite.y;
    let moveX = 0, moveY = 0;

    if (Math.abs(dx) > 0) moveX = dx > 0 ? 1 : -1;
    if (Math.abs(dy) > 0) moveY = dy > 0 ? 1 : -1;

    this.Sprite.x += moveX;
    this.Sprite.y += moveY;

    // Land if at target
    if (this.Sprite.x === this._landingPos.x && this.Sprite.y === this._landingPos.y) {
        this.landed = true;
    }
}
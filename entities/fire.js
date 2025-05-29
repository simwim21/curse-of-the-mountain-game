// Fire Statue

function Fire(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/bosses.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x + 4, y + 4, width - 8, height - 8); // Create a box for collision detection
    
    this.id = "Undefined";

}

Fire.prototype.setId = function(id) {
    this.id = id;
}

Fire.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [437, 11, 16, 16]);

    this.Sprite.setAnimation(0);
}

Fire.prototype.updateAnimation = function(collisionData) {
    // Calculate direction to Link (only once, store as velocity)
    if (!this._initialized) {
        const link = this.levelManager.link;
        const linkBox = link.Box;
        // Start position (center of fireball)
        const startX = this.Sprite.x + this.Sprite.width / 2;
        const startY = this.Sprite.y + this.Sprite.height / 2;
        // Target position (center of Link)
        const targetX = linkBox.x + linkBox.width / 2;
        const targetY = linkBox.y + linkBox.height / 2;
        // Direction vector
        const dx = targetX - startX;
        const dy = targetY - startY;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;
        // Set velocity (speed: 2px per frame)
        this._vx = (dx / length) * 2;
        this._vy = (dy / length) * 2;
        // Track distance travelled
        this._travelled = 0;
        this._initialized = true;
    }

    // Move fireball
    this.Sprite.x += this._vx / 2;
    this.Sprite.y += this._vy / 2;
    this.Box.x += this._vx / 2 ;
    this.Box.y += this._vy / 2;
    this._travelled += Math.sqrt(this._vx * this._vx + this._vy * this._vy);

    // Remove if travelled more than 100 pixels
    if (this._travelled > 150) {
        for (let i = 0; i < this.levelManager.currentLevelEntities.length; i++) {
            if (this === this.levelManager.currentLevelEntities[i]) {
                this.levelManager.currentLevelEntities.splice(i, 1);
                this.levelManager.currentLevelEntitySprites.splice(i, 1);
                break;
            }
        }
        return;
    }

    // Damage Link if hit
    this.levelManager.link.handleDamage(this.Box);
};
const BUZZBLOB_STAND = 0;
const BUZZBLOB_WALK = 1;

const BUZZBLOB_HURT = 2;

// Buzzblob

function Buzzblob(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/minor_enemies.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x + 4, y + 3, 8, 13); // Create a box for collision detection

    this.currentHealth = 3;
    this.maxHealth = 3;

    this.sound = AudioFX("sounds/buzzblob_sound.mp3");

}

Buzzblob.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BUZZBLOB_STAND, [285, 21, 16, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BUZZBLOB_WALK, [285, 21, 16, 16]);
    this.Sprite.addKeyframe(BUZZBLOB_WALK, [302, 21, 16, 16],true);
    this.Sprite.addKeyframe(BUZZBLOB_WALK, [285, 21, 16, 16]);
    this.Sprite.addKeyframe(BUZZBLOB_WALK, [302, 21, 16, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BUZZBLOB_HURT, [319, 21, 16, 16]);


    this.Sprite.setAnimation(BUZZBLOB_WALK);

    this.direction = -1;
    this.counter = 0;
}

Buzzblob.prototype.updateAnimation = function()
{

    this.checkHurtbox();

    if (this.Sprite.currentAnimation == BUZZBLOB_HURT) return;

    if (this.counter % 120 == 0)
    {
        this.direction = Math.floor(Math.random() * 4);
        this.counter = 0;
    }

    if (this.counter % 8 == 0) {
        if (this.direction == 0 && this.Sprite.x >= 1)
        {
            if (!this.levelManager.isCollision(this.Box.x - 1, this.Box.y, this)) {
                this.Sprite.x -= 1;
                this.Box.x -= 1;
            }
        }
        else if (this.direction == 1 && this.Sprite.x < 144)
        {
            if (!this.levelManager.isCollision(this.Box.x + 1, this.Box.y, this)) {
                this.Sprite.x += 1;
                this.Box.x += 1;
            }
        }
        else if (this.direction == 2 && this.Sprite.y >= 1)
        {
            if (!this.levelManager.isCollision(this.Box.x, this.Box.y - 1, this)) {
                this.Sprite.y -= 1;
                this.Box.y -= 1;
            }
        }
        else if (this.direction == 3 && this.Sprite.y < 112)
        {
            if (!this.levelManager.isCollision(this.Box.x, this.Box.y + 1, this)) {
                this.Sprite.y += 1;
                this.Box.y += 1;
            }
        }
    }
    this.counter++;
}

Buzzblob.prototype.checkHurtbox = function() {
    // Only allow damage if not already hurting
    if (this._isHurting) return;

    const link = this.levelManager.link;

    // Check if Link is attacking (swinging sword)
    const isAttacking =
        link.Sprite.currentAnimation === LINK_SWING_LEFT ||
        link.Sprite.currentAnimation === LINK_SWING_RIGHT ||
        link.Sprite.currentAnimation === LINK_SWING_UP ||
        link.Sprite.currentAnimation === LINK_SWING_DOWN;

    if (!isAttacking) return;

    // Check if Buzzblob is in front of Link based on direction
    let inFront = false;
    const linkBox = link.Box;
    const buzzBox = this.Box;

    switch (link.Sprite.currentAnimation) {
        case LINK_SWING_LEFT:
            // Buzzblob must be left of Link, within 16px, and overlap vertically
            inFront =
                buzzBox.x + buzzBox.width <= linkBox.x &&
                buzzBox.x + buzzBox.width >= linkBox.x - 16 &&
                buzzBox.y < linkBox.y + linkBox.height &&
                buzzBox.y + buzzBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_RIGHT:
            // Buzzblob must be right of Link, within 16px, and overlap vertically
            inFront =
                buzzBox.x >= linkBox.x + linkBox.width &&
                buzzBox.x <= linkBox.x + linkBox.width + 16 &&
                buzzBox.y < linkBox.y + linkBox.height &&
                buzzBox.y + buzzBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_UP:
            // Buzzblob must be above Link, within 16px, and overlap horizontally
            inFront =
                buzzBox.y + buzzBox.height <= linkBox.y &&
                buzzBox.y + buzzBox.height >= linkBox.y - 16 &&
                buzzBox.x < linkBox.x + linkBox.width + 16 &&
                buzzBox.x + buzzBox.width > linkBox.x;
            break;
        case LINK_SWING_DOWN:
            // Buzzblob must be below Link, within 16px, and overlap horizontally
            inFront =
                buzzBox.y >= linkBox.y + linkBox.height &&
                buzzBox.y <= linkBox.y + linkBox.height + 16 &&
                buzzBox.x < linkBox.x + linkBox.width &&
                buzzBox.x + buzzBox.width > linkBox.x - 16;
            break;
    }

    if (!inFront) return;

    // 2. Reduce health by 1
    this.currentHealth -= 1;
    this.sound.play();

    // 3. Knockback: move away from Link's center by 20px, smoothly, but stop if collision occurs
    const buzz = this;
    const buzzCenterX = this.Box.x + this.Box.width / 2;
    const buzzCenterY = this.Box.y + this.Box.height / 2;
    const linkCenterX = link.Box.x + link.Box.width / 2;
    const linkCenterY = link.Box.y + link.Box.height / 2;

    // Calculate knockback direction
    let dx = buzzCenterX - linkCenterX;
    let dy = buzzCenterY - linkCenterY;
    let length = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= length;
    dy /= length;

    // Knockback distance and frames
    const knockbackDistance = 20;
    const knockbackFrames = 10;
    let frame = 0;

    // Ensure move per frame is always an integer (at least 1 or -1 if direction exists)
    let movePerFrameX = Math.round(dx * (knockbackDistance / knockbackFrames));
    let movePerFrameY = Math.round(dy * (knockbackDistance / knockbackFrames));
    if (movePerFrameX === 0 && dx !== 0) movePerFrameX = dx > 0 ? 1 : -1;
    if (movePerFrameY === 0 && dy !== 0) movePerFrameY = dy > 0 ? 1 : -1;

    // Set hurt animation and prevent multiple hits
    this.Sprite.setAnimation(BUZZBLOB_HURT);
    this._isHurting = true;

    function animateKnockback() {
        if (frame < knockbackFrames) {
            // Predict next position
            const nextX = buzz.Box.x + movePerFrameX;
            const nextY = buzz.Box.y + movePerFrameY;

            // Check collision with map and entities
            const collision = buzz.levelManager.isCollision(nextX, nextY, buzz);

            if (!collision) {
                buzz.Sprite.x += movePerFrameX;
                buzz.Sprite.y += movePerFrameY;
                buzz.Box.x += movePerFrameX;
                buzz.Box.y += movePerFrameY;
                frame++;
                requestAnimationFrame(animateKnockback);
            }
            // If collision, stop knockback immediately
        }
    }
    animateKnockback();

    // After 750ms, restore animation and allow new hits
    setTimeout(() => {
        if (buzz.currentHealth > 0) {
            buzz.Sprite.setAnimation(BUZZBLOB_WALK);
            buzz._isHurting = false;
        }
    }, 750);

    // 4. If health is now 0, remove from level manager and drop item
    if (this.currentHealth <= 0) {
        // Remove from enemies and sprites arrays
        const idx = this.levelManager.currentLevelEnemies.indexOf(this);
        if (idx !== -1) {
            this.levelManager.currentLevelEnemies.splice(idx, 1);
            this.levelManager.currentLevelEnemySprites.splice(idx, 1);
        }
        // Drop item
        const drop = new DropItem(this.Sprite.x, this.Sprite.y, 8, 16, 1, this.levelManager);
        drop.loadAnimations();
        drop.findValidLandingPosition(this.levelManager.map.collisionData, this.levelManager.currentLevelEntities);
        this.levelManager.currentLevelDropItems.push(drop);
        this.levelManager.currentLevelDropItemSprites.push(drop.Sprite);
    }
};


Buzzblob.prototype.draw = function()
{
    // Save original position
    const origX = this.Sprite.x;
    const origY = this.Sprite.y;
    
    // Offset for camera
    this.Sprite.x += this.levelManager.map.offsetX;
    this.Sprite.y += this.levelManager.map.offsetY;
    
    // Draw
    this.Sprite.draw();
    
    // Restore
    this.Sprite.x = origX;
    this.Sprite.y = origY;
}

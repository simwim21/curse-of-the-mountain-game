const GUARD_STAND = 0;
const GUARD_WALK_LEFT = 1;
const GUARD_WALK_RIGHT = 2;
const GUARD_WALK_UP = 3;
const GUARD_WALK_DOWN = 4;

const GUARD_ATTACK_LEFT = 5;
const GUARD_ATTACK_RIGHT = 6;
const GUARD_ATTACK_UP = 7;
const GUARD_ATTACK_DOWN = 8;

const SPEAR_LEFT = 0;
const SPEAR_RIGHT = 1;
const SPEAR_UP = 2;
const SPEAR_DOWN = 3;




// Guard

function Guard(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/soldier2.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);
    this.spearSprite = new Sprite(x, y, width, height, fps, this.texture);
    this.spearSprite.visible = false; // Spear visibility flag

    this.levelManager = world;

    this.Box = new Box(x + 4, y + 4, 9, 14); // Create a box for collision detection

    this.maxHealth = 4;
    this.currentHealth = this.maxHealth;

    this.hurtsound = AudioFX("sounds/guard_hurt.wav");
}

Guard.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_STAND, [129, 10, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_LEFT, [91, 35, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_LEFT, [110, 35, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_RIGHT, [130, 35, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_RIGHT, [149, 35, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_UP, [111, 58, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_UP, [131, 58, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_DOWN, [90, 10, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_DOWN, [109, 10, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_LEFT, [84, 136, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_LEFT, [116, 136, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_RIGHT, [83, 159, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_RIGHT, [115, 159, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_UP, [122, 97, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_UP, [143, 97, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_DOWN, [83, 97, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_DOWN, [102, 97, 17, 18]);


    this.Sprite.setAnimation(GUARD_STAND);

    this.spearSprite.addAnimation();
    this.spearSprite.addKeyframe(SPEAR_LEFT, [72, 147, 13, 5],false, -13, 11);

    this.spearSprite.addAnimation();
    this.spearSprite.addKeyframe(SPEAR_RIGHT, [99, 170, 13, 5], false, 16, 11);

    this.spearSprite.addAnimation();
    this.spearSprite.addKeyframe(SPEAR_UP, [134, 91, 5, 6], false, 12, -6);

    this.spearSprite.addAnimation();
    this.spearSprite.addKeyframe(SPEAR_DOWN, [83, 115, 5, 12], false, 0, 16);

}

Guard.prototype.updateAnimation = function () {
    this.checkHurtbox();

    // --- Attack timer logic ---
    if (this._attackCooldown === undefined) this._attackCooldown = 0;
    if (this._attackCooldown > 0) this._attackCooldown--;

    const link = this.levelManager.link; // Reference to Link
    const guardCenterX = this.Sprite.x + this.Sprite.width / 2;
    const guardCenterY = this.Sprite.y + this.Sprite.height / 2;
    const linkCenterX = link.Sprite.x + link.Sprite.width / 2;
    const linkCenterY = link.Sprite.y + link.Sprite.height / 2;

    const distanceX = linkCenterX - guardCenterX;
    const distanceY = linkCenterY - guardCenterY;

    const attackRange = 20; // Distance at which the guard attacks
    const speed = 1; // Movement speed of the guard

    // Determine if the guard is close enough to attack
    const isAttacking = Math.abs(distanceX) <= attackRange && Math.abs(distanceY) <= attackRange;

    // Smooth animation changes
    if (!this.animationTimer || this.animationTimer <= 0) {
        this.animationTimer = 5; // Delay animation changes for 5 frames

        // Movement and attack logic
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
            if (distanceX > 0) {
                // Move or attack right
                if (!this.levelManager.isCollision(this.Box.x + speed, this.Box.y, this)) {
                    this.Sprite.x += speed;
                    this.Box.x += speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_RIGHT && isAttacking && this._attackCooldown === 0) {
                    this.Sprite.setAnimation(GUARD_ATTACK_RIGHT);
                    this.spearSprite.setAnimation(SPEAR_RIGHT);
                    this.spearSprite.x = this.Sprite.x;
                    this.spearSprite.y = this.Sprite.y;
                    this.spearSprite.visible = true;
                    this._attackCooldown = 60; // 60 frames = 1 second at 60fps
                    this.levelManager.link.handleDamage(this.spearSprite);
                    this.levelManager.link.handleDamage(this.Box);
                }
                else if (this.Sprite.currentAnimation != GUARD_WALK_RIGHT) {
                    this.Sprite.setAnimation(GUARD_WALK_RIGHT);
                    this.spearSprite.visible = false;
                }
                
            } else {
                // Move or attack left
                if (!this.levelManager.isCollision(this.Box.x - speed, this.Box.y, this)) {
                    this.Sprite.x -= speed;
                    this.Box.x -= speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_LEFT && isAttacking && this._attackCooldown === 0) {
                    this.Sprite.setAnimation(GUARD_ATTACK_LEFT);
                    this.spearSprite.setAnimation(SPEAR_LEFT);
                    this.spearSprite.x = this.Sprite.x;
                    this.spearSprite.y = this.Sprite.y;
                    this.spearSprite.visible = true;
                    this._attackCooldown = 60;
                    this.levelManager.link.handleDamage(this.spearSprite);
                    this.levelManager.link.handleDamage(this.Box);
                }
                else if (this.Sprite.currentAnimation != GUARD_WALK_LEFT) {
                    this.Sprite.setAnimation(GUARD_WALK_LEFT);
                    this.spearSprite.visible = false;
                }
            }
        } else {
            if (distanceY > 0) {
                // Move or attack down
                if (!this.levelManager.isCollision(this.Box.x, this.Box.y + speed, this)) {
                    this.Sprite.y += speed;
                    this.Box.y += speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_DOWN && isAttacking && this._attackCooldown === 0) {
                    this.Sprite.setAnimation(GUARD_ATTACK_DOWN);
                    this.spearSprite.setAnimation(SPEAR_DOWN);
                    this.spearSprite.x = this.Sprite.x;
                    this.spearSprite.y = this.Sprite.y;
                    this.spearSprite.visible = true;
                    this._attackCooldown = 60;
                    this.levelManager.link.handleDamage(this.spearSprite);
                    this.levelManager.link.handleDamage(this.Box);
                }
                else if (this.Sprite.currentAnimation != GUARD_WALK_DOWN) {
                    this.Sprite.setAnimation(GUARD_WALK_DOWN);
                    this.spearSprite.visible = false;
                }
                
            } else {
                // Move or attack up
                if (!this.levelManager.isCollision(this.Box.x, this.Box.y - speed, this)) {
                    this.Sprite.y -= speed;
                    this.Box.y -= speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_UP && isAttacking && this._attackCooldown === 0) {
                    this.Sprite.setAnimation(GUARD_ATTACK_UP);
                    this.spearSprite.setAnimation(SPEAR_UP);
                    this.spearSprite.x = this.Sprite.x;
                    this.spearSprite.y = this.Sprite.y;
                    this.spearSprite.visible = true;
                    this._attackCooldown = 60;
                    this.levelManager.link.handleDamage(this.spearSprite);
                    this.levelManager.link.handleDamage(this.Box);
                }
                else if (this.Sprite.currentAnimation != GUARD_WALK_UP) {
                    this.Sprite.setAnimation(GUARD_WALK_UP);
                    this.spearSprite.visible = false;
                }
            }
            this.levelManager.link.handleDamage(this.spearSprite);
            this.levelManager.link.handleDamage(this.Box);
        }
    } else {
        this.animationTimer--;
    }
};

Guard.prototype.draw = function()
{
    // Save original position
    const origX = this.Sprite.x;
    const origY = this.Sprite.y;

    const origGX = this.spearSprite.x;
    const origGY = this.spearSprite.y;
    
    // Offset for camera
    this.Sprite.x += this.levelManager.map.offsetX;
    this.Sprite.y += this.levelManager.map.offsetY;

    this.spearSprite.x += this.levelManager.map.offsetX;
    this.spearSprite.y += this.levelManager.map.offsetY;
    
    // Draw
    this.Sprite.draw();
    this.spearSprite.draw();
    
    // Restore
    this.Sprite.x = origX;
    this.Sprite.y = origY;
    this.spearSprite.x = origGX;
    this.spearSprite.y = origGY;
    
}



Guard.prototype.checkHurtbox = function() {
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

    // Check if Guard is in front of Link based on direction
    let inFront = false;
    const linkBox = link.Box;
    const guardBox = this.Box;

    switch (link.Sprite.currentAnimation) {
        case LINK_SWING_LEFT:
            // Guard must be left of Link, within 16px, and overlap vertically
            inFront =
                guardBox.x + guardBox.width <= linkBox.x &&
                guardBox.x + guardBox.width >= linkBox.x - 16 &&
                guardBox.y < linkBox.y + linkBox.height &&
                guardBox.y + guardBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_RIGHT:
            // Guard must be right of Link, within 16px, and overlap vertically
            inFront =
                guardBox.x >= linkBox.x + linkBox.width &&
                guardBox.x <= linkBox.x + linkBox.width + 16 &&
                guardBox.y < linkBox.y + linkBox.height &&
                guardBox.y + guardBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_UP:
            // Guard must be above Link, within 16px, and overlap horizontally
            inFront =
                guardBox.y + guardBox.height <= linkBox.y &&
                guardBox.y + guardBox.height >= linkBox.y - 16 &&
                guardBox.x < linkBox.x + linkBox.width + 16 &&
                guardBox.x + guardBox.width > linkBox.x;
            break;
        case LINK_SWING_DOWN:
            // Guard must be below Link, within 16px, and overlap horizontally
            inFront =
                guardBox.y >= linkBox.y + linkBox.height &&
                guardBox.y <= linkBox.y + linkBox.height + 16 &&
                guardBox.x < linkBox.x + linkBox.width &&
                guardBox.x + guardBox.width > linkBox.x - 16;
            break;
    }

    if (!inFront) return;

    // 2. Reduce health by 1
    this.currentHealth -= 1;
    this.hurtsound.play();

    // 3. Knockback: move away from Link's center by 10px, smoothly, but stop if collision occurs
    const guard = this;
    const guardCenterX = this.Box.x + this.Box.width / 2;
    const guardCenterY = this.Box.y + this.Box.height / 2;
    const linkCenterX = link.Box.x + link.Box.width / 2;
    const linkCenterY = link.Box.y + link.Box.height / 2;

    // Calculate knockback direction
    let dx = guardCenterX - linkCenterX;
    let dy = guardCenterY - linkCenterY;
    let length = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= length;
    dy /= length;

    // Knockback distance and frames
    const knockbackDistance = 10;
    const knockbackFrames = 5;
    let frame = 0;

    // Ensure move per frame is always an integer (at least 1 or -1 if direction exists)
    let movePerFrameX = Math.round(dx * (knockbackDistance / knockbackFrames));
    let movePerFrameY = Math.round(dy * (knockbackDistance / knockbackFrames));
    if (movePerFrameX === 0 && dx !== 0) movePerFrameX = dx > 0 ? 1 : -1;
    if (movePerFrameY === 0 && dy !== 0) movePerFrameY = dy > 0 ? 1 : -1;

    // Set hurt animation and prevent multiple hits
    this.Sprite.setAnimation(GUARD_ATTACK_DOWN); // Or GUARD_HURT if you have one
    this._isHurting = true;

    function animateKnockback() {
        if (frame < knockbackFrames) {
            // Predict next position
            const nextX = guard.Box.x + movePerFrameX;
            const nextY = guard.Box.y + movePerFrameY;

            // Check collision with map and entities
            const collision = guard.levelManager.isCollision(nextX, nextY, guard);

            if (!collision) {
                guard.Sprite.x += movePerFrameX;
                guard.Sprite.y += movePerFrameY;
                guard.Box.x += movePerFrameX;
                guard.Box.y += movePerFrameY;
                frame++;
                requestAnimationFrame(animateKnockback);
            }
            // If collision, stop knockback immediately
        }
    }
    animateKnockback();

    // After 750ms, restore animation and allow new hits
    setTimeout(() => {
        if (guard.currentHealth > 0) {
            guard.Sprite.setAnimation(GUARD_STAND);
            guard._isHurting = false;
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
        const drop = new DropItem(this.Sprite.x, this.Sprite.y, 8, 16, 1, this.levelManager);
        drop.loadAnimations();
        drop.findValidLandingPosition(this.levelManager.map.collisionData, this.levelManager.currentLevelEntities);
        this.levelManager.currentLevelDropItems.push(drop);
        this.levelManager.currentLevelDropItemSprites.push(drop.Sprite);
    }
};
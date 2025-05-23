const BAT_FLY = 0;

// Bat

function Bat(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/minor_enemies.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x + 4, y + 4, 8, 8); // Create a box for collision detection

    this.maxHealth = 1;
    this.currentHealth = this.maxHealth;

}

Bat.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BAT_FLY, [338, 571, 16, 16]);
    this.Sprite.addKeyframe(BAT_FLY, [321, 571, 16, 16]);

    this.Sprite.setAnimation(BAT_FLY);

}

Bat.prototype.updateAnimation = function()
{
    this.checkHurtbox();

    // States: "approach", "retreat", "cooldown"
    if (!this.state) this.state = "retreat";
    if (!this.stateTimer) this.stateTimer = 0;

    const link = this.levelManager.link;
    const batCenterX = this.Box.x + this.Box.width / 2;
    const batCenterY = this.Box.y + this.Box.height / 2;
    const linkCenterX = link.Box.x + link.Box.width / 2;
    const linkCenterY = link.Box.y + link.Box.height / 2;

    // Distance to Link
    const dx = linkCenterX - batCenterX;
    const dy = linkCenterY - batCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Movement speed
    const approachSpeed = 2;
    const retreatSpeed = 1;
    const minDistance = 10; // If closer than this, retreat
    const maxDistance = 80; // If further than this, approach

    // Track movement for stuck detection
    if (!this._lastMoveCheck) {
        this._lastMoveCheck = Date.now();
        this._lastPos = { x: this.Box.x, y: this.Box.y };
    }

    if (this.state === "approach") {
        // Move towards Link
        let moved = false;
        if (distance > minDistance) {
            let moveX = Math.round((dx / distance) * approachSpeed);
            let moveY = Math.round((dy / distance) * approachSpeed);

            // Try to move, but check for collision
            const nextX = this.Box.x + moveX;
            const nextY = this.Box.y + moveY;
            if (!this.levelManager.isCollision(nextX, nextY, this)) {
                this.Sprite.x += moveX;
                this.Sprite.y += moveY;
                this.Box.x += moveX;
                this.Box.y += moveY;
                moved = (moveX !== 0 || moveY !== 0);
            }
        }
        // If close enough to Link, "attack" (damage) and retreat
        if (distance <= minDistance + 2) {
            // Enlarge the bat's hitbox to ensure contact
            const originalWidth = this.Box.width;
            const originalHeight = this.Box.height;
            this.Box.updateSize(originalWidth + 8, originalHeight + 8);
            // Center the enlarged box on the bat
            const originalBoxX = this.Box.x;
            const originalBoxY = this.Box.y;
            this.Box.updatePosition(
                this.Sprite.x,
                this.Sprite.y
            );

            // Damage Link if not invincible
            if (!link.isInvincible) {
                link.handleDamage(this.Box);
            }

            // After a short delay, shrink the box back to normal
            setTimeout(() => {
                this.Box.updateSize(originalWidth, originalHeight);
                this.Box.updatePosition(
                    originalBoxX,
                    originalBoxY
                );
            }, 100);

            this.state = "retreat";
            this.stateTimer = 30 + Math.floor(Math.random() * 100);
        } else {
            // --- Check if stuck ---
            const now = Date.now();
            if (now - this._lastMoveCheck > 200) {
                const distMoved = Math.abs(this.Box.x - this._lastPos.x) + Math.abs(this.Box.y - this._lastPos.y);
                if (distMoved < 1) {
                    this.state = "retreat";
                    this.stateTimer = 45 + Math.floor(Math.random() * 30);
                }
                this._lastMoveCheck = now;
                this._lastPos = { x: this.Box.x, y: this.Box.y };
            }
        }
        
    } else if (this.state === "retreat") {
        // Move away from Link
        let awayDx = batCenterX - linkCenterX;
        let awayDy = batCenterY - linkCenterY;
        let awayDist = Math.sqrt(awayDx * awayDx + awayDy * awayDy) || 1;
        let moveX = Math.round((awayDx / awayDist) * retreatSpeed);
        let moveY = Math.round((awayDy / awayDist) * retreatSpeed);

        const nextX = this.Box.x + moveX;
        const nextY = this.Box.y + moveY;
        if (!this.levelManager.isCollision(nextX, nextY, this)) {
            this.Sprite.x += moveX;
            this.Sprite.y += moveY;
            this.Box.x += moveX;
            this.Box.y += moveY;
        }

        this.stateTimer--;
        if (this.stateTimer <= 0 || distance > maxDistance) {
            this.state = "cooldown";
            this.stateTimer = 60 + Math.floor(Math.random() * 60); // Wait before next attack (longer cooldown)
        }
    } else if (this.state === "cooldown") {
        // Idle for a while before next approach
        this.stateTimer--;
        if (this.stateTimer <= 0) {
            this.state = "approach";
        }
    }
}

Bat.prototype.checkHurtbox = function() {
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

    // Check if Bat is in front of Link based on direction
    let inFront = false;
    const linkBox = link.Box;
    const batBox = this.Box;

    switch (link.Sprite.currentAnimation) {
        case LINK_SWING_LEFT:
            // Bat must be left of Link, within 16px, and overlap vertically
            inFront =
                batBox.x + batBox.width <= linkBox.x &&
                batBox.x + batBox.width >= linkBox.x - 16 &&
                batBox.y < linkBox.y + linkBox.height &&
                batBox.y + batBox.height > linkBox.y - 16 ;
            break;
        case LINK_SWING_RIGHT:
            // Bat must be right of Link, within 16px, and overlap vertically
            inFront =
                batBox.x >= linkBox.x + linkBox.width &&
                batBox.x <= linkBox.x + linkBox.width + 16 &&
                batBox.y < linkBox.y + linkBox.height &&
                batBox.y + batBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_UP:
            // Bat must be above Link, within 16px, and overlap horizontally
            inFront =
                batBox.y + batBox.height <= linkBox.y &&
                batBox.y + batBox.height >= linkBox.y - 16 &&
                batBox.x < linkBox.x + linkBox.width + 16 &&
                batBox.x + batBox.width > linkBox.x;
            break;
        case LINK_SWING_DOWN:
            // Bat must be below Link, within 16px, and overlap horizontally
            inFront =
                batBox.y >= linkBox.y + linkBox.height &&
                batBox.y <= linkBox.y + linkBox.height + 16 &&
                batBox.x < linkBox.x + linkBox.width &&
                batBox.x + batBox.width > linkBox.x - 16;
            break;
    }

    if (!inFront) return;

    // 2. Reduce health by 1
    this.currentHealth -= 1;

    // 3. Knockback: move away from Link's center by 20px, smoothly, but stop if collision occurs
    const bat = this;
    const batCenterX = this.Box.x + this.Box.width / 2;
    const batCenterY = this.Box.y + this.Box.height / 2;
    const linkCenterX = link.Box.x + link.Box.width / 2;
    const linkCenterY = link.Box.y + link.Box.height / 2;

    // Calculate knockback direction
    let dx = batCenterX - linkCenterX;
    let dy = batCenterY - linkCenterY;
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
    this._isHurting = true;

    function animateKnockback() {
        if (frame < knockbackFrames) {
            // Predict next position
            const nextX = bat.Box.x + movePerFrameX;
            const nextY = bat.Box.y + movePerFrameY;

            // Check collision with map and entities
            const collision = bat.levelManager.isCollision(nextX, nextY, bat);

            if (!collision) {
                bat.Sprite.x += movePerFrameX;
                bat.Sprite.y += movePerFrameY;
                bat.Box.x += movePerFrameX;
                bat.Box.y += movePerFrameY;
                frame++;
                requestAnimationFrame(animateKnockback);
            }
            // If collision, stop knockback immediately
        }
    }
    animateKnockback();

    // After 750ms, restore animation and allow new hits
    setTimeout(() => {
        if (bat.currentHealth > 0) {
            bat._isHurting = false;
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


Bat.prototype.draw = function()
{
    this.Sprite.draw();
}

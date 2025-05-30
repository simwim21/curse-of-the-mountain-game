const BOSS_LAMP_STAND = 0;
const BOSS_LAMP_MOVE = 1;

const BOSS_GENIE_MOVING = 0;
const BOSS_GENIE_THROWING = 1;

// Boss

function Boss(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/bosses.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y + 9 , width, height - 9);

    this.Genie = new Sprite(64, 16, width, height, fps, this.texture);
    this.Genie.visible = true;

    this.maxHealth = 10;
    this.currentHealth = this.maxHealth;

    this.fire = AudioFX("sounds/fire.mp3");
    this.win = AudioFX("sounds/win.mp3");
    this.lamp = AudioFX("sounds/lamp.mp3");

    this._attackCooldown = 50;

    this.first = true;

}

Boss.prototype.loadAnimations = function() 
{

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BOSS_LAMP_STAND, [369, 11, 16, 32]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BOSS_LAMP_MOVE, [369, 11, 16, 32]);
    this.Sprite.addKeyframe(BOSS_LAMP_MOVE, [386, 11, 16, 32]);
    this.Sprite.addKeyframe(BOSS_LAMP_MOVE, [369, 11, 16, 32]);
    this.Sprite.addKeyframe(BOSS_LAMP_MOVE, [420, 11, 16, 32]);

    this.Sprite.setAnimation(BOSS_LAMP_STAND);

    this.Genie.addAnimation();
    this.Genie.addKeyframe(BOSS_GENIE_MOVING, [205, 11, 40, 48]);
    this.Genie.addKeyframe(BOSS_GENIE_MOVING, [287, 11, 40, 48]);

    this.Genie.addAnimation();
    this.Genie.addKeyframe(BOSS_GENIE_THROWING, [205, 60, 40, 48]);
    this.Genie.addKeyframe(BOSS_GENIE_THROWING, [287, 60, 40, 48]);

    this.levelManager.text.write("I am the Genie of this mountain and no one has ever defeated me and my lamp!");

}

Boss.prototype.updateAnimation = function(deltaTime) {

    this.first = false;
    // Move Lamp (Sprite and Box) completely randomly
    if (!this._moveTimer || this._moveTimer <= 0) {
        this._moveDir = {
            x: Math.floor(Math.random() * 3) - 1,
            y: Math.floor(Math.random() * 3) - 1
        };
        if (this._moveDir.x === 0 && this._moveDir.y === 0) {
            this.Sprite.setAnimation(BOSS_LAMP_STAND)
        }
        else {
            this._moveTimer = 40 + Math.floor(Math.random() * 40); // frames to move in this direction
            
        }
        
    }

    // Move lamp
    if (this._moveTimer > 0) {
        let nextX = this.Box.x + this._moveDir.x;
        let nextY = this.Box.y + this._moveDir.y;
        // Check collision
        if (!this.levelManager.isCollision(nextX, nextY, this)) {
            this.Box.x = nextX;
            this.Box.y = nextY;
            this.Sprite.x = this.Sprite.x + this._moveDir.x;
            this.Sprite.y = this.Sprite.y + this._moveDir.y;
            if (this.Sprite.currentAnimation != BOSS_LAMP_MOVE) this.Sprite.setAnimation(BOSS_LAMP_MOVE);
        }
        this._moveTimer--;
        if (this._moveTimer <= 0) {
            this.Sprite.setAnimation(BOSS_LAMP_STAND);
        }
    }

    this.checkHurtbox();

    if (!this._genieMoveTimer || this._genieMoveTimer <= 0) {
        this._genieMoveDir = {
            x: Math.floor(Math.random() * 3) - 1,
            y: 0 
        };
        this._genieMoveTimer = 30 + Math.floor(Math.random() * 30);
    }

    if (this._genieMoveTimer > 0) {
        let nextGenieX = this.Genie.x + this._genieMoveDir.x;
        // If next move is out of bounds, pick a new direction and reset timer
        if (nextGenieX <= 16 || nextGenieX >= 96) {
            this._genieMoveDir.x = Math.floor(Math.random() * 3) - 1;
            this._genieMoveTimer = 30 + Math.floor(Math.random() * 30);
        } else {
            this.Genie.setAnimation(BOSS_GENIE_MOVING);
            this.Genie.x = nextGenieX;
            this._genieMoveTimer--;
        }
    }

    // Genie attacks randomly when not moving
    if (!this._attackCooldown || this._attackCooldown <= 0) {
        // Only start a new attack if not already attacking
        if (!this._genieIsAttacking) {
            this.Genie.setAnimation(BOSS_GENIE_THROWING);
            this.attack();
            this._attackCooldown = 50 + Math.floor(Math.random() * 30); // frames before next attack
            this._genieIsAttacking = true;
            this._genieAttackFrames = 0;
        }
    } else {
        this._attackCooldown--;
        // If Genie is attacking, keep attack animation for at least 30 frames
        if (this._genieIsAttacking) {
            this._genieAttackFrames++;
            if (this._genieAttackFrames >= 40) {
                this._genieIsAttacking = false;
                this.Genie.setAnimation(BOSS_GENIE_MOVING);
            }
            else if (this.Genie.currentAnimation != BOSS_GENIE_THROWING) this.Genie.setAnimation(BOSS_GENIE_THROWING);
        } else {
    	    this.Genie.setAnimation(BOSS_GENIE_MOVING);
        }
    }
}



Boss.prototype.attack = function() {

    // Center the fireball on the boss Genie sprite
    let fire = new Fire(
        this.Genie.x + this.Genie.width / 2 - 8,
        this.Genie.y + this.Genie.height / 2 - 8,
        16, 16, 6, this.levelManager
    );

    fire.loadAnimations();
    this.levelManager.currentLevelEntities.push(fire);
    this.levelManager.currentLevelEntitySprites.push(fire.Sprite);

};


Boss.prototype.checkHurtbox = function() {
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

    // Check if Boss is in front of Link based on direction
    let inFront = false;
    const linkBox = link.Box;
    const buzzBox = this.Box;

    switch (link.Sprite.currentAnimation) {
        case LINK_SWING_LEFT:
            // Boss must be left of Link, within 16px, and overlap vertically
            inFront =
                buzzBox.x + buzzBox.width <= linkBox.x &&
                buzzBox.x + buzzBox.width >= linkBox.x - 16 &&
                buzzBox.y < linkBox.y + linkBox.height &&
                buzzBox.y + buzzBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_RIGHT:
            // Boss must be right of Link, within 16px, and overlap vertically
            inFront =
                buzzBox.x >= linkBox.x + linkBox.width &&
                buzzBox.x <= linkBox.x + linkBox.width + 16 &&
                buzzBox.y < linkBox.y + linkBox.height &&
                buzzBox.y + buzzBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_UP:
            // Boss must be above Link, within 16px, and overlap horizontally
            inFront =
                buzzBox.y + buzzBox.height <= linkBox.y &&
                buzzBox.y + buzzBox.height >= linkBox.y - 16 &&
                buzzBox.x < linkBox.x + linkBox.width + 16 &&
                buzzBox.x + buzzBox.width > linkBox.x;
            break;
        case LINK_SWING_DOWN:
            // Boss must be below Link, within 16px, and overlap horizontally
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
    this.lamp.play();

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
        }
    }
    animateKnockback();

    // After 750ms, restore animation and allow new hits
    setTimeout(() => {
        if (buzz.currentHealth > 0) {
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
        this.win.play();
        showEpilogue();
    }
};


Boss.prototype.draw = function()
{

    // Save original position
    const origX = this.Sprite.x;
    const origY = this.Sprite.y;

    const origGX = this.Genie.x;
    const origGY = this.Genie.y;
    
    // Offset for camera
    this.Sprite.x += this.levelManager.map.offsetX;
    this.Sprite.y += this.levelManager.map.offsetY;

    this.Genie.x += this.levelManager.map.offsetX;
    this.Genie.y += this.levelManager.map.offsetY;
    
    // Draw
    this.Sprite.draw();
    this.Genie.draw();
    
    // Restore
    this.Sprite.x = origX;
    this.Sprite.y = origY;
    this.Genie.x = origGX;
    this.Genie.y = origGY;
    
}

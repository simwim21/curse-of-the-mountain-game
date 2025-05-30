const MIDBOSS_STAND = 0;
const MIDBOSS_WALK = 1;
const MIDBOSS_CHARGE = 2;
const MIDBOSS_JUMP = 3;
const MIDBOSS_JUMPING = 4;
const MIDBOSS_LAND = 5;

// Midboss

function Midboss(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/midbosses.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height);


    this.maxHealth = 10;
    this.currentHealth = this.maxHealth;

    this.zap = AudioFX("sounds/zap.mp3");
    this.win = AudioFX("sounds/win.mp3");

    this.sound = AudioFX("sounds/buzzblob_sound.mp3");

}

Midboss.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(MIDBOSS_STAND, [365, 290, 24, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(MIDBOSS_WALK, [424, 274, 32, 32], false, 0, -16);
    this.Sprite.addKeyframe(MIDBOSS_WALK, [457, 274, 24, 32], true, 0, -16);
    this.Sprite.addKeyframe(MIDBOSS_WALK, [424, 274, 32, 32], false, 0, -16);
    this.Sprite.addKeyframe(MIDBOSS_WALK, [457, 274, 24, 32], false, 0, -16);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(MIDBOSS_CHARGE, [365, 290, 24, 16]);
    this.Sprite.addKeyframe(MIDBOSS_CHARGE, [482, 290, 24, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(MIDBOSS_JUMP, [365, 290, 24, 16],false);
    this.Sprite.addKeyframe(MIDBOSS_JUMP, [390, 274, 16, 32],false, 4, -16);
    this.Sprite.addKeyframe(MIDBOSS_JUMP, [407, 274, 16, 32],false, 4, -16);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(MIDBOSS_JUMPING, [407, 274, 16, 32],false, 4, -16);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(MIDBOSS_LAND, [407, 274, 16, 32],false, 4, -16);
    this.Sprite.addKeyframe(MIDBOSS_LAND, [390, 274, 16, 32],false, 4, -16);
    this.Sprite.addKeyframe(MIDBOSS_LAND, [365, 290, 24, 16],false);

    this.Sprite.setAnimation(MIDBOSS_STAND);

    this.levelManager.text.write("Hahaha! Your will never defeat me and find my key!");

}

Midboss.prototype.updateAnimation = function(deltaTime)
{
    this.checkHurtbox();
    const link = this.levelManager.link;

    time = 25;
    console.log(this.stateTimer);

    // State machine for midboss behavior
    if (!this.state) {
        this.state = "IDLE";
        this.stateTimer = 0;
        this.walkDir = null;
        this.jumpData = null;
    }

    // If currently in a state, decrement timer
    if (this.stateTimer > 0) {
        this.stateTimer -= time;
    }

    // Decide next action if idle or finished with current state
    if (this.state === "IDLE" || this.stateTimer <= 0) {
        // Randomly pick next action: WALK, JUMP, or CHARGE
        const actions = ["WALK", "CHARGE"];
        random = Math.floor(Math.random() * 3);

        const nextAction = actions[random % 2];

        if (nextAction === "WALK") {
            this.state = "WALK";
            this.stateTimer = 2500; // ms
            this.Sprite.setAnimation(MIDBOSS_WALK);

        } else if (nextAction === "CHARGE") {
            this.state = "CHARGE";
            this.stateTimer = 2000; // ms
            this.Sprite.setAnimation(MIDBOSS_CHARGE);
        }
    }

    // Handle WALK movement
    if (this.state === "WALK") {
        if (this.Sprite.currentAnimation !== MIDBOSS_WALK) this.Sprite.setAnimation(MIDBOSS_WALK);
        if (!this.walkCounter) this.walkCounter = 0;
        if (!this.walkDirIndex && this.walkDirIndex !== 0) this.walkDirIndex = Math.floor(Math.random() * 8);

        // 8 directions
        const directions = [
            { x: 1, y: 0 },   // right
            { x: -1, y: 0 },  // left
            { x: 0, y: 1 },   // down
            { x: 0, y: -1 },  // up
        ];

        // Change direction every 24 frames (about 0.4s at 60fps)
        if (this.walkCounter % 24 === 0) {
            this.walkDirIndex = Math.floor(Math.random() * 4);
        }
        dir = directions[this.walkDirIndex];

        let moveX = dir.x;
        let moveY = dir.y;
        counter = 0;
        while (this.levelManager.isCollision(this.Box.x + moveX, this.Box.y + moveY, this) && counter < 4) {
            dir = directions[Math.floor(Math.random() * 4)];
            moveX = dir.x;
            moveY = dir.y;
            counter += 1;
            if (counter == 4) {
                this.Sprite.setAnimation(MIDBOSS_STAND);
                this.state = "IDLE";
                this.stateTimer = 0;
            }
        }
        
        this.Sprite.x += moveX;
        this.Sprite.y += moveY;
        this.Box.x += moveX;
        this.Box.y += moveY;

        this.walkCounter++;

        this.stateTimer -= time;
        if (this.stateTimer <= 0) {
            this.state = "IDLE";
            this.walkCounter = 0;
            this.walkDirIndex = null;
        }
    }


    // Handle CHARGE (no movement, just animation for now)
    if (this.state === "CHARGE") {
        if (this.Sprite.currentAnimation !== MIDBOSS_CHARGE) this.Sprite.setAnimation(MIDBOSS_CHARGE);
        console.log("Midboss charging, state timer: " + this.stateTimer);
        
        if (this.stateTimer <= 0 + time) {
            this.attack();
            this.zap.play();
            this.state = "IDLE";
            this.Sprite.setAnimation(MIDBOSS_STAND);
            console.log("Midboss finished charging, returning to IDLE");
        }
    }

};

Midboss.prototype.attack = function() {

    let random = Math.floor(Math.random() * 2);

    if (random == 0) {
        let upLightning = new Lightning(this.Sprite.x + 8, this.Sprite.y - 16, 16, 16, 6, this.levelManager);
        upLightning.setId("UP");
        let downLightning = new Lightning(this.Sprite.x + 8, this.Sprite.y + 16, 16, 16, 6, this.levelManager);
        downLightning.setId("DOWN");
        let leftLightning = new Lightning(this.Sprite.x - 16, this.Sprite.y, 16, 16, 6, this.levelManager);
        leftLightning.setId("LEFT");
        let rightLightning = new Lightning(this.Sprite.x + 32, this.Sprite.y, 16, 16, 6, this.levelManager);
        rightLightning.setId("RIGHT");
        upLightning.loadAnimations();
        downLightning.loadAnimations();
        leftLightning.loadAnimations();
        rightLightning.loadAnimations();
        this.levelManager.currentLevelEntities.push(upLightning);
        this.levelManager.currentLevelEntitySprites.push(upLightning.Sprite);
        this.levelManager.currentLevelEntities.push(downLightning);
        this.levelManager.currentLevelEntitySprites.push(downLightning.Sprite);
        this.levelManager.currentLevelEntities.push(leftLightning);
        this.levelManager.currentLevelEntitySprites.push(leftLightning.Sprite);
        this.levelManager.currentLevelEntities.push(rightLightning);
        this.levelManager.currentLevelEntitySprites.push(rightLightning.Sprite);
    }

    else {
        let upRightLightning = new Lightning(this.Sprite.x + 32, this.Sprite.y - 16, 16, 16, 6, this.levelManager);
        upRightLightning.setId("UPRIGHT");
        let upLeftLightning = new Lightning(this.Sprite.x - 16, this.Sprite.y - 16, 16, 16, 6, this.levelManager);
        upLeftLightning.setId("UPLEFT");
        let downRightLightning = new Lightning(this.Sprite.x + 32, this.Sprite.y + 16, 16, 16, 6, this.levelManager);
        downRightLightning.setId("DOWNRIGHT");
        let downLeftLightning = new Lightning(this.Sprite.x - 16, this.Sprite.y + 16, 16, 16, 6, this.levelManager);
        downLeftLightning.setId("DOWNLEFT");
        upRightLightning.loadAnimations();
        upLeftLightning.loadAnimations();
        downRightLightning.loadAnimations();
        downLeftLightning.loadAnimations();
        this.levelManager.currentLevelEntities.push(upRightLightning);
        this.levelManager.currentLevelEntitySprites.push(upRightLightning.Sprite);
        this.levelManager.currentLevelEntities.push(upLeftLightning);
        this.levelManager.currentLevelEntitySprites.push(upLeftLightning.Sprite);
        this.levelManager.currentLevelEntities.push(downRightLightning);
        this.levelManager.currentLevelEntitySprites.push(downRightLightning.Sprite);
        this.levelManager.currentLevelEntities.push(downLeftLightning);
        this.levelManager.currentLevelEntitySprites.push(downLeftLightning.Sprite);
    }

    

}


Midboss.prototype.checkHurtbox = function() {
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

    // Check if Midboss is in front of Link based on direction
    let inFront = false;
    const linkBox = link.Box;
    const buzzBox = this.Box;

    switch (link.Sprite.currentAnimation) {
        case LINK_SWING_LEFT:
            // Midboss must be left of Link, within 16px, and overlap vertically
            inFront =
                buzzBox.x + buzzBox.width <= linkBox.x &&
                buzzBox.x + buzzBox.width >= linkBox.x - 16 &&
                buzzBox.y < linkBox.y + linkBox.height &&
                buzzBox.y + buzzBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_RIGHT:
            // Midboss must be right of Link, within 16px, and overlap vertically
            inFront =
                buzzBox.x >= linkBox.x + linkBox.width &&
                buzzBox.x <= linkBox.x + linkBox.width + 16 &&
                buzzBox.y < linkBox.y + linkBox.height &&
                buzzBox.y + buzzBox.height > linkBox.y - 16;
            break;
        case LINK_SWING_UP:
            // Midboss must be above Link, within 16px, and overlap horizontally
            inFront =
                buzzBox.y + buzzBox.height <= linkBox.y &&
                buzzBox.y + buzzBox.height >= linkBox.y - 16 &&
                buzzBox.x < linkBox.x + linkBox.width + 16 &&
                buzzBox.x + buzzBox.width > linkBox.x;
            break;
        case LINK_SWING_DOWN:
            // Midboss must be below Link, within 16px, and overlap horizontally
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
            buzz.Sprite.setAnimation(MIDBOSS_WALK);
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
        console.log(linkBox)
        if (linkBox.x > 80 && linkBox.x < 112) {
            const drop = new Chest(48, 32, 16, 16, 1, this.levelManager);
            drop.loadAnimations();
            this.levelManager.currentLevelEntities.push(drop);
            this.levelManager.currentLevelEntitySprites.push(drop.Sprite);
        }
        else {
            const drop = new Chest(96, 32, 16, 16, 1, this.levelManager);
            drop.loadAnimations();
            this.levelManager.currentLevelEntities.push(drop);
            this.levelManager.currentLevelEntitySprites.push(drop.Sprite);
        }
    }
};


Midboss.prototype.draw = function()
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

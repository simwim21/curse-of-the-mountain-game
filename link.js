const LINK_STAND_LEFT = 0;
const LINK_STAND_RIGHT = 1;
const LINK_STAND_DOWN = 2;
const LINK_STAND_UP = 3;

const LINK_WALK_LEFT = 4;
const LINK_WALK_RIGHT = 5;
const LINK_WALK_DOWN = 6;
const LINK_WALK_UP = 7;

const LINK_SWING_LEFT = 8;
const LINK_SWING_RIGHT = 9;
const LINK_SWING_DOWN = 10;
const LINK_SWING_UP = 11;

const LINK_PICK_UP_LIGHT_ITEM = 12;
const LINK_PICK_UP_HEAVY_ITEM = 13;

const LINK_BLOCK_LEFT = 14;
const LINK_BLOCK_RIGHT = 15;
const LINK_BLOCK_DOWN = 16;
const LINK_BLOCK_UP = 17;

const SWORD_SWING_LEFT = 0;
const SWORD_LEFT = 1

const SWORD_SWING_RIGHT = 2;
const SWORD_RIGHT = 3;

const SWORD_SWING_DOWN = 4;
const SWORD_DOWN = 5;

const SWORD_SWING_UP = 6;
const SWORD_UP = 7;


// Link. Draws Link using the current keyframe of a selected animation.

function Link(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/link.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);
	this.swordSprite = new Sprite(x, y, width, height, fps, this.texture);
	this.hitboxSword = new Box(x, y, 10, 10);


	this.levelManager = world;
	this.levelManager.addLink(this);

	this.runningAnimation = false;
	this.runningAnimationCouter = 0;

	this.isBlocking = false;

	this.maxHealth = 6;
	this.currentHealth = this.maxHealth;

	this.rupeeCount = 0;

	this.hasSword = true;
    this.hasShield = true;
	this.hasMap = false;

	
    this.hasFlower = false;
    this.hasLantern = false;

	this.hasKey1 = false; 
	this.hasKey2 = false;
	this.hasKey3 = false;
	this.hasKey4 = false;


	this.Box = new Box(x + 3, y + 1, 10, 15);

	this.currentPickupItem = null;
	this.isHoldingItem = false;

	this.isCheatInvincible = false;
}

Link.prototype.loadAnimations = function() 
{

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_STAND_LEFT, [35, 11, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_STAND_RIGHT, [35, 11, 16, 16], true);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_STAND_DOWN, [431, 121, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_STAND_UP, [414, 121, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_WALK_LEFT, [35, 11, 16, 16]);
	this.Sprite.addKeyframe(LINK_WALK_LEFT, [52, 11, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_WALK_RIGHT, [35, 11, 16, 16], true);
	this.Sprite.addKeyframe(LINK_WALK_RIGHT, [52, 11, 16, 16], true);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_WALK_DOWN, [1, 11, 16, 16]);
	this.Sprite.addKeyframe(LINK_WALK_DOWN, [1, 11, 16, 16], true);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_WALK_UP, [18, 11, 16, 16]);
	this.Sprite.addKeyframe(LINK_WALK_UP, [18, 11, 16, 16], true);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_SWING_LEFT, [169, 137, 16, 16]);
	this.Sprite.addKeyframe(LINK_SWING_LEFT, [199, 137, 16, 16]);
	this.Sprite.addKeyframe(LINK_SWING_LEFT, [232, 137, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_SWING_RIGHT, [169, 137, 16, 16], true);
	this.Sprite.addKeyframe(LINK_SWING_RIGHT, [199, 137, 16, 16], true);
	this.Sprite.addKeyframe(LINK_SWING_RIGHT, [232, 137, 16, 16], true);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_SWING_DOWN, [17, 121, 16, 16]);
	this.Sprite.addKeyframe(LINK_SWING_DOWN, [47, 121, 16, 16]);
	this.Sprite.addKeyframe(LINK_SWING_DOWN, [64, 121, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_SWING_UP, [85, 137, 16, 16]);
	this.Sprite.addKeyframe(LINK_SWING_UP, [118, 137, 16, 16]);
	this.Sprite.addKeyframe(LINK_SWING_UP, [148, 137, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_PICK_UP_LIGHT_ITEM, [404, 11, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_PICK_UP_HEAVY_ITEM, [421, 11, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_BLOCK_LEFT, [103, 59, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_BLOCK_RIGHT, [137, 59, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_BLOCK_DOWN, [35, 59, 16, 16]);

	this.Sprite.addAnimation();
	this.Sprite.addKeyframe(LINK_BLOCK_UP, [69, 59, 16, 16]);

	this.Sprite.setAnimation(LINK_STAND_UP);


	// SWORD ANIMATIONS
	this.swordSprite.visible = false;

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_SWING_LEFT, [169, 121, 8, 16], false, 0, -16);
	this.swordSprite.addKeyframe(SWORD_SWING_LEFT, [186, 124, 16, 16], false, -13, -13);
	this.swordSprite.addKeyframe(SWORD_SWING_LEFT, [216, 137, 16, 16], false, -16, 0);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_LEFT, [216, 137, 16, 16], false, -16, 0);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_SWING_RIGHT, [169, 121, 8, 16], false, 8, -16);
	this.swordSprite.addKeyframe(SWORD_SWING_RIGHT, [186, 124, 16, 16], true, -13, -13);
	this.swordSprite.addKeyframe(SWORD_SWING_RIGHT, [216, 137, 16, 16], true, -16, 0);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_RIGHT, [216, 137, 16, 16], true, -16, 0);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_SWING_DOWN, [1, 121, 16, 16], false, -13, 0);
	this.swordSprite.addKeyframe(SWORD_SWING_DOWN, [34, 134, 16, 16], false, -13, 15);
	this.swordSprite.addKeyframe(SWORD_SWING_DOWN, [72, 137, 8, 16], false, 8, 16);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_DOWN, [72, 137, 8, 16], false, 8, 16);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_SWING_UP, [101, 129, 16, 16], false, 16, -5);
	this.swordSprite.addKeyframe(SWORD_SWING_UP, [131, 124, 16, 16], false, 13, -13);
	this.swordSprite.addKeyframe(SWORD_SWING_UP, [148, 121, 8, 16], false, 0, -16);

	this.swordSprite.addAnimation();
	this.swordSprite.addKeyframe(SWORD_UP, [148, 121, 8, 16], false, 0, -16);
}

Link.prototype.updateAnimation = function()
{	


	if (!this.runningAnimation) {
		this.swordSprite.setVisibility(false);
	}
	if (this.runningAnimation) {
		if (this.Sprite.currentKeyframe >= this.Sprite.animations[this.Sprite.currentAnimation].length - 1 ) {
			this.swordSprite.setVisibility(false);
			setTimeout(() => {
				this.runningAnimation = false;
			}, 100);
			
			if (this.Sprite.currentAnimation == LINK_SWING_LEFT) {
				this.Sprite.setAnimation(LINK_STAND_LEFT);
				this.swordSprite.setAnimation(SWORD_LEFT);
			}
			else if (this.Sprite.currentAnimation == LINK_SWING_RIGHT) {
				this.Sprite.setAnimation(LINK_STAND_RIGHT);
				this.swordSprite.setAnimation(SWORD_RIGHT);
			}
			else if (this.Sprite.currentAnimation == LINK_SWING_DOWN) {
				this.Sprite.setAnimation(LINK_STAND_DOWN);
				this.swordSprite.setAnimation(SWORD_DOWN);
			}
			else if (this.Sprite.currentAnimation == LINK_SWING_UP) {
				this.Sprite.setAnimation(LINK_STAND_UP);
				this.swordSprite.setAnimation(SWORD_UP);
			}
		}
		return;
	}

	// Handle blocking (X key)
	if (keyboard[88]) {
	    if (this.Sprite.currentAnimation == LINK_STAND_LEFT || this.Sprite.currentAnimation == LINK_WALK_LEFT || this.Sprite.currentAnimation == LINK_BLOCK_LEFT) {
	        this.Sprite.setAnimation(LINK_BLOCK_LEFT);
	    } else if (this.Sprite.currentAnimation == LINK_STAND_RIGHT || this.Sprite.currentAnimation == LINK_WALK_RIGHT || this.Sprite.currentAnimation == LINK_BLOCK_RIGHT) {
	        this.Sprite.setAnimation(LINK_BLOCK_RIGHT);
	    } else if (this.Sprite.currentAnimation == LINK_STAND_DOWN || this.Sprite.currentAnimation == LINK_WALK_DOWN || this.Sprite.currentAnimation == LINK_BLOCK_DOWN) {
	        this.Sprite.setAnimation(LINK_BLOCK_DOWN);
	    } else if (this.Sprite.currentAnimation == LINK_STAND_UP || this.Sprite.currentAnimation == LINK_WALK_UP || this.Sprite.currentAnimation == LINK_BLOCK_UP) {
	        this.Sprite.setAnimation(LINK_BLOCK_UP);
	    }
	    this.isBlocking = true;
	    return;
	} else if (this.isBlocking) {
	    if (this.Sprite.currentAnimation == LINK_BLOCK_LEFT) {
	        this.Sprite.setAnimation(LINK_STAND_LEFT);
	    } else if (this.Sprite.currentAnimation == LINK_BLOCK_RIGHT) {
	        this.Sprite.setAnimation(LINK_STAND_RIGHT);
	    } else if (this.Sprite.currentAnimation == LINK_BLOCK_DOWN) {
	        this.Sprite.setAnimation(LINK_STAND_DOWN);
	    } else if (this.Sprite.currentAnimation == LINK_BLOCK_UP) {
	        this.Sprite.setAnimation(LINK_STAND_UP);
	    }
	    this.isBlocking = false;
		// this.isInvincible = true;
		// setTimeout(() => {
        //     this.isInvincible = false;
        // }, 1000);

	}

	if (keyboard[67]) { // Assuming "C" key for interaction
        if (this.checkInteraction()) { // ONLY RETURNS TRUE IF AN OBJECT IS PICKED UP
			this.Sprite.setAnimation(LINK_PICK_UP_LIGHT_ITEM);
		}
    } else if (Object.values(keyboard).some(key => key)) { // If any other key is pressed
        this.isHoldingItem = false; // Stop holding the item
        this.currentPickupItem = null; // Clear the picked-up item
    }

	if (keyboard[89] && !this.runningAnimation) {
		this.swordSwing();
		this.swordSprite.visible = true;
		return;
	}
	
    // Move Link sprite
	if(keyboard[37]) { // KEY_LEFT
		if (!this.levelManager.isCollision(this.Box.x -1, this.Box.y +0, this)) {
			if(this.Sprite.currentAnimation != LINK_WALK_LEFT)
				this.Sprite.setAnimation(LINK_WALK_LEFT);
			if(this.Sprite.x >= 1) {
				this.Sprite.x -= 1;
				this.Box.x -= 1;
			}
		}
		else {
			this.Sprite.setAnimation(LINK_STAND_LEFT);
		}
	
	}
	else if(keyboard[39]) { // KEY_RIGHT
		if (!this.levelManager.isCollision(this.Box.x +1, this.Box.y +0, this)) {
			if(this.Sprite.currentAnimation != LINK_WALK_RIGHT)
				this.Sprite.setAnimation(LINK_WALK_RIGHT);
			if(this.Sprite.x < 144) {
				this.Sprite.x += 1;
				this.Box.x += 1;
			}
		}
		else {
			this.Sprite.setAnimation(LINK_STAND_RIGHT);
		}
	}
	else if(keyboard[38]) { // KEY_UP
		if (!this.levelManager.isCollision(this.Box.x +0, this.Box.y -1, this)) {	
			if(this.Sprite.currentAnimation != LINK_WALK_UP)
				this.Sprite.setAnimation(LINK_WALK_UP);
			if(this.Sprite.y >= 1) {
				this.Sprite.y -= 1;
				this.Box.y -= 1;
			}
		}
		else {
			this.Sprite.setAnimation(LINK_STAND_UP);
		}
	}
	else if(keyboard[40]) { // KEY_DOWN
		if (!this.levelManager.isCollision(this.Box.x +0, this.Box.y +1, this)) {
			if(this.Sprite.currentAnimation != LINK_WALK_DOWN)
				this.Sprite.setAnimation(LINK_WALK_DOWN);
			if(this.Sprite.y < 112) {
				this.Sprite.y += 1;
				this.Box.y += 1;
			}
		}
		else {
			this.Sprite.setAnimation(LINK_STAND_DOWN);
		}
	}

	else if (!this.runningAnimation)
	{
		if(this.Sprite.currentAnimation == LINK_WALK_LEFT)
			this.Sprite.setAnimation(LINK_STAND_LEFT);
		if(this.Sprite.currentAnimation == LINK_WALK_RIGHT)
			this.Sprite.setAnimation(LINK_STAND_RIGHT);
		if(this.Sprite.currentAnimation == LINK_WALK_UP)
			this.Sprite.setAnimation(LINK_STAND_UP);
		if(this.Sprite.currentAnimation == LINK_WALK_DOWN)	
			this.Sprite.setAnimation(LINK_STAND_DOWN);
	}
	this.checkDrops();
	this.checkChangeLevel();

		// --- Sword hitbox update logic ---
	if (this.swordSprite.visible) {
	    // Get current keyframe data
	    const anim = this.swordSprite.animations[this.swordSprite.currentAnimation];
	    const keyframe = anim[this.swordSprite.currentKeyframe];
	    // Calculate sword hitbox position
	    const swordHitboxX = this.Sprite.x + (keyframe.ox || 0);
	    const swordHitboxY = this.Sprite.y + (keyframe.oy || 0);
	    const swordHitboxW = keyframe.sw;
	    const swordHitboxH = keyframe.sh;
	    // Update sword hitbox
	    this.hitboxSword.updatePosition(swordHitboxX, swordHitboxY);
	    this.hitboxSword.width = swordHitboxW;
	    this.hitboxSword.height = swordHitboxH;
	} else {
	    this.hitboxSword.updatePosition(-100, -100);
	    this.hitboxSword.width = 0;
	    this.hitboxSword.height = 0;
	}
}

Link.prototype.checkChangeLevel = function()
{
	if (this.Sprite.x == 0) {
		this.levelManager.changeLevel(-1, 0);
		this.Sprite.x = 142;
		this.Box.x = 146;
		return;
	}
	if (this.Sprite.x == 143) {
		this.levelManager.changeLevel(1, 0);
		this.Sprite.x = 1;
		this.Box.x = 4;
		return;
	}
	if (this.Sprite.y == 0) {
		this.levelManager.changeLevel(0, -1);
		this.Sprite.y = 110;
		this.Box.y = 112;
		return;
	}
	if (this.Sprite.y == 111) {
		this.levelManager.changeLevel(0, 1);
		this.Sprite.y = 1;
		this.Box.y = 2;
		return;
	}
}

Link.prototype.swordSwing = function() {

	this.swordSprite.x = this.Sprite.x;
	this.swordSprite.y = this.Sprite.y;

	this.runningAnimation = true;
	this.levelManager.soundManager.playSound("attack");
	if (this.Sprite.currentAnimation == LINK_WALK_LEFT || this.Sprite.currentAnimation == LINK_STAND_LEFT) {
		this.Sprite.setAnimation(LINK_SWING_LEFT);
		this.swordSprite.setAnimation(SWORD_SWING_LEFT);
	}
	else if (this.Sprite.currentAnimation == LINK_WALK_RIGHT || this.Sprite.currentAnimation == LINK_STAND_RIGHT) {
		this.Sprite.setAnimation(LINK_SWING_RIGHT);
		this.swordSprite.setAnimation(SWORD_SWING_RIGHT);
	}
	else if (this.Sprite.currentAnimation == LINK_WALK_UP || this.Sprite.currentAnimation == LINK_STAND_UP) {
		this.Sprite.setAnimation(LINK_SWING_UP);
		this.swordSprite.setAnimation(SWORD_SWING_UP);
	}
	else if (this.Sprite.currentAnimation == LINK_WALK_DOWN || this.Sprite.currentAnimation == LINK_STAND_DOWN) {
		this.Sprite.setAnimation(LINK_SWING_DOWN);
		this.swordSprite.setAnimation(SWORD_SWING_DOWN);
	}

}



Link.prototype.checkDrops = function() {
    // Check collision with all drop items in the current level
    for (let i = 0; i < this.levelManager.currentLevelDropItems.length; i++) {
        const dropItem = this.levelManager.currentLevelDropItems[i];

        const itemBox = {
            x: dropItem.Sprite.x,
            y: dropItem.Sprite.y,
            width: dropItem.Sprite.width,
            height: dropItem.Sprite.height
        };
        if (
            this.Box.x < itemBox.x + itemBox.width &&
            this.Box.x + this.Box.width > itemBox.x &&
            this.Box.y < itemBox.y + itemBox.height &&
            this.Box.y + this.Box.height > itemBox.y
        ) {
            if (dropItem.identity === 0) {
                if (this.currentHealth < this.maxHealth) {
                    this.currentHealth += 1;
					this.levelManager.toolbar.damage();
					this.levelManager.soundManager.playSound("small_heal");
                }
            } else if (dropItem.identity === 1) {
                this.rupeeCount += 1;
				this.levelManager.soundManager.playSound("rupee");

            } else if (dropItem.identity === 2) {
				this.currentHealth += 3;
				this.levelManager.toolbar.damage();
				this.levelManager.soundManager.playSound("big_heal");
				
			}

            this.levelManager.currentLevelDropItems.splice(i, 1);
            this.levelManager.currentLevelDropItemSprites.splice(i, 1);
            i--; // Adjust index after removal
        }
    }
}

Link.prototype.checkInteraction = function() {
    for (let i = 0; i < this.levelManager.currentLevelEntities.length; i++) {
        const entity = this.levelManager.currentLevelEntities[i];
        // Check if Link is near the entity
        if (
            this.Sprite.x < entity.Box.x + entity.Box.width &&
            this.Sprite.x + this.Sprite.width > entity.Box.x &&
            this.Sprite.y < entity.Box.y + entity.Box.height &&
            this.Sprite.y + this.Sprite.height > entity.Box.y
        ) {
            // Handle pickup
            if (entity instanceof Flower) {
                this.hasFlower = true;
				this.flowerHealth = 3;
                this.levelManager.currentLevelEntities.splice(i, 1); // Remove the flower from the level
                this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the flower sprite from the level
                this.currentPickupItem = entity; // Set the picked-up item
                this.isHoldingItem = true; // Mark as holding an item
				this.pickUpItemOffsetX = - 4;
				this.pickUpItemOffsetY = - 14;
				this.levelManager.soundManager.playSound("good");
				this.levelManager.text.write("You picked up a flower! It looks beautiful but also very fragile.")
                console.log("Picked up a flower!");
                return true;
            } else if (entity instanceof Lantern) {
                this.hasLantern = true;
                this.levelManager.currentLevelEntities.splice(i, 1); // Remove the lantern from the level
                this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the lantern sprite from the level
                this.currentPickupItem = entity; 
                this.isHoldingItem = true; 
				this.pickUpItemOffsetX = - 1;
				this.pickUpItemOffsetY = - 15;
				this.levelManager.soundManager.playSound("good");
				this.levelManager.text.write("You picked up a lantern! With  this you might see more in the dark!");
                console.log("Picked up a mysterious lantern! You can now see in the dark!");
                return true;
            } else if (entity instanceof Key) {
                switch (entity.id) {
					case 1:
						this.hasKey1 = true;
						color = "blue";
						break;
					case 2:
						this.hasKey2 = true;
						color = "purple"
						break;
					case 3:
						this.hasKey3 = true;
						color = "red";
						break;
					case 4:
						this.hasKey4 = true;
						color = "red";
						break;
				} 
                this.levelManager.currentLevelEntities.splice(i, 1); // Remove the lantern from the level
                this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the lantern sprite from the level
                this.currentPickupItem = entity; 
                this.isHoldingItem = true;
				this.pickUpItemOffsetX = 1;
				this.pickUpItemOffsetY = - 15;
				this.levelManager.text.write("You picked up a " + color + " key! Which door does this key open?");
				this.levelManager.soundManager.playSound("good");
                console.log("Picked up a Key!");
                return true;
            } else if (entity instanceof MapEntity) {
                this.hasMap = true;
                this.levelManager.currentLevelEntities.splice(i, 1); // Remove the lantern from the level
                this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the lantern sprite from the level
                this.currentPickupItem = entity; 
                this.isHoldingItem = true; 
				this.pickUpItemOffsetX = - 1;
				this.pickUpItemOffsetY = - 13;
				this.levelManager.text.write("You found up an old map! What secrets does it contain? Press M to open the map!");
				this.levelManager.soundManager.playSound("good");
                console.log("Picked up an old map!");
                return true;
            } else if (entity instanceof OldTree) {
				console.log("Does link have the flower? " + this.hasFlower);
				if (this.hasFlower === true) {
					this.hasFlower = false;
					this.hasKey1 = true; 
					this.currentPickupItem = new Key(0, 0, 8, 16, 1, this.levelManager);
					this.currentPickupItem.loadAnimations(); // Load the key's animations
					this.isHoldingItem = true; 
					this.pickUpItemOffsetX = 1;
					this.pickUpItemOffsetY = - 15;
					entity.Sprite.setAnimation(HAPPY_OLD_TREE);
					this.levelManager.soundManager.playSound("good");
					this.levelManager.text.write("Old Tree: Thank you, young hero! This flower is lovely. Take this blue key in return!");
					console.log("Gave the Old Tree a Flower! He gave you a Key!");
					return true;
				} else {
					this.levelManager.text.write("Old Tree: Ive lived in darkness so long. I just want to see a flower one more time!");
					console.log("You need a flower to get the key!");
				}
			}
			else if (entity instanceof Chest) {
				if (entity.Sprite.currentAnimation == CHEST_OPENED) {
					console.log("The chest is already opened!");
					return false;
				}
				if (this.levelManager.map.currentLevelIndex == 16) {
					this.levelManager.text.write("Vendor: Are you trying to rob me? The Key will now cost 5 rupees more!");
					this.levelManager.vendorPrice += 5;
				} else if (this.levelManager.map.currentLevelIndex == 21 && !this.hasKey4) {
					key = new Key(0, 0, 8, 16, 2, this.levelManager);
					key.id = 4;
					key.loadAnimations();
					this.hasKey4 = true;
					this.currentPickupItem = key; 
                	this.isHoldingItem = true;
					this.pickUpItemOffsetX = 1;
					this.pickUpItemOffsetY = - 15;
					this.levelManager.text.write("You picked up a red key! Which door does this key open?");
					this.levelManager.soundManager.playSound("good");
                	console.log("Picked up a Key!");
					entity.Sprite.setAnimation(CHEST_OPENED);
                	return true;

				} else if (this.levelManager.map.currentLevelIndex == 17 && !this.hasKey2) {
					key = new Key(0, 0, 8, 16, 2, this.levelManager);
					key.id = 2;
					key.loadAnimations();
					this.hasKey2 = true;
					this.currentPickupItem = key; 
                	this.isHoldingItem = true;
					this.pickUpItemOffsetX = 1;
					this.pickUpItemOffsetY = - 15;
					this.levelManager.text.write("You picked up a purple key! Which door does this key open?");
					this.levelManager.soundManager.playSound("good");
                	console.log("Picked up a Key!");
					entity.Sprite.setAnimation(CHEST_OPENED);
					this.levelManager.midbossDefeated = true;
                	return true;
				} else { 
					entity.Sprite.currentAnimation = CHEST_OPENED;
					chestItem = new DropItem(entity.Sprite.x + 4, entity.Sprite.y, 8, 16, 1, this.levelManager);
					chestItem.loadAnimations();
					chestItem.findValidLandingPosition(this.levelManager.map.collisionData, this.levelManager.currentLevelEntities);
					this.levelManager.currentLevelDropItems.push(chestItem);
					this.levelManager.currentLevelDropItemSprites.push(chestItem.Sprite);
					this.levelManager.soundManager.playSound("chest");
					return false;
				}
			}	
			else if (entity instanceof Vendor) {
				if (this.levelManager.firstTalkWithVendor || this.rupeeCount < this.levelManager.vendorPrice) {
					this.levelManager.text.write("Vendor: Hello, young hero! I love rupees. For " + this.levelManager.vendorPrice + " rupees I will sell you a key.");
					this.levelManager.firstTalkWithVendor = false;
					return false;
				}
				else if (!this.levelManager.firstTalkWithVendor && this.rupeeCount <this.levelManager.vendorPrice) {
					this.levelManager.text.write("Vendor: You do not have enough rupees to buy a key! You need " + this.levelManager.vendorPrice + " rupees!");
					console.log("Not enough rupees to buy a key!");
					return false;
				}
				else if (this.rupeeCount >= this.levelManager.vendorPrice) {
					this.rupeeCount -= this.levelManager.vendorPrice;
					this.hasKey3 = true; // Give the key
					this.currentPickupItem = new Key(0, 0, 8, 16, 2, this.levelManager);
					this.currentPickupItem.loadAnimations();
					this.isHoldingItem = true; 
					this.pickUpItemOffsetX = 1;
					this.pickUpItemOffsetY = - 15;
					this.levelManager.soundManager.playSound("good");
					this.levelManager.text.write("Vendor: Thank you for your purchase! Here is a red key!");
					console.log("Bought a key from the vendor!");
					return true;
				}
			}
			else if (entity instanceof Door) {
				if (this.hasKey1 && this.levelManager.map.currentLevelIndex == 3) {
					this.hasKey1 = false; // Use the key
					TouchList.hasFlower = false;
					entity.Sprite.setAnimation(DOOR_OPENED);
					this.levelManager.door1opened = true;
					this.levelManager.soundManager.playSound("door");
					console.log("Used the key to open the door!");
					this.levelManager.currentLevelEntities.splice(i, 1); // Remove the flower from the level
                	this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the flower sprite from the level
				} else if (this.hasKey2 && this.levelManager.map.currentLevelIndex == 11) {
					this.hasKey2 = false; // Use the key
					entity.Sprite.setAnimation(DOOR_OPENED);
					this.levelManager.door2opened = true;
					this.levelManager.soundManager.playSound("door");
					console.log("Used the key to open the door!");
					this.levelManager.currentLevelEntities.splice(i, 1); // Remove the flower from the level
					this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the flower sprite from the level
				} else if (this.levelManager.map.currentLevelIndex == 8) {
					if (this.hasKey3 && this.hasKey4) {
						this.hasKey3 = false; // Use the key
						this.hasKey4 = false; // Use the key
						entity.Sprite.setAnimation(DOOR_OPENED);
						this.levelManager.door3opened = true;
						this.levelManager.soundManager.playSound("door");
						console.log("Used the key to open the door!");
						this.levelManager.currentLevelEntities.splice(i, 1); // Remove the flower from the level
						this.levelManager.currentLevelEntitySprites.splice(i, 1); // Remove the flower sprite from the level
					} else {
						this.levelManager.text.write("It seems like this door has two keyholes!");
						
					}
				}
				else {
					this.levelManager.text.write("This door is locked! You do not seem to have the correct key to open it!");
				}
			}

        }
    }
    return false;
};


Link.prototype.drawPickupItem = function() {
    if (this.isHoldingItem && this.currentPickupItem) {
        this.currentPickupItem.Sprite.x = this.Sprite.x + this.pickUpItemOffsetX; // Align with Link's position
        this.currentPickupItem.Sprite.y = this.Sprite.y + this.pickUpItemOffsetY; // Draw above Link
        this.currentPickupItem.Sprite.draw(); // Draw the item
    }
};


Link.prototype.handleDamage = function(hitbox) {
    // If Link is currently invincible, ignore damage
    if (this.isInvincible || this.isCheatInvincible) return;

    // Calculate overlap on each side
    const dx = (this.Box.x + this.Box.width / 2) - (hitbox.x + hitbox.width / 2);
    const dy = (this.Box.y + this.Box.height / 2) - (hitbox.y + hitbox.height / 2);

    let direction = null;
    if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx > 0 ? "LEFT" : "RIGHT";
    } else {
        direction = dy > 0 ? "UP" : "DOWN";
    }

    // Check if Link is blocking in the direction of the attack
    if (this.isBlocking) {
        if (
            (direction === "LEFT" && this.Sprite.currentAnimation === LINK_BLOCK_LEFT) ||
            (direction === "RIGHT" && this.Sprite.currentAnimation === LINK_BLOCK_RIGHT) ||
            (direction === "UP" && this.Sprite.currentAnimation === LINK_BLOCK_UP) ||
            (direction === "DOWN" && this.Sprite.currentAnimation === LINK_BLOCK_DOWN)
        ) {
            // Blocked, no damage
			this.levelManager.soundManager.playSound("block");
            return;
        }
    }

    // Standard AABB collision check
    if (
        hitbox.x - 1 < this.Box.x + this.Box.width &&
        hitbox.x + hitbox.width + 1 > this.Box.x &&
        hitbox.y - 1 < this.Box.y + this.Box.height &&
        hitbox.y + hitbox.height + 1 > this.Box.y
    ) {
        // Take damage
        this.currentHealth -= 1;
        if (this.currentHealth <= 0) {
			this.currentHealth = 0;
			handleLinkDeath();
		}
		this.levelManager.soundManager.playSound("hit");

        this.levelManager.toolbar.damage();

		if (this.hasFlower && this.flowerHealth > 0) {
			this.flowerHealth -= 1;
			if (this.flowerHealth == 0) {
				console.log("The flower was destroyed!");
				this.levelManager.text.write("Oh no! The flower was destroyed! Maybe there is another one where you found this one.");
				this.hasFlower = false;
			}
		}

        // Set invincibility frames (e.g., 1 second)
        this.isInvincible = true;
        setTimeout(() => {
            this.isInvincible = false;
        }, 1000); // 1000 ms = 1 second
    } else {
        return;
    }
};

Link.prototype.draw = function() {
    this.Sprite.draw(); // Draw Link
	this.swordSprite.draw(); // Draw Link's sword
    this.drawPickupItem(); // Draw the picked-up item above Link
};

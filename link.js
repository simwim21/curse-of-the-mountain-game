
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

const LINK_FALLING = 12;



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

	this.levelManager = world;
	this.levelManager.addLink(this);

	this.runningAnimation = false;
	this.runningAnimationCouter = 0;

	this.maxHealth = 5;
	this.currentHealth = this.maxHealth;

	this.Box = new Box(x + 3, y + 1, 10, 15);
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

	this.Sprite.setAnimation(LINK_STAND_LEFT);


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

	if (keyboard[89] && !this.runningAnimation) {
		this.swordSwing();
		this.swordSprite.visible = true;
		return;
	}
	
    // Move Link sprite
	if(keyboard[37] && !this.levelManager.isCollision(this.Box.x -1, this.Box.y +0, this)) // KEY_LEFT
	{
		if(this.Sprite.currentAnimation != LINK_WALK_LEFT)
			this.Sprite.setAnimation(LINK_WALK_LEFT);
		if(this.Sprite.x >= 1) {
			this.Sprite.x -= 1;
			this.Box.x -= 1;
		}

	}
	else if(keyboard[39] && !this.levelManager.isCollision(this.Box.x +1, this.Box.y +0, this)) // KEY_RIGHT
	{
		if(this.Sprite.currentAnimation != LINK_WALK_RIGHT)
			this.Sprite.setAnimation(LINK_WALK_RIGHT);
		if(this.Sprite.x < 144) {
			this.Sprite.x += 1;
			this.Box.x += 1;
		}
	}
	else if(keyboard[38] && !this.levelManager.isCollision(this.Box.x +0, this.Box.y -1, this)) // KEY_UP	
	{
		if(this.Sprite.currentAnimation != LINK_WALK_UP)
			this.Sprite.setAnimation(LINK_WALK_UP);
		if(this.Sprite.y >= 1) {
			this.Sprite.y -= 1;
			this.Box.y -= 1;
		}
	}
	else if (keyboard[40] && !this.levelManager.isCollision(this.Box.x +0, this.Box.y +1, this)) // KEY_DOWN
	{
		if(this.Sprite.currentAnimation != LINK_WALK_DOWN)
			this.Sprite.setAnimation(LINK_WALK_DOWN);
		if(this.Sprite.y < 112) {
			this.Sprite.y += 1;
			this.Box.y += 1;
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

	this.checkChangeLevel();
}

Link.prototype.checkChangeLevel = function()
{
	if (this.Sprite.x == 0) { // Links
		console.log("Link x == 0");
		this.levelManager.changeLevel(-1, 0);
		this.Sprite.x = 143;
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
		this.Sprite.y = 111;
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

Link.prototype.endSword = function() {
	if (this.Sprite.currentKeyframe >= this.Sprite.animations[this.Sprite.currentAnimation].length - 1 ) {
			this.runningAnimation = false;
			setTimeout(() => {
				this.swordSprite.setVisibility(false);
			}, 300);
			
			if (this.Sprite.currentAnimation == LINK_SWING_LEFT) {
				this.Sprite.setAnimation(LINK_STAND_LEFT);
				this.swordSprite.setAnimation(SWORD_SWING_LEFT);
			}
			else if (this.Sprite.currentAnimation == LINK_SWING_RIGHT) {
				this.Sprite.setAnimation(LINK_STAND_RIGHT);
				this.swordSprite.setAnimation(SWORD_SWING_RIGHT);
			}
			else if (this.Sprite.currentAnimation == LINK_SWING_DOWN) {
				this.Sprite.setAnimation(LINK_STAND_DOWN);
				this.swordSprite.setAnimation(SWORD_SWING_DOWN);
			}
			else if (this.Sprite.currentAnimation == LINK_SWING_UP) {
				this.Sprite.setAnimation(LINK_STAND_UP);
				this.swordSprite.setAnimation(SWORD_SWING_UP);
			}
		}
}



Link.prototype.checkHurtbox = function()
{

}

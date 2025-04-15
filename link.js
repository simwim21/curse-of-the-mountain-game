
const LINK_STAND_LEFT = 0;
const LINK_STAND_RIGHT = 1;
const LINK_STAND_DOWN = 2;
const LINK_STAND_UP = 3;
const LINK_WALK_LEFT = 4;
const LINK_WALK_RIGHT = 5;
const LINK_WALK_DOWN = 6;
const LINK_WALK_UP = 7;
const LINK_SWING_LEFT = 9;
const LINK_SWING_RIGHT = 10;
const LINK_SWING_DOWN = 11;
const LINK_SWING_UP = 12;
const LINK_FALLING = 13;


// Link. Draws Link using the current keyframe of a selected animation.

function Link(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/link.png");
    this.linkSprite = new Sprite(x, y, width, height, fps, this.texture);

	this.levelManager = world;
	this.levelManager.addEntity(this);

}

Link.prototype.loadAnimations = function() 
{

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_STAND_LEFT, [35, 11, 16, 16]);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_STAND_RIGHT, [35, 11, 16, 16], true);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_STAND_DOWN, [431, 121, 16, 16]);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_STAND_UP, [414, 121, 16, 16]);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_WALK_LEFT, [35, 11, 16, 16]);
	this.linkSprite.addKeyframe(LINK_WALK_LEFT, [52, 11, 16, 16]);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_WALK_RIGHT, [35, 11, 16, 16], true);
	this.linkSprite.addKeyframe(LINK_WALK_RIGHT, [52, 11, 16, 16], true);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_WALK_DOWN, [1, 11, 16, 16]);
	this.linkSprite.addKeyframe(LINK_WALK_DOWN, [1, 11, 16, 16], true); // TODO: MIRROR

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_WALK_UP, [18, 11, 16, 16]);
	this.linkSprite.addKeyframe(LINK_WALK_UP, [18, 11, 16, 16], true); // TODO: MIRROR

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_SWING_LEFT, [169, 137, 16, 16]);
	this.linkSprite.addKeyframe(LINK_SWING_LEFT, [199, 137, 16, 16]);
	this.linkSprite.addKeyframe(LINK_SWING_LEFT, [232, 137, 16, 16]);

	this.linkSprite.addAnimation();
	this.linkSprite.addKeyframe(LINK_SWING_RIGHT, [169, 137, 16, 16], true);
	this.linkSprite.addKeyframe(LINK_SWING_RIGHT, [199, 137, 16, 16], true);
	this.linkSprite.addKeyframe(LINK_SWING_RIGHT, [232, 137, 16, 16], true);

	// this.linkSprite.addAnimation();
	// this.linkSprite.addKeyframe(LINK_FALLING, [253, 121, 16, 16]);
	// this.linkSprite.addKeyframe(LINK_FALLING, [270, 121, 16, 16], true);
	// this.linkSprite.addKeyframe(LINK_FALLING, [287, 121, 16, 16]);

    this.linkSprite.setAnimation(LINK_STAND_LEFT);


}

Link.prototype.updateAnimation = function()
{
    // Move Link sprite
	if(keyboard[37] && !this.levelManager.isCollision(this.linkSprite.x -1, this.linkSprite.y +0, this)) // KEY_LEFT
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_LEFT)
			this.linkSprite.setAnimation(LINK_WALK_LEFT);
		if(this.linkSprite.x >= 1)
			this.linkSprite.x -= 1;
	}
	else if(keyboard[39] && !this.levelManager.isCollision(this.linkSprite.x +1, this.linkSprite.y +0, this)) // KEY_RIGHT
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_RIGHT)
			this.linkSprite.setAnimation(LINK_WALK_RIGHT);
		if(this.linkSprite.x < 144)
			this.linkSprite.x += 1;
	}
	else if(keyboard[38] && !this.levelManager.isCollision(this.linkSprite.x +0, this.linkSprite.y -1, this)) // KEY_UP	
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_UP)
			this.linkSprite.setAnimation(LINK_WALK_UP);
		if(this.linkSprite.y >= 1)
			this.linkSprite.y -= 1;
	}
	else if (keyboard[40] && !this.levelManager.isCollision(this.linkSprite.x +0, this.linkSprite.y +1, this)) // KEY_DOWN
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_DOWN)
			this.linkSprite.setAnimation(LINK_WALK_DOWN);
		if(this.linkSprite.y < 112)
			this.linkSprite.y += 1;
	}
    
	else
	{
		if(this.linkSprite.currentAnimation == LINK_WALK_LEFT)
			this.linkSprite.setAnimation(LINK_STAND_LEFT);
		if(this.linkSprite.currentAnimation == LINK_WALK_RIGHT)
			this.linkSprite.setAnimation(LINK_STAND_RIGHT);
		if(this.linkSprite.currentAnimation == LINK_WALK_UP)
			this.linkSprite.setAnimation(LINK_STAND_UP);
		if(this.linkSprite.currentAnimation == LINK_WALK_DOWN)	
			this.linkSprite.setAnimation(LINK_STAND_DOWN);
	}

	

	this.checkChangeLevel();
}

Link.prototype.checkChangeLevel = function()
{
	if (this.linkSprite.x == 0) {
		this.levelManager.changeLevel(-1, 0);
		this.linkSprite.x = 143;
		return;
	}
	if (this.linkSprite.x == 144) {
		this.levelManager.changeLevel(1, 0);
		this.linkSprite.x = 1;
		return;
	}
	if (this.linkSprite.y == 0) {
		this.levelManager.changeLevel(0, -1);
		this.linkSprite.y = 111;
		return;
	}
	if (this.linkSprite.y == 112) {
		this.levelManager.changeLevel(0, 1);
		this.linkSprite.y = 1;
		return;
	}
}

Link.prototype.checkHurtbox = function()
{

}

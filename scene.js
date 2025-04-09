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


// Scene. Updates and draws a single scene of the game.

function Scene()
{

	// Loading background image
    this.backgroundImage = new Image(); // Create a new Image object
    this.backgroundImage.src = 'levels/entry_test.png'; // Set the source to your background image path

	// Loading spritesheets
	var link = new Texture("images/sprites/link.png");

	// Prepare Link sprite & its animations
	this.linkSprite = new Sprite(72, 64, 16, 16, 7, link);

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





	this.linkSprite.setAnimation(LINK_STAND_LEFT);
	
	// Store current time
	this.currentTime = 0

}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Move Link sprite
	if(keyboard[37] || keyboard[65]) // KEY_LEFT
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_LEFT)
			this.linkSprite.setAnimation(LINK_WALK_LEFT);
		if(this.linkSprite.x >= 1)
			this.linkSprite.x -= 1;
	}
	else if(keyboard[39] || keyboard[68]) // KEY_RIGHT
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_RIGHT)
			this.linkSprite.setAnimation(LINK_WALK_RIGHT);
		if(this.linkSprite.x < 144)
			this.linkSprite.x += 1;
	}
	else if(keyboard[38] || keyboard[87]) // KEY_UP	
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_UP)
			this.linkSprite.setAnimation(LINK_WALK_UP);
		if(this.linkSprite.y >= 2)
			this.linkSprite.y -= 1;
	}
	else if (keyboard[40] || keyboard[83]) // KEY_DOWN
	{
		if(this.linkSprite.currentAnimation != LINK_WALK_DOWN)
			this.linkSprite.setAnimation(LINK_WALK_DOWN);
		if(this.linkSprite.y < 127)
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

	// // SWORD SLASH
	// if (keyboard[89] && this.linkSprite.currentAnimation == LINK_STAND_LEFT || this.linkSprite.currentAnimation == LINK_WALK_LEFT) // KEY_Y
	// {
	// 	this.linkSprite.setAnimation(LINK_SWING_LEFT);
	// }
	
	// Update sprites
	this.linkSprite.update(deltaTime);
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(255, 0, 255)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);

	// Draw link sprite
	this.linkSprite.draw();
		

}


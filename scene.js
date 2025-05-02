
// Scene. Updates and draws a single scene of the game.

function Scene()
{
	this.map = new Map();
	this.map.loadMapData();

	

	this.levelManager = new LevelManager(this.map);
	this.levelManager.levelInitializer();

	this.link = new Link(72, 64, 16, 16, 7, this.levelManager);
	this.link.loadAnimations();

	// this.buzzblob = new Buzzblob(50, 50, 16, 16, 7, this.levelManager);
	// this.buzzblob.loadAnimations();

	// this.firepit = new Firepit(16, 16, 16, 16, 7, this.levelManager);
	// this.firepit.loadAnimations();
	
	// Store current time
	this.currentTime = 0

	this.toolbar = new Toolbar(this.link);

	this.startGame = true;
}


Scene.prototype.update = function(deltaTime)
{

	if (window.paused) {
		console.log("Game is paused. No updates will occur.");
		return;
	}

	// Keep track of time
	this.currentTime += deltaTime;
	
	// Update Map

	this.levelManager.updateSprites(deltaTime);

	// Update Player
	this.link.updateAnimation(this.map.collisionData);
	this.link.Sprite.update(deltaTime);
	this.link.swordSprite.update(deltaTime);

}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(255, 0, 255)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Tiles Rendering
	this.map.renderTiles();
	this.toolbar.draw();

	// Draw sprites
	this.levelManager.drawSprites();

	// Draw Link
	this.link.Sprite.draw();
	this.link.swordSprite.draw();

}


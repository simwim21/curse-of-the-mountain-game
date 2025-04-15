
// Scene. Updates and draws a single scene of the game.

function Scene()
{
	this.map = new Map();
	this.map.loadMapData('levels/map.json');

	this.levelManager = new LevelManager(this.map);
	this.levelManager.levelInitializer();

	this.link = new Link(72, 64, 16, 16, 7, this.levelManager);
	this.link.loadAnimations();

	this.buzzblob = new Buzzblob(50, 50, 16, 16, 7, this.levelManager);
	this.buzzblob.loadAnimations();
	
	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Update Map

	this.link.updateAnimation(this.map.collisionData);
	this.buzzblob.updateAnimation(this.map.collisionData);
	


	// Update sprites
	this.link.linkSprite.update(deltaTime);
	this.buzzblob.BuzzblobSprite.update(deltaTime * 0.5);
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

	// Draw link sprite
	this.buzzblob.BuzzblobSprite.draw();
	this.link.linkSprite.draw();

	console.log("Link X: " + this.link.linkSprite.x + " Link Y: " + this.link.linkSprite.y);
}


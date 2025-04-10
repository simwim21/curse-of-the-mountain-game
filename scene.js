
// Scene. Updates and draws a single scene of the game.

function Scene()
{

	// Loading background image
    this.backgroundImage = new Image(); // Create a new Image object
    this.backgroundImage.src = 'levels/entry_test.png'; // Set the source to your background image path

	this.link = new Link(72, 64, 16, 16, 7);
	this.link.loadAnimations();

	this.buzzblob = new Buzzblob(50, 50, 16, 16, 7);
	this.buzzblob.loadAnimations();
	
	// Store current time
	this.currentTime = 0

}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	this.link.updateAnimation();
	this.buzzblob.updateAnimation();
	
	// Update sprites
	this.link.linkSprite.update(deltaTime);
	this.buzzblob.BuzzblobSprite.update(deltaTime);
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(255, 0, 255)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw link sprite
	this.link.linkSprite.draw();
	this.buzzblob.BuzzblobSprite.draw();
		

}


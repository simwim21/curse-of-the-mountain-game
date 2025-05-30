// Scene. Updates and draws a single scene of the game.

function Scene()
{
	this.map = new Map();
	this.map.loadMapData();

	this.levelManager = new LevelManager(this.map);
	this.levelManager.levelInitializer();

	this.link = new Link(72, 80, 16, 16, 7, this.levelManager);
	this.link.loadAnimations();
	
	// Store current time
	this.currentTime = 0

	this.toolbar = new Toolbar(this.link);
	this.text = new Text();
	this.mapOverlay = new MapOverlay();
	this.showMapOverlay = false;

	this.levelManager.addToolbar(this.toolbar);
	this.levelManager.addText(this.text);

	this.mask = new Mask(document.getElementById("game-layer"), this.link, this.levelManager);

	this.soundManager = new SoundManager();
	this.soundManager.addLink(this.link);
	this.levelManager.addSoundManager(this.soundManager);

	this.startGame = true;
}


Scene.prototype.update = function(deltaTime)
{
    // If text box is active, only update text and ignore all other input/game logic
    if (this.text.isActive) {
        this.text.update();
        return;
    }

	if (!this.soundManager.suite.isPlaying) this.soundManager.playSuite();

    // Keep track of time
    this.currentTime += deltaTime;

    // Cheats
    if (keyboard[73]) {
        this.link.hasKey1 = true;
        this.link.hasKey2 = true;
        this.link.hasKey3 = true;
        this.link.hasKey4 = true;

		this.link.rupeeCount = 50;

        // this.link.hasFlower = true;
        this.link.flowerHealth = 3;
        this.link.hasLantern = true;
        this.link.hasMap = true;
    }
    if (keyboard[72]) this.link.currentHealth = this.link.maxHealth;
    if (keyboard[74]) this.link.currentHealth = 1;
    if (keyboard[71]) this.link.isCheatInvincible = true;
    if (keyboard[70]) this.link.isCheatInvincible = false;
	if (keyboard[77]) this.levelManager.changeLevel(0, 0, 17);
	if (keyboard[66]) this.levelManager.changeLevel(0, 0, 15);

    // MapOverlay
    this.showMapOverlay = keyboard[77] && this.levelManager.link.hasMap;

    // Update Map
    this.levelManager.updateSprites(deltaTime);

    // Update Player
    this.link.updateAnimation(this.map.collisionData);
    this.link.Sprite.update(deltaTime);
    this.link.swordSprite.update(deltaTime);

    this.text.update();
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
	


	// Draw sprites
	this.levelManager.drawSprites();

	// Draw Link
	this.link.draw();

	// Draw Mask
	this.mask.render();

	// Draw Map
	if (this.showMapOverlay) {
        this.mapOverlay.paintMap();
    }
	this.toolbar.draw();
	this.text.draw();
}


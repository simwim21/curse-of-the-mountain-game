// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var scene = new Scene();
var previousTimestamp;
var keyboard = [];
var interacted;
window.paused = false; // Tracks whether the game is paused

// Control keyboard events

function keyDown(keycode)
{
    if (keycode.which >= 0 && keycode.which < 256)
        keyboard[keycode.which] = true;

    // Toggle pause when "P" is pressed
    if (keycode.which === 80) { // Keycode for "P"
        window.paused = !window.paused;
        console.log(window.paused ? "Game Paused" : "Game Resumed");
    }
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function click()
{
	interacted = true;
}

// Initialization

function init()
{
	for(var i=0; i<256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
    if (window.paused) {
        // If paused, skip updating and drawing
        window.requestAnimationFrame(frameUpdate);
		console.log("Game is paused. No updates or drawing will occur.");
        return;
    }

    var bUpdated = false;
    var deltaTime = timestamp - previousTimestamp;
    
    while (deltaTime > TIME_PER_FRAME)
    {
        bUpdated = true;
        scene.update(TIME_PER_FRAME);
        previousTimestamp += TIME_PER_FRAME;
        deltaTime = timestamp - previousTimestamp;
    }
    if (bUpdated)
        scene.draw();

    window.requestAnimationFrame(frameUpdate);
}



// Init and launch game loop
init();
frameUpdate(previousTimestamp);
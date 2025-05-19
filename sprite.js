LEFT = 0;
RIGHT = 1;
UP = 2;
DOWN = 3;
// Sprite. Draws a sprite using the current keyframe of a selected animation.

function Sprite(x, y, width, height, fps, spritesheet)
{
	this.x = x
	this.y = y
	this.width = width
	this.height = height

	this.timePerKeyframe = 1000 / fps;
	
	this.currentAnimation = 0;
	this.currentKeyframe = 0;
	this.animations = [];
	this.timeInKeyframe = 0;
	
	this.spritesheet = spritesheet;

    this.visible = true;
}


// Add an empty animation

Sprite.prototype.addAnimation = function ()
{
	this.animations.push([]);
	
	return this.animations.length-1;
}

// Return number of available animations

Sprite.prototype.numAnimation = function ()
{
	return this.animations.length;
}

Sprite.prototype.setVisibility = function (visible) {
    this.visible = visible;
}

// Add a keyframe to animation animationId. Keyframe must be an array [sx, sy, sWidth, sHieght]
// that defines the rectangle of the keyframe inside the spritesheet
// (sx, sy) = Minimum coordinates of the rectangle
// (sWidth, sHeight) = Size of rectangle

Sprite.prototype.addKeyframe = function (animationIndex, frameData, mirrored = false, offsetX = 0, offsetY = 0) {
    let [sx, sy, sw, sh] = frameData;

    if (animationIndex >= 0 && animationIndex < this.animations.length) {
        this.animations[animationIndex].push({
            sx: sx,
            sy: sy,
            sw: sw,
            sh: sh,
            mirrored: mirrored,
            ox: offsetX,
            oy: offsetY
        });
    }
};

// Set new animation. Current keyframe and time spent in it are reset

Sprite.prototype.setAnimation = function (animationId)
{
	if(animationId >= 0 && animationId < this.animations.length)
	{
		this.currentAnimation = animationId;
		this.currentKeyframe = 0;
		this.timeInKeyframe = 0;
	}
}

// Updates animation by changing current keyframe according to the time passed (deltaTime)

Sprite.prototype.update = function(deltaTime)
{
	if(this.currentAnimation >= 0 && this.currentAnimation < this.animations.length)
	{
		this.timeInKeyframe += deltaTime;
		while(this.timeInKeyframe > this.timePerKeyframe)
		{
			this.timeInKeyframe -= this.timePerKeyframe;
			this.currentKeyframe++;
			if(this.currentKeyframe >= this.animations[this.currentAnimation].length)
				this.currentKeyframe = 0;
		}
	}
}

// Draw sprite using current keyframe from current animation

Sprite.prototype.draw = function ()
{
    // Check that current animation & keyframe ids are valid

    if (!this.visible) {
        return;
    }

    if (this.currentAnimation >= this.animations.length)
        return;
    if (this.currentKeyframe >= this.animations[this.currentAnimation].length)
        return;

    // Get canvas and context
    var canvas = document.getElementById("game-layer");
    var context = canvas.getContext("2d");

    context.imageSmoothingEnabled = false;

    // Get current keyframe
    var keyframe = this.animations[this.currentAnimation][this.currentKeyframe];
    var { sx, sy, sw, sh, mirrored, ox, oy } = keyframe;

    context.save();

    if (mirrored) {
        context.scale(-1, 1); // Flip horizontally
        context.drawImage(this.spritesheet.img,
                          sx, sy, sw, sh,
                          -this.x - sw + ox, this.y + oy, sw, sh);
    } else {
        context.drawImage(this.spritesheet.img,
                          sx, sy, sw, sh,
                          this.x + ox, this.y + oy, sw, sh);
    }


    context.restore();
}


BUTTON_CLOSED = 0;
BUTTON_OPENED = 1;

// Button

function Button(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(0, 0, 0, 0); // Create a box for collision detection
}

Button.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BUTTON_CLOSED, [899, 558, 16, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(BUTTON_OPENED, [933, 558, 16, 16]);

    if (this.levelManager.buttonPressed) {
        this.Sprite.setAnimation(BUTTON_OPENED);
        return;
    }
    else {
        this.Sprite.setAnimation(BUTTON_CLOSED);
    }
    
}

Button.prototype.updateAnimation = function(collisionData) {
    // Check if Link is standing on the button
    

    if (this.levelManager.buttonPressed) return;
    
    const link = this.levelManager.link;
    const linkBox = link.Box;
    const buttonBox = {
        x: this.Sprite.x,
        y: this.Sprite.y,
        width: this.Sprite.width,
        height: this.Sprite.height
    };

    // Standard AABB collision check
    const isOverlapping =
        linkBox.x < buttonBox.x + buttonBox.width &&
        linkBox.x + linkBox.width > buttonBox.x &&
        linkBox.y < buttonBox.y + buttonBox.height &&
        linkBox.y + linkBox.height > buttonBox.y;

    if (isOverlapping) {
        this.levelManager.soundManager.playSound("button");
        this.Sprite.setAnimation(BUTTON_OPENED);
        this.levelManager.buttonPressed = true;
    }
};
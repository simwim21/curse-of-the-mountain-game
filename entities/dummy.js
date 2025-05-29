// Dummy

function Dummy(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, height, width);

    this.x = x;
    this.y = y;

    this.uncovered = false;
}

Dummy.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [387, 484, 16, 16]);


    if (this.levelManager.buttonPressed) {
        this.Sprite.x = -100;
        this.Sprite.y = -100;
        this.Box.x = -100;
        this.Box.y = -100;
        this.uncovered = true;
    }
    else {
        this.Sprite.setAnimation(0);
    }
    
}

Dummy.prototype.updateAnimation = function(collisionData) {
    if (this.uncovered) {
        this.checkStairs();
    }

    if (!this.levelManager.buttonPressed) this.spikes();
    
    return;
}

Dummy.prototype.checkStairs = function() {
    // Check if Link is standing on the button
    const link = this.levelManager.link;
    const linkBox = link.Box;
    const dummyBox = {
        x: this.x,
        y: this.y,
        width: this.Sprite.width,
        height: this.Sprite.height
    };

    // Standard AABB collision check
    const isOverlapping =
        linkBox.x < dummyBox.x + dummyBox.width &&
        linkBox.x + linkBox.width > dummyBox.x &&
        linkBox.y < dummyBox.y + dummyBox.height &&
        linkBox.y + linkBox.height > dummyBox.y;

    if (isOverlapping) {
        if (this.levelManager.map.currentLevelIndex == 7) this.levelManager.changeLevel(0, 0, 19);
        else if (this.levelManager.map.currentLevelIndex == 19) this.levelManager.changeLevel(0, 0, 7);
        
        this.levelManager.link.Sprite.x += 20;
        this.levelManager.link.Box.x += 20;
    } 
    
}

Dummy.prototype.spikes = function() {
    const link = this.levelManager.link;
    const linkBox = link.Sprite;
    const dummyBox = this.Box;

    // Standard AABB collision check
    const isOverlapping =
        linkBox.x < dummyBox.x + dummyBox.width &&
        linkBox.x + linkBox.width > dummyBox.x &&
        linkBox.y < dummyBox.y + dummyBox.height &&
        linkBox.y + linkBox.height > dummyBox.y;

    if (isOverlapping) {
        // Call Link's handleDamage function, passing the dummy's box as the source
        link.handleDamage(dummyBox);
    }
};
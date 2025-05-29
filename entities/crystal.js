function Crystal(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, height, width);
}

Crystal.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [387, 484, 16, 16]);

    this.Sprite.setAnimation(0);
    
}

Crystal.prototype.updateAnimation = function(collisionData) {

    if (this.levelManager.buttonPressed) {
        this.Sprite.x = -100;
        this.Sprite.y = -100;
        this.Box.x = -100;
        this.Box.y = -100;
        this.uncovered = true;
        return;
    }

    this.spikes();
    return;
}

Crystal.prototype.spikes = function() {
    const link = this.levelManager.link;
    const linkBox = link.Sprite;
    const dummyBox = this.Box;

    const isOverlapping =
        linkBox.x < dummyBox.x + dummyBox.width &&
        linkBox.x + linkBox.width > dummyBox.x &&
        linkBox.y < dummyBox.y + dummyBox.height &&
        linkBox.y + linkBox.height > dummyBox.y;

    if (isOverlapping) {
        link.handleDamage(dummyBox);
    }
};
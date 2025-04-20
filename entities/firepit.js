
const FIREPIT = 0;

// Firepit

function Firepit(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

}

Firepit.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(FIREPIT, [810, 521, 16, 16]);
    this.Sprite.addKeyframe(FIREPIT, [827, 521, 16, 16]);
    this.Sprite.addKeyframe(FIREPIT, [844, 521, 16, 16]);
    this.Sprite.addKeyframe(FIREPIT, [861, 521, 16, 16]);

    this.Sprite.setAnimation(FIREPIT);

}

Firepit.prototype.updateAnimation = function(collisionData) {
    return;
}


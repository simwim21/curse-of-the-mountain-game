
const FIREPIT = 0;

// Firepit

function Firepit(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.FirepitSprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.levelManager.addEntity(this);
}

Firepit.prototype.loadAnimations = function() 
{
    this.FirepitSprite.addAnimation();
    this.FirepitSprite.addKeyframe(FIREPIT, [810, 521, 16, 16]);
    this.FirepitSprite.addKeyframe(FIREPIT, [827, 521, 16, 16]);
    this.FirepitSprite.addKeyframe(FIREPIT, [844, 521, 16, 16]);
    this.FirepitSprite.addKeyframe(FIREPIT, [861, 521, 16, 16]);

    this.FirepitSprite.setAnimation(FIREPIT);

}



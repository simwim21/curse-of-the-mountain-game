CHEST_CLOSED = 0;
CHEST_OPENED = 1;

// Chest

function Chest(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

Chest.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(CHEST_CLOSED, [899, 613, 16, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(CHEST_OPENED, [916, 613, 16, 16]);

    this.Sprite.setAnimation(CHEST_CLOSED);


}

Chest.prototype.updateAnimation = function(collisionData) {
    return;
}
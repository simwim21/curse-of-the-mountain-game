// Old Tree



function Vendor(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/npcs.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

Vendor.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [1, 11, 16, 16]);

    this.Sprite.setAnimation(0);

}

Vendor.prototype.updateAnimation = function(collisionData) {
    return;
}
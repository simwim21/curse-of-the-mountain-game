// Old Tree

function Lantern(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/items/Weapons_Items_HUD.png");
    this.Sprite = new Sprite(x + 3, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

Lantern.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [406, 264, 9, 16]);

    this.Sprite.setAnimation(0);

}

Lantern.prototype.updateAnimation = function(collisionData) {
    return;
}
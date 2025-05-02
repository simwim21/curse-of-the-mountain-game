// Old Tree

function Mushroom(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/items/Weapons_Items_HUD.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

Mushroom.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [229, 1, 16, 16]);

    this.Sprite.setAnimation(0);

}

Mushroom.prototype.updateAnimation = function(collisionData) {
    return;
}
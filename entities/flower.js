// Flower Statue

function Flower(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/items/Weapons_Items_HUD.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

Flower.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [137, 369, 16, 16]);

    this.Sprite.setAnimation(0);


}

Flower.prototype.updateAnimation = function(collisionData) {
    return;
}
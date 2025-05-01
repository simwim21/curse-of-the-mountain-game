// Flower Statue

function FlowerStatue(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/overworld.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

FlowerStatue.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [239, 232, 16, 32]);

    this.Sprite.setAnimation(0);

}

FlowerStatue.prototype.updateAnimation = function(collisionData) {
    return;
}
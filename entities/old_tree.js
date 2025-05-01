// Old Tree

function OldTree(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/overworld.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

OldTree.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [205, 282, 32, 32]);

    this.Sprite.setAnimation(0);

}

OldTree.prototype.updateAnimation = function(collisionData) {
    return;
}
// Old Tree

const OLD_TREE = 0;
const HAPPY_OLD_TREE = 1;

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
    this.Sprite.addKeyframe(OLD_TREE, [205, 282, 32, 32]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(HAPPY_OLD_TREE, [164, 282, 32, 32]);

    this.Sprite.setAnimation(OLD_TREE);

}

OldTree.prototype.updateAnimation = function(collisionData) {
    return;
}
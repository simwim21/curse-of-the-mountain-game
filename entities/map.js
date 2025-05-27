function MapEntity(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/items/Weapons_Items_HUD.png");
    this.Sprite = new Sprite(x + 2, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

MapEntity.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [169, 116, 12, 16]);

    this.Sprite.setAnimation(0);

}

MapEntity.prototype.updateAnimation = function(collisionData) {
    return;
}
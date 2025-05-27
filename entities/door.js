DOOR_CLOSED = 0;
DOOR_OPENED = 1;

// Door

function Door(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/tilesets/cave1TS.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection

}

Door.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    if (this.levelManager.map.currentLevelIndex == 8) {
        this.Sprite.addKeyframe(DOOR_CLOSED, [954, 622, 32, 16]); 
    }
    else {
        this.Sprite.addKeyframe(DOOR_CLOSED, [954, 588, 32, 16]);
    }
    

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(DOOR_OPENED, [954, 588, 32, 16]);
    this.Sprite.addKeyframe(DOOR_OPENED, [987, 588, 32, 16]);
    this.Sprite.addKeyframe(DOOR_OPENED, [1020, 588, 32, 16]);

    this.Sprite.setAnimation(DOOR_CLOSED);


}

Door.prototype.updateAnimation = function(collisionData) {
    return;
}
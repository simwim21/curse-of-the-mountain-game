// Old Tree

function Key(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/items/Weapons_Items_HUD.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x, y, width, height); // Create a box for collision detection


    switch (this.levelManager.map.currentLevelIndex) {
        case 13:
            this.id = 1; // Key for the first dungeon
            break;
        case 17:
            this.id = 2; // Key for the second dungeon
            break;
        case 16:
            this.id = 3; // Key for the third dungeon
            break;
        case 21:
            this.id = 4; // Key for the fourth dungeon
            break;
    }
    console
    console.log("Key created with ID: " + this.id);

}

Key.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    if (this.id == 1) {
        this.Sprite.addKeyframe(0, [192, 116, 7, 16]);
    }
    else if (this.id == 2) {
        this.Sprite.addKeyframe(0, [200, 116, 7, 16]);
    }
    else if (this.id == 3) {
        this.Sprite.addKeyframe(0, [208, 116, 7, 16]);
    }
    else if (this.id == 4) {
        this.Sprite.addKeyframe(0, [216, 116, 7, 16]);
    }

    this.Sprite.setAnimation(0);

}

Key.prototype.updateAnimation = function(collisionData) {
    return;
}
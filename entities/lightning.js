// Lightning Statue

function Lightning(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/midbosses.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x + 6, y + 6, width - 12, height - 12); // Create a box for collision detection
    
    this.id = "Undefined";

}

Lightning.prototype.setId = function(id) {
    this.id = id;
}

Lightning.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    if (this.id == "UP" || this.id == "DOWN") {
        this.Sprite.addKeyframe(0, [507, 290, 16, 16]);
        this.Sprite.addKeyframe(0, [507, 273, 16, 16]);
    }
    else if (this.id == "LEFT" || this.id == "RIGHT") {
        this.Sprite.addKeyframe(0, [541, 290, 16, 16]);
        this.Sprite.addKeyframe(0, [541, 273, 16, 16]);
    }
    else if (this.id == "UPRIGHT" || this.id == "DOWNLEFT") {
        this.Sprite.addKeyframe(0, [524, 290, 16, 16]);
        this.Sprite.addKeyframe(0, [524, 273, 16, 16]);
    }
    else if (this.id == "UPLEFT" || this.id == "DOWNRIGHT") {
        this.Sprite.addKeyframe(0, [524, 290, 16, 16], true);
        this.Sprite.addKeyframe(0, [524, 273, 16, 16], true);
    }


    this.Sprite.setAnimation(0);
}

Lightning.prototype.updateAnimation = function(collisionData) {

    if (this.Sprite.x < -20 || this.Sprite.x > 200 ||
        this.Sprite.y < -20 || this.Sprite.y > 200) {
        for (let i = 0; i < this.levelManager.currentLevelEntities.length; i++) {
            if (this == this.levelManager.currentLevelEntities[i]) {
                this.levelManager.currentLevelEntities.splice(i, 1);
                this.levelManager.currentLevelEntitySprites.splice(i, 1);
            }
            return;
        }
    }
    if (this.id == "UP") {
        this.Sprite.y -= 1;
        this.Box.y -= 1;
    }
    else if (this.id == "DOWN") {
        this.Sprite.y += 1;
        this.Box.y += 1;
    }
    else if (this.id == "LEFT") {
        this.Sprite.x -= 1;
        this.Box.x -= 1;
    }
    else if (this.id == "RIGHT") {
        this.Sprite.x += 1;
        this.Box.x += 1;
    }


    else if (this.id == "UPRIGHT") {
        this.Sprite.x += 1;
        this.Sprite.y -= 1;
        this.Box.x += 1;
        this.Box.y -= 1;
    }
    else if (this.id == "UPLEFT") {
        this.Sprite.x -= 1;
        this.Sprite.y -= 1;
        this.Box.x -= 1;
        this.Box.y -= 1;
    }
    else if (this.id == "DOWNRIGHT") {
        this.Sprite.x += 1;
        this.Sprite.y += 1;
        this.Box.x += 1;
        this.Box.y += 1;
    }
    else if (this.id == "DOWNLEFT") {
        this.Sprite.x -= 1;
        this.Sprite.y += 1;
        this.Box.x -= 1;
        this.Box.y += 1;
    }

    this.levelManager.link.handleDamage(this.Box);
}
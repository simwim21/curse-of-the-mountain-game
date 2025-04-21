
const GUARD_STAND = 0;
const GUARD_WALK = 1;

// Guard

function Guard(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/minor_enemies.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;
}

Guard.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_STAND, [285, 21, 16, 16]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK, [285, 21, 16, 16]);
    this.Sprite.addKeyframe(GUARD_WALK, [302, 21, 16, 16],true);
    this.Sprite.addKeyframe(GUARD_WALK, [285, 21, 16, 16]);
    this.Sprite.addKeyframe(GUARD_WALK, [302, 21, 16, 16]);

    this.Sprite.setAnimation(GUARD_WALK);

    this.direction = -1;
    this.counter = 0;
}

Guard.prototype.updateAnimation = function()
{

    if (this.counter % 120 == 0)
    {
        this.direction = Math.floor(Math.random() * 4);
        this.counter = 0;
    }

    if (this.counter % 8 == 0) {
        if (this.direction == 0 && this.Sprite.x >= 1)
        {
            if (!this.levelManager.isCollision(this.Sprite.x - 1, this.Sprite.y, this)) {
                this.Sprite.x -= 1;
            }
        }
        else if (this.direction == 1 && this.Sprite.x < 144)
        {
            if (!this.levelManager.isCollision(this.Sprite.x + 1, this.Sprite.y, this)) {
                this.Sprite.x += 1;
            }
        }
        else if (this.direction == 2 && this.Sprite.y >= 1)
        {
            if (!this.levelManager.isCollision(this.Sprite.x, this.Sprite.y - 1, this)) {
                this.Sprite.y -= 1;
            }
        }
        else if (this.direction == 3 && this.Sprite.y < 144)
        {
            if (!this.levelManager.isCollision(this.Sprite.x, this.Sprite.y + 1, this)) {
                this.Sprite.y += 1;
            }
        }
    }
    this.counter++;
}

Guard.prototype.checkHurtbox = function()
{

}
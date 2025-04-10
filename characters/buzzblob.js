
const BUZZBLOB_STAND = 0;
const BUZZBLOB_WALK = 1;


// Buzzblob

function Buzzblob(x, y, width, height, fps)
{
    this.texture = new Texture("images/sprites/minor_enemies.png");
    this.BuzzblobSprite = new Sprite(x, y, width, height, fps, this.texture);
}

Buzzblob.prototype.loadAnimations = function() 
{
    this.BuzzblobSprite.addAnimation();
    this.BuzzblobSprite.addKeyframe(BUZZBLOB_STAND, [285, 21, 16, 16]);

    this.BuzzblobSprite.addAnimation();
    this.BuzzblobSprite.addKeyframe(BUZZBLOB_WALK, [285, 21, 16, 16]);
    this.BuzzblobSprite.addKeyframe(BUZZBLOB_WALK, [302, 21, 16, 16],true);
    this.BuzzblobSprite.addKeyframe(BUZZBLOB_WALK, [285, 21, 16, 16]);
    this.BuzzblobSprite.addKeyframe(BUZZBLOB_WALK, [302, 21, 16, 16]);

    this.BuzzblobSprite.setAnimation(BUZZBLOB_WALK);

    this.direction = -1;
    this.counter = 0;
}

Buzzblob.prototype.updateAnimation = function()
{
    if (this.counter <= 20)
    {
        this.counter++;
        return;
    }

    this.counter = 0;
    this.direction = Math.floor(Math.random() * 4);

    if (this.direction == 0 && this.BuzzblobSprite.x >= 1)
    {
        this.BuzzblobSprite.x -= 1;
    }
    else if (this.direction == 1 && this.BuzzblobSprite.x < 144)
    {
        this.BuzzblobSprite.x += 1;
    }
    else if (this.direction == 2 && this.BuzzblobSprite.y >= 1)
    {
        this.BuzzblobSprite.y -= 1;
    }
    else if (this.direction == 3 && this.BuzzblobSprite.y < 144)
    {
        this.BuzzblobSprite.y += 1;
    }
    
}

Buzzblob.prototype.checkHurtbox = function()
{

}
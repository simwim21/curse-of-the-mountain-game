const GUARD_STAND = 0;
const GUARD_WALK_LEFT = 1;
const GUARD_WALK_RIGHT = 2;
const GUARD_WALK_UP = 3;
const GUARD_WALK_DOWN = 4;

const GUARD_ATTACK_LEFT = 5;
const GUARD_ATTACK_RIGHT = 6;
const GUARD_ATTACK_UP = 7;
const GUARD_ATTACK_DOWN = 8;


// Guard

function Guard(x, y, width, height, fps, world)
{
    this.texture = new Texture("images/sprites/soldier2.png");
    this.Sprite = new Sprite(x, y, width, height, fps, this.texture);

    this.levelManager = world;

    this.Box = new Box(x + 4, y + 3, 9, 15); // Create a box for collision detection
}

Guard.prototype.loadAnimations = function() 
{
    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_STAND, [129, 10, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_LEFT, [91, 35, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_LEFT, [110, 35, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_RIGHT, [130, 35, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_RIGHT, [149, 35, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_UP, [111, 58, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_UP, [131, 58, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_WALK_DOWN, [90, 10, 17, 18]);
    this.Sprite.addKeyframe(GUARD_WALK_DOWN, [109, 10, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_LEFT, [84, 136, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_LEFT, [116, 136, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_RIGHT, [83, 159, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_RIGHT, [115, 159, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_UP, [122, 97, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_UP, [143, 97, 17, 18]);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(GUARD_ATTACK_DOWN, [83, 97, 17, 18]);
    this.Sprite.addKeyframe(GUARD_ATTACK_DOWN, [102, 97, 17, 18]);


    this.Sprite.setAnimation(GUARD_STAND);
}

Guard.prototype.updateAnimation = function () {
    const link = this.levelManager.link; // Reference to Link
    const guardCenterX = this.Sprite.x + this.Sprite.width / 2;
    const guardCenterY = this.Sprite.y + this.Sprite.height / 2;
    const linkCenterX = link.Sprite.x + link.Sprite.width / 2;
    const linkCenterY = link.Sprite.y + link.Sprite.height / 2;

    const distanceX = linkCenterX - guardCenterX;
    const distanceY = linkCenterY - guardCenterY;

    const attackRange = 16; // Distance at which the guard attacks
    const speed = 1; // Movement speed of the guard

    // Determine if the guard is close enough to attack
    const isAttacking = Math.abs(distanceX) <= attackRange && Math.abs(distanceY) <= attackRange;

    // Smooth animation changes
    if (!this.animationTimer || this.animationTimer <= 0) {
        this.animationTimer = 5; // Delay animation changes for 5 frames

        // Movement and attack logic
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
            if (distanceX > 0) {
                // Move or attack right
                if (!this.levelManager.isCollision(this.Box.x + speed, this.Box.y, this)) {
                    this.Sprite.x += speed;
                    this.Box.x += speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_RIGHT && isAttacking) this.Sprite.setAnimation(GUARD_ATTACK_RIGHT);
                else if (this.Sprite.currentAnimation != GUARD_WALK_RIGHT) this.Sprite.setAnimation(GUARD_WALK_RIGHT);
                
            } else {
                // Move or attack left
                if (!this.levelManager.isCollision(this.Box.x - speed, this.Box.y, this)) {
                    this.Sprite.x -= speed;
                    this.Box.x -= speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_LEFT && isAttacking) this.Sprite.setAnimation(GUARD_ATTACK_LEFT);
                else if (this.Sprite.currentAnimation != GUARD_WALK_LEFT) this.Sprite.setAnimation(GUARD_WALK_LEFT);
            }
        } else {
            if (distanceY > 0) {
                // Move or attack down
                if (!this.levelManager.isCollision(this.Box.x, this.Box.y + speed, this)) {
                    this.Sprite.y += speed;
                    this.Box.y += speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_DOWN && isAttacking) this.Sprite.setAnimation(GUARD_ATTACK_DOWN);
                else if (this.Sprite.currentAnimation != GUARD_WALK_DOWN) this.Sprite.setAnimation(GUARD_WALK_DOWN);
                
            } else {
                // Move or attack up
                if (!this.levelManager.isCollision(this.Box.x, this.Box.y - speed, this)) {
                    this.Sprite.y -= speed;
                    this.Box.y -= speed;
                }
                if (this.Sprite.currentAnimation != GUARD_ATTACK_UP && isAttacking) this.Sprite.setAnimation(GUARD_ATTACK_UP);
                else if (this.Sprite.currentAnimation != GUARD_WALK_UP) this.Sprite.setAnimation(GUARD_WALK_UP);
            }
        }
    } else {
        this.animationTimer--;
    }
};



Guard.prototype.checkHurtbox = function()
{

}
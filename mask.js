function Mask(canvas, link, levelManager) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.link = link;

    this.levelManager = levelManager; // Reference to the level manager


    this.defaultRadius = 15; // Default radius for the visible circle
    this.lanternRadius = 50; // Radius when Link has the lantern
}

Mask.prototype.render = function () {
    if (this.levelManager.map.currentLevelIndex !== 10 &&
            this.levelManager.map.currentLevelIndex !== 12 &&
            this.levelManager.map.currentLevelIndex !== 13) {
            return;
    }

    const radius = this.link.hasLantern ? this.lanternRadius : this.defaultRadius;

    this.context.save();

    // Visible Area
    const gradient = this.context.createRadialGradient(
        this.link.Sprite.x + this.link.Sprite.width / 2,
        this.link.Sprite.y + this.link.Sprite.height / 2,
        radius * 0.5,
        this.link.Sprite.x + this.link.Sprite.width / 2,
        this.link.Sprite.y + this.link.Sprite.height / 2,
        radius
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)"); 
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)"); 

    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height -16);

    // Restore the canvas state
    this.context.restore();
};
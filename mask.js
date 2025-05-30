function Mask(canvas, link, levelManager) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.link = link;

    this.levelManager = levelManager;

    this.defaultRadius = 15;  
    this.lanternRadius = 50; 
}

Mask.prototype.render = function () {
    if (
        this.levelManager.map.currentLevelIndex !== 10 &&
        this.levelManager.map.currentLevelIndex !== 12 &&
        this.levelManager.map.currentLevelIndex !== 13 &&
        this.levelManager.map.currentLevelIndex !== 9 &&
        this.levelManager.map.currentLevelIndex !== 11 &&
        this.levelManager.map.currentLevelIndex !== 18
    ) {
        return;
    }

    const radius = this.link.hasLantern ? this.lanternRadius : this.defaultRadius;

    this.context.save();

    // --- Make mask follow Link even during transition ---
    let offsetX = 0, offsetY = 0;
    if (this.levelManager.map.transitioning) {
        offsetX = this.levelManager.map.offsetX;
        offsetY = this.levelManager.map.offsetY;
    }

    // Visible Area
    const centerX = this.link.Sprite.x + this.link.Sprite.width / 2 + offsetX;
    const centerY = this.link.Sprite.y + this.link.Sprite.height / 2 + offsetY;

    const gradient = this.context.createRadialGradient(
        centerX, centerY, radius * 0.3,
        centerX, centerY, radius
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.99)");

    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height - 16);

    this.context.restore();
};
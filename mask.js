function Mask(canvas, link, levelManager) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.link = link;

    this.levelManager = levelManager;

    this.defaultRadius = 15;  
    this.lanternRadius = 50; 
}

Mask.prototype.render = function () {
    if (this.levelManager.map.currentLevelIndex !== 10 &&
            this.levelManager.map.currentLevelIndex !== 12 &&
            this.levelManager.map.currentLevelIndex !== 13) {
            return;
    }

    // --- Entrance gradient (add your condition and positions) ---
    // if (this.levelManager.map.currentLevelIndex === 12) {
    //     const entranceGradient = this.context.createRadialGradient(
    //         144, 82, /* innerRadius */ 10,
    //         144, 82, /* outerRadius */ 50
    //     );
    //     entranceGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    //     entranceGradient.addColorStop(1, "rgba(0, 0, 0, 0.99)");
    //     this.context.globalCompositeOperation = "source-over";
    //     this.context.fillStyle = entranceGradient;
    //     this.context.fillRect(0, 0, this.canvas.width, this.canvas.height - 16);
    // }

    const radius = this.link.hasLantern ? this.lanternRadius : this.defaultRadius;

    this.context.save();

    // Visible Area
    const gradient = this.context.createRadialGradient(
        this.link.Sprite.x + this.link.Sprite.width / 2,
        this.link.Sprite.y + this.link.Sprite.height / 2,
        radius * 0.3,
        this.link.Sprite.x + this.link.Sprite.width / 2,
        this.link.Sprite.y + this.link.Sprite.height / 2,
        radius
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)"); 
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.99)"); 

    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height -16);


    this.context.restore();
};
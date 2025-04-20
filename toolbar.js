function Toolbar() {


    this.canvas = document.getElementById("game-layer");
    this.context = this.canvas.getContext("2d");

    this.texture = new Texture("images/items/Weapons_Items_HUD.png");

    this.position = { x: 0, y: 128 }; // Toolbar position
    this.width = 160; // Width of the toolbar
    this.height = 16; // Height of the toolbar

    this.backgroundSpriteX = 1;
    this.backgroundSpriteY = 1;

}

Toolbar.prototype.draw = function () {
    // Draw the toolbar background
    this.context.drawImage(
        this.texture.img, // The texture image
        this.backgroundSpriteX, this.backgroundSpriteY, // Source position in the texture
        this.width, this.height, // Source size in the texture
        this.position.x, this.position.y, // Destination position on the canvas
        this.width, this.height // Destination size on the canvas
    );
};
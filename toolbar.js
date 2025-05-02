function Toolbar(link) {

    this.canvas = document.getElementById("game-layer");
    this.context = this.canvas.getContext("2d");

    this.texture = new Texture("images/items/Weapons_Items_HUD.png");

    this.fonttexture = new Texture("images/items/BitPotion_Black_0.png");

    this.link = link;

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
    if (this.link.hasSword) {
        this.context.drawImage(
            this.texture.img,
            330, 192,
            24, 16,
            this.position.x + 8, this.position.y,
            24, 16
        );
        this.context.drawImage(
            this.texture.img,
            2, 10,
            4, 7,
            this.position.x + 1, this.position.y + 1,
            4, 7
        )
        this.context.drawImage(
            this.fonttexture.img,
            252, 0,
            4, 7,
            this.position.x + 1, this.position.y + 1,
            4, 7
        )
    }

    if (this.link.hasShield) {
        this.context.drawImage(
            this.texture.img,
            405, 192,
            24, 16,
            this.position.x + 48, this.position.y,
            24, 16
        );
        this.context.drawImage(
            this.texture.img,
            2, 10,
            4, 7,
            this.position.x + 41, this.position.y + 1,
            4, 7
        )
        this.context.drawImage(
            this.fonttexture.img,
            137, 0,
            4, 7,
            this.position.x + 41, this.position.y + 1,
            4, 7
        )
    }

    if (this.link.hasFlower && !this.link.hasKey) {
        this.context.drawImage(
            this.texture.img,
            81, 243,
            16, 16,
            this.position.x + 144, this.position.y,
            16, 16
        )
        this.context.drawImage(
            this.texture.img,
            137, 369,
            16, 16,
            this.position.x + 144, this.position.y,
            16, 16
        )
    }

    if (this.link.hasKey) {
        this.context.drawImage(
            this.texture.img,
            81, 243,
            16, 16,
            this.position.x + 144, this.position.y,
            16, 16
        )
        this.context.drawImage(
            this.texture.img,
            337, 22,
            8, 16,
            this.position.x + 148, this.position.y,
            8, 16
        )
    }

    if (this.link.hasMushroom) {
        this.context.drawImage(
            this.texture.img,
            81, 243,
            16, 16,
            this.position.x + 128, this.position.y,
            16, 16
        )
        this.context.drawImage(
            this.texture.img,
            229, 1,
            16, 16,
            this.position.x + 128, this.position.y,
            16, 16
        )
    }

};
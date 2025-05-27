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

    this.textTime = 0;

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

    this.context.drawImage(
        this.texture.img,
        84, 69,
        16, 16,
        this.position.x + 104 , this.position.y,
        56, 16
    );

    this.drawItems();
    this.drawHealth();
    this.drawRupees();
};

Toolbar.prototype.drawRupees = function () {
    const tens = Math.floor(this.link.rupeeCount / 10); // Extract tens digit
    const ones = this.link.rupeeCount % 10; // Extract ones digit

    this.context.drawImage(
        this.texture.img,
        41, 22,
        24, 8,
        this.position.x + 80, this.position.y + 8,
        24, 8
    );
    this.context.drawImage(
        this.texture.img,
        70 + ones * 9, 22,
        8, 8,
        this.position.x + 96, this.position.y + 8,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        70 + tens * 9, 22,
        8, 8,
        this.position.x + 88, this.position.y + 8,
        8, 8
    );
};

Toolbar.prototype.drawHealth = function () {

    if (this.tookDamage >= 0) {
        this.tookDamage -= 1;;
        return;
    }

    this.context.drawImage(
        this.texture.img,
        10, 22,
        8, 8,
        this.position.x + 80, this.position.y,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        10, 22,
        8, 8,
        this.position.x + 88, this.position.y,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        10, 22,
        8, 8,
        this.position.x + 96, this.position.y,
        8, 8
    );

    if (this.link.currentHealth > 0) {
        this.context.drawImage(
            this.texture.img,
            19, 22,
            8, 8,
            this.position.x + 80, this.position.y,
            8, 8
        );
    }
    if (this.link.currentHealth > 1) {
        this.context.drawImage(
            this.texture.img,
            28, 22,
            8, 8,
            this.position.x + 80, this.position.y,
            8, 8
        );
    }
    if (this.link.currentHealth > 2) {
        this.context.drawImage(
            this.texture.img,
            19, 22,
            8, 8,
            this.position.x + 88, this.position.y,
            8, 8
        );
    }
    if (this.link.currentHealth > 3) {
        this.context.drawImage(
            this.texture.img,
            28, 22,
            8, 8,
            this.position.x + 88, this.position.y,
            8, 8
        );
    }
    if (this.link.currentHealth > 4) {
        this.context.drawImage(
            this.texture.img,
            19, 22,
            8, 8,
            this.position.x + 96, this.position.y,
            8, 8
        );
    }
    if (this.link.currentHealth > 5) {
        this.context.drawImage(
            this.texture.img,
            28, 22,
            8, 8,
            this.position.x + 96, this.position.y,
            8, 8
        );
    }


}

Toolbar.prototype.drawItems = function () {
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

    if (this.link.hasFlower && !this.link.hasKey1) {
        if (this.link.flowerHealth == 3) {
            this.context.drawImage(
                this.texture.img,
                137, 369,
                16, 16,
                this.position.x + 144, this.position.y,
                16, 16
            )
        } else if (this.link.flowerHealth == 2) {
            this.context.drawImage(
                this.texture.img,
                171, 369,
                16, 16,
                this.position.x + 144, this.position.y,
                16, 16
            )
        } else if (this.link.flowerHealth == 1) {
            this.context.drawImage(
                this.texture.img,
                154, 369,
                16, 16,
                this.position.x + 144, this.position.y,
                16, 16
            )
        }
    }


    if (this.link.hasKey1) {
        this.context.drawImage(
            this.texture.img,
            192, 116,
            7, 16,
            this.position.x + 128, this.position.y,
            7, 16
        )
    }
    if (this.link.hasKey2) {
        this.context.drawImage(
            this.texture.img,
            200, 116,
            7, 16,
            this.position.x + 136, this.position.y,
            7, 16
        )
    }
    if (this.link.hasKey3) {
        this.context.drawImage(
            this.texture.img,
            208, 116,
            7, 16,
            this.position.x + 144, this.position.y,
            7, 16
        )
    }
    if (this.link.hasKey4) {
        this.context.drawImage(
            this.texture.img,
            216, 116,
            7, 16,
            this.position.x + 152, this.position.y,
            7, 16
        )
    }

    if (this.link.hasLantern) {
        this.context.drawImage(
            this.texture.img,
            406, 264,
            9, 16,
            this.position.x + 118, this.position.y - 1,
            9, 16
        )
    }

    if (this.link.hasMap) {
        this.context.drawImage(
            this.texture.img,
            169, 116,
            16, 16,
            this.position.x + 105, this.position.y,
            16, 16
        )
    }
}

Toolbar.prototype.damage = function ()
{

    this.tookDamage = 5;

    this.context.drawImage(
        this.texture.img,
        10, 22,
        8, 8,
        this.position.x + 80, this.position.y,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        10, 22,
        8, 8,
        this.position.x + 88, this.position.y,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        10, 22,
        8, 8,
        this.position.x + 96, this.position.y,
        8, 8
    );

    this.context.drawImage(
        this.texture.img,
        166, 30,
        8, 8,
        this.position.x + 80, this.position.y,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        166, 30,
        8, 8,
        this.position.x + 88, this.position.y,
        8, 8
    );
    this.context.drawImage(
        this.texture.img,
        166, 30,
        8, 8,
        this.position.x + 96, this.position.y,
        8, 8
    );







}
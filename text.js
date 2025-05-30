function Text() {

    this.texture = new Texture("images/text.png");
    this.Sprite = new Sprite(0, 112, 160, 32, 1, this.texture);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [0, 0, 160, 32]);
    this.Sprite.setAnimation(0);

    this.defaultX = 0;
    this.defaultY = 112;

    this.activeText = null; // Store the current text to display
    this.isActive = false;  // Whether text box is currently shown

    this.sound = AudioFX("sounds/text_popup.mp3");
}

Text.prototype.write = function(text) {
    if (text.length > 90) {
        console.warn("Text is too long, maximum 84 characters allowed.");
        this.activeText = "error: too long";
        return;
    }
    this.sound.play();
    this.activeText = text;
    this.isActive = true;
};

Text.prototype.update = function() {
    // Hide text if ENTER (key code 13) is pressed
    if (this.isActive && (keyboard[13] || keyboard["Enter"])) {
        this.isActive = false;
        this.activeText = null;
    }
};

Text.prototype.draw = function() {
    if (!this.isActive || !this.activeText) return;

    this.Sprite.draw();

    var canvas = document.getElementById("game-layer");
    var context = canvas.getContext("2d");

    context.imageSmoothingEnabled = false;

    let totalLength = 0;
    let line = 1;

    for (var i = 0; i < this.activeText.length; i++) {
        context.save();
        if (totalLength >= 144) {
            line += 1;
            totalLength = 0;
        }
        this.currentLetterX = this.defaultX + 6 + totalLength;
        this.currentLetterY = this.defaultY + 6 * line;

        var letter = this.letter(this.activeText[i]);
        if (letter) {
            context.drawImage(this.texture.img, letter.x, letter.y, letter.w, letter.h, this.currentLetterX, this.currentLetterY, letter.w, letter.h);
        }
        context.restore();
        totalLength += letter.w + 1;
    }
};

Text.prototype.letter = function (letter) {
    if (letter == " ") {
        return {x: 153, y: 36, w: 3, h: 5};
    }
    else if (letter == "A" || letter == "a") {
        return {x: 3, y: 36, w: 4, h: 5};
    }
    else if (letter == "B" || letter == "b") {
        return {x: 8, y: 36, w: 4, h: 5};
    }
    else if (letter == "C" || letter == "c") {
        return {x: 13, y: 36, w: 4, h: 5};
    }
    else if (letter == "D" || letter == "d") {
        return {x: 18, y: 36, w: 4, h: 5};
    }
    else if (letter == "E" || letter == "e") {
        return {x: 23, y: 36, w: 4, h: 5};
    }
    else if (letter == "F" || letter == "f") {
        return {x: 28, y: 36, w: 4, h: 5};
    }
    else if (letter == "G" || letter == "g") {
        return {x: 33, y: 36, w: 4, h: 5};
    }
    else if (letter == "H" || letter == "h") {
        return {x: 38, y: 36, w: 4, h: 5};
    }
    else if (letter == "I" || letter == "i") {
        return {x: 43, y: 36, w: 3, h: 5};
    }
    else if (letter == "J" || letter == "j") {
        return {x: 47, y: 36, w: 4, h: 5};
    }
    else if (letter == "K" || letter == "k") {
        return {x: 52, y: 36, w: 4, h: 5};
    }
    else if (letter == "L" || letter == "l") {
        return {x: 57, y: 36, w: 4, h: 5};
    }
    else if (letter == "M" || letter == "m") {
        return {x: 62, y: 36, w: 5, h: 5};
    }
    else if (letter == "N" || letter == "n") {
        return {x: 68, y: 36, w: 4, h: 5};
    }
    else if (letter == "O" || letter == "o") {
        return {x: 73, y: 36, w: 4, h: 5};
    }
    else if (letter == "P" || letter == "p") {
        return {x: 78, y: 36, w: 4, h: 5};
    }
    else if (letter == "Q" || letter == "q") {
        return {x: 83, y: 36, w: 4, h: 5};
    }
    else if (letter == "R" || letter == "r") {
        return {x: 88, y: 36, w: 4, h: 5};
    }
    else if (letter == "S" || letter == "s") {
        return {x: 93, y: 36, w: 4, h: 5};
    }
    else if (letter == "T" || letter == "t") {
        return {x: 98, y: 36, w: 5, h: 5};
    }
    else if (letter == "U" || letter == "u") {
        return {x: 104, y: 36, w: 4, h: 5};
    }
    else if (letter == "V" || letter == "v") {
        return {x: 109, y: 36, w: 5, h: 5};
    }
    else if (letter == "W" || letter == "w") {
        return {x: 115, y: 36, w: 5, h: 5};
    }
    else if (letter == "X" || letter == "x") {
        return {x: 121, y: 36, w: 4, h: 5};
    }
    else if (letter == "Y" || letter == "y") {
        return {x: 126, y: 36, w: 5, h: 5};
    }
    else if (letter == "Z" || letter == "z") {
        return {x: 132, y: 36, w: 4, h: 5};
    }
    else if (letter == "!") {
        return {x: 137, y: 36, w: 1, h: 5};
    }
    else if (letter == "?") {
        return {x: 143, y: 36, w: 3, h: 5};
    }
    else if (letter == ".") {
        return {x: 139, y: 36, w: 1, h: 5};
    }
    else if (letter == ",") {
        return {x: 147, y: 36, w: 2, h: 5};
    }
    else if (letter == ":") {
        return {x: 141, y: 36, w: 1, h: 5};
    }
    else if (letter == "1") {
        return {x: 3, y: 42, w: 3, h: 5};
    }
    else if (letter == "2") {
        return {x: 7, y: 42, w: 4, h: 5};
    }
    else if (letter == "3") {
        return {x: 12, y: 42, w: 4, h: 5};
    }
    else if (letter == "4") {
        return {x: 17, y: 42, w: 4, h: 5};
    }
    else if (letter == "5") {
        return {x: 22, y: 42, w: 4, h: 5};
    }
    else if (letter == "6") {
        return {x: 27, y: 42, w: 4, h: 5};
    }
    else if (letter == "7") {
        return {x: 32, y: 42, w: 4, h: 5};
    }
    else if (letter == "8") {
        return {x: 37, y: 42, w: 4, h: 5};
    }
    else if (letter == "9") {
        return {x: 42, y: 42, w: 4, h: 5};
    }
    else if (letter == "0") {
        return {x: 47, y: 42, w: 4, h: 5};
    }



}
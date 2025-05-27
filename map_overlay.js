function MapOverlay() {

    this.texture = new Texture("images/THEmap.png");
    this.Sprite = new Sprite(50, 30, 60, 52, 1, this.texture);

    this.Sprite.addAnimation();
    this.Sprite.addKeyframe(0, [0, 0, 60, 52]);
    this.Sprite.setAnimation(0);
}

MapOverlay.prototype.paintMap = function() {
    this.Sprite.draw();
};


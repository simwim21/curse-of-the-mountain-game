function Box(x, y, width, height) {

    this.x = x; // X position of the box (top-left corner)
    this.y = y; // Y position of the box (top-left corner)
    this.width = width; // Width of the box in pixels (x)
    this.height = height; // Height of the box in pixels (y)

}

Box.prototype.updatePosition = function (x, y) {
    this.x = x;
    this.y = y;
};

Box.prototype.updateSize = function (width, height) {
    this.width = width;
    this.height = height;
};


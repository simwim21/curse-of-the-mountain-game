function Level(index, left, right, up, down, map)
{
    this.levelIndex = index;
    this.leftNeighbor = left;
    this.rightNeighbor = right;
    this.upNeighbor = up;
    this.downNeighbor = down;

    this.map = map;

    this.npc = [];
    this.enemies = [];


}

Level.prototype.loadEnemies = function() {

}

Level.prototype.loadWalls = function() {

}



function InteractiveObject(x, y, width, height, gameNmr, id_nr) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.gameNmr = gameNmr;
  this.id_nr = id_nr;
  this.draw = function() {
    if (this.gameNmr == 0) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.gameNmr == 1) {
      context2.fillStyle = "white";

      context2.fillRect(this.x, this.y, this.width, this.height);
    }
  };
}

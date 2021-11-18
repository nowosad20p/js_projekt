function InteractiveObject(x, y, width, height, gameNmr, id, type) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.gameNmr = gameNmr;
  this.id = id;
  this.type = type;
  this.active = false;
  this.cd = 2 * framerate;
  this.context1Color = "white";
  this.context2Color = "white";
  this.draw = function() {
    this.cd--;
    if (this.gameNmr == 0) {
      context.fillStyle = this.context1Color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.gameNmr == 1) {
      context2.fillStyle = this.context2Color;

      context2.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.check = function(x_, y_, h, w) {
    if (gameNmr == 0) {
      if (
        this.y + this.height - (y_ + h) > 0 &&
        this.y + this.height - (y_ + h) < interactiveRange &&
        this.x + this.width - x_ > -interactiveRange &&
        this.x + this.width - x_ < interactiveRange
      ) {
        if (interactionKey) {
          if (this.cd <= 0) {
            if (this.active) {
              this.active = false;
            } else {
              this.active = true;
            }
            this.cd = 2 * framerate;
            console.log(this.active);
          }
        }
      }
    } else if (gameNmr == 1) {
      if (
        this.y + this.height - (y_ + h) > 0 &&
        this.y + this.height - (y_ + h) < interactiveRange
      ) {
        if (
          this.x + this.width - x_ > -interactiveRange &&
          this.x + this.width - x_ < interactiveRange
        ) {
          if (interactionKey2) {
            if (this.cd <= 0) {
              if (this.active) {
                this.active = false;
              } else {
                this.active = true;
              }
              this.cd = 2 * framerate;
            }
          }
        }
      }
    }
  };
}

function InteractiveObject(x, y, width, height, gameNmr, type) {
  //współrzędne obiektów
  this.x = x;
  this.y = y;
  //właściwości współrzędnych
  this.width = width;
  this.height = height;
  //numer gry w której obiekt występuje
  this.gameNmr = gameNmr;
  //typ obiektu(czy zwykły czy naciskowy)
  this.type = type;
  //boolean sprawdzający czy obiekt został użyty
  this.active = false;
  //ustawienie cooldownu przełączenia między trybami obiektu
  if (this.type == 1) {
    this.cd = 0;
  } else {
    this.cd = 2 * framerate;
  }
  //kolory obiektów 
  this.context1Color = "white";
  this.context2Color = "white";
  //funkcja rysująca obiekt
  this.draw = function () {
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
  //funkcja sprawdzająca, czy obiekt został aktywowany
  this.check = function (x_, y_, h, w) {


    if (gameNmr == 0) {

      if (type == 0) {
        if (this.y + 1 + this.height - (y_ + h) > 0 && this.y + 1 + this.height - (y_ + h) < interactiveRange * 0.5 && (this.x + this.width) - x_ > -interactiveRange && (this.x + this.width) - x_ < interactiveRange) {


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
      }

    } else if (gameNmr == 1) {


      if (type == 0) {
        if (this.y + this.height - (y_ + h) > -1 && this.y + this.height - (y_ + h) < interactiveRange) {
          if ((this.x + this.width) - x_ > -interactiveRange && (this.x + this.width) - x_ < interactiveRange) {

            if (interactionKey2) {
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

        }
      }

    }

  }



}
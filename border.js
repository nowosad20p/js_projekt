function Border(x, y, width, height, type, gameNmr, interactive, color) {
  //współrzędne
  this.x = x;
  this.y = y;
  //wysokość i szerokość
  this.width = width;
  this.height = height;
  this.type = type; //Typ bariery: 2-meta, 1-zwykła bariera, 3-bariera interaktywna 4-odwrotna bariera interaktywna
  //numer gry w którym bariera występuje
  this.gameNmr = gameNmr;
  //obiekt interaktywny przypisany do bariery
  this.interactive = interactive;
  //kolor bariery
  this.color = color;
  //informacja czy bariera ma być wyświetlona
  this.active = true;
  //funkcja rysująca bariery
  this.draw = function () {
    if (this.interactive == null) {
      if (gameNmr == 0) {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height)
      } else {
        context2.fillStyle = color;
        context2.fillRect(this.x, this.y, this.width, this.height)
      }




    } else {
      if (type == 3) {
        if (!this.interactive.active) {

          if (gameNmr == 0) {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height)
          } else {
            context2.fillStyle = color;
            context2.fillRect(this.x, this.y, this.width, this.height)
          }
        }

      } else if (type == 4) {
        if (this.interactive.active) {
          if (gameNmr == 0) {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height)
          } else {
            context2.fillStyle = color;
            context2.fillRect(this.x, this.y, this.width, this.height)
          }
        }
      }
    }
  }
}
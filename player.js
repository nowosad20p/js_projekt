function Player(x, y, type) {
    //współrzędne gracza
    this.x = x;
    this.y = y;
    //prędkości gracza
    this.xspeed = 0;
    this.yspeed = 0;
    //tarcie
    this.friction = 0.6;
    //typ gracza(numer gry)
    this.type = type;
    //reszta właściwosci gracza
    this.maxSpeed = 10;
    this.width = 50;
    this.height = 50;
    this.active = true;
    //boolean odpowiadający za sprawdzenie czy gracz dotarł na ziemie
    this.grounded = false;
    //funkcja odpowiadająca za poruszenie graczem
    this.step = function () {
        if (this.active) {
            if (this.type == 0) {


                if (!leftKey1 && !rightKey1 || leftKey1 && rightKey1) {
                    this.xspeed *= this.friction;
                } else if (rightKey1) {
                    this.xspeed++;
                } else if (leftKey1) {
                    this.xspeed--;
                }

                if (upKey1) {
                    if (this.grounded && !(this.yspeed > 0)) {
                        this.yspeed = -50;
                        this.grounded = false
                    }


                }
            }
            if (type == 1) {


                if (!leftKey2 && !rightKey2 || leftKey2 && rightKey2) {
                    this.xspeed *= this.friction;
                } else if (rightKey2) {
                    this.xspeed++;
                } else if (leftKey2) {
                    this.xspeed--;
                }

                if (upKey2) {
                    if (this.grounded && !(this.yspeed > 0)) {
                        this.yspeed = -50;
                        this.grounded = false
                    }


                }
            }
            this.yspeed += 0.75;
            if (this.xspeed > this.maxSpeed) {
                this.xspeed = this.maxSpeed;
            }
            if (this.xspeed < -this.maxSpeed) {
                this.xspeed = -this.maxSpeed;
            }
            if (this.yspeed > this.maxSpeed) {
                this.yspeed = this.maxSpeed;
            }
            if (this.yspeed < -this.maxSpeed) {
                this.yspeed = -this.maxSpeed;
            }

            if (this.xspeed > 0) {
                this.xspeed = Math.floor(this.xspeed);
            } else {
                this.xspeed = Math.ceil(this.xspeed);
            }


            let horizontalRect = {
                type: this.type,
                x: this.x + this.xspeed,
                y: this.y,
                width: this.width,
                height: this.height,
                gameNmr: this.type

            }
            let verticalRect = {
                type: this.type,
                x: this.x,
                y: this.y + this.yspeed,
                width: this.width,
                height: this.height,
                gameNmr: this.type
            }

            for (let i = 0; i < borders.length; i++) {
                let borderRect = {
                    x: borders[i].x,
                    y: borders[i].y,
                    width: borders[i].width,
                    height: borders[i].height,
                    type: borders[i].type,
                    gameNmr: borders[i].gameNmr,
                    interactive: borders[i].interactive,
                    active: borders[i].active,
                }
                if (checkIntersection(horizontalRect, borderRect)) {
                    while (checkIntersection(horizontalRect, borderRect)) {
                        horizontalRect.x -= Math.sign(this.xspeed);
                        if(this.xspeed==0){
                          
                            break;
                        }
                        


                    }
                    this.x = horizontalRect.x;
                    this.xspeed = 0;
                }
                if (checkIntersection(verticalRect, borderRect)) {
                    this.grounded = true;
                    a = borderRect.type;
                    if (borderRect.type == 2) {
                        borderRect.type = 1;
                    }
                    while (checkIntersection(verticalRect, borderRect)) {
                      
                        verticalRect.y -=  0.25*Math.sign(this.yspeed);
                        if(this.yspeed==0){
                          
                            break;
                        }

                    }
                    this.y = verticalRect.y;
                    borderRect.type = a;
                    this.yspeed = 0;
                    

                }
                
            }
            for (let i = 0; i < interactives.length; i++) {
                let interactiveRect = {
                    x: interactives[i].x,
                    y: interactives[i].y,
                    width: interactives[i].width,
                    height: interactives[i].height,
                    type: interactives[i].type,
                    gameNmr: interactives[i].gameNmr,
                    active: interactives[i].active,
                }

                if (checkIntersection(horizontalRect, interactiveRect)) {
                    while (checkIntersection(horizontalRect, interactiveRect)) {
                        horizontalRect.x -= Math.sign(this.xspeed);
                        if(this.xspeed==0){
                          
                            break;
                        }

                    }
                    this.x = horizontalRect.x;
                    this.xspeed = 0;
                }

                if (checkIntersection(verticalRect, interactiveRect)) {
                    while (checkIntersection(verticalRect, interactiveRect)) {
                        verticalRect.y -= 0.25 * Math.sign(this.yspeed);
                        if(this.yspeed==0){
                          
                            break;
                        }
                    }
                    this.grounded = true;
                    this.y = verticalRect.y;
                    this.yspeed = 0;

                    if (interactives[i].type == 1) {
                        if (interactives[i].cd < 1) {
                            interactives[i].active = true;

                            interactives[i].cd = 2
                        }
                    }

                } else {
                    if (interactives[i].type == 1) {
                        if (interactives[i].cd < 1) {
                            interactives[i].active = false;


                        } else {
                            interactives[i].cd--
                        }
                    }
                }
            }

            this.y += this.yspeed;

            this.x += this.xspeed;

        }

    }
    //funkcja odpowiedzialna za narysowanie operacji wykonanych w funkcji step
    this.draw = function () {
        if (type == 0) {
            context.fillStyle = "#2c2e30";
            context.fillRect(this.x, this.y, this.width, this.height);

        }
        if (type == 1) {
            context2.fillStyle = "#cccccc";
            context2.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    //funkcja używana przy ustawianiu gracza 
    this.teleport = function (x, y) {
        this.xspeed=0;
        this.yspeed=0;
        this.x = x;
        this.y = y;
    }

}
function InteractiveObject(x, y, width, height, gameNmr, id) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.gameNmr = gameNmr;
  this.id = id;
  this.active=false;
  this.cd=2*framerate;
  this.draw = function() {
    this.cd--;
    if (this.gameNmr == 0) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.gameNmr == 1) {
      context2.fillStyle = "white";

      context2.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.check=function(x_,y_,h,w){
   
    if(gameNmr==0){
      if(interactionKey){
        
         if(this.y+this.height-(y_+h)>0&&this.y+this.height-(y_+h)<interactiveRange){
           if((this.x+this.width)-x_>-interactiveRange||(x_+w)-this.x>-interactiveRange){
           if(this.cd<=0){
          console.log("tak")
          if(this.active){
            this.active=false;
          }else{
            this.active=true;
          }
          this.cd=2*framerate;
          console.log(this.active);

         }
        }
        }
      }

    }else if(gameNmr==1){
      if(interactionKey2){
        
        if(this.y+this.height-(y_+h)>0&&this.y+this.height-(y_+h)<interactiveRange){
          if((this.x+this.width)-x_>-interactiveRange){
          if(this.cd<=0){
            if(this.active){
              this.active=false;
            }else{
              this.active=true;
            }
            this.cd=2*framerate;
            console.log(this.active);
          }
          
        }

        }
      }
    }
  }
  
}



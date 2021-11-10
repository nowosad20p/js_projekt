
function Border(x,y,width,height,type,gameNmr,interactive){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.type=type;
    this.gameNmr=gameNmr;
    this.interactive=interactive;

    this.draw=function(){
      console.log(this.interactive.active)
      if(this.gameNmr==0){

      
      switch(type){
          case 1:{
              context.fillStyle="darkGray";
              context.fillRect(this.x,this.y,this.width,this.height)
              break;
          }
          case 2:{
            
            context.fillStyle="yellow";
            context.fillRect(this.x,this.y,this.width,this.height)
            
            break;
          }
          case 3:{
            if(!this.interactive.active){
              context.fillStyle="blue";
              context.fillRect(this.x,this.y,this.width,this.height)
              }
              break;
          }

         
      }
     
    }
    if(this.gameNmr==1){
      switch(type){
        case 1:{
            context2.fillStyle="red";
            context2.fillRect(this.x,this.y,this.width,this.height)
            break;
        }
        case 2:{
            
          context2.fillStyle="green";
          context2.fillRect(this.x,this.y,this.width,this.height)
          
          break;
        }
        case 3:{
          if(!this.interactive.active){
            context2.fillStyle="blue";
            context2.fillRect(this.x,this.y,this.width,this.height)
            }
            break;
        }
       
    }
   
    }
     
    
      
    }
}
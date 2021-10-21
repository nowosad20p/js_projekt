
function Border(x,y,width,height,type,gameNmr){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.type=type;
    this.gameNmr=gameNmr;
    this.draw=function(){
      if(this.gameNmr==0){

      
      switch(type){
          case 1:{
              context.fillStyle="darkGray";
             
              break;
          }
          case 2:{
            context.fillStyle="yellow";
            
            break;
          }
         
      }
      context.fillRect(this.x,this.y,this.width,this.height)
    }
    if(this.gameNmr==1){
      switch(type){
        case 1:{
            context2.fillStyle="red";
           
            break;
        }
        case 2:{
          context2.fillStyle="yellow";
          
          break;
        }
       
    }
    context2.fillRect(this.x,this.y,this.width,this.height)
    }
     
    
      
    }
}
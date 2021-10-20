
function Border(x,y,width,height,type){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.type=type;

    this.draw=function(){
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
}
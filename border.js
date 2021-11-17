
function Border(x,y,width,height,type,gameNmr,interactive,color){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.type=type;
    this.gameNmr=gameNmr;
    this.interactive=interactive;
    this.color = color;
    this.active=true;
    this.draw=function(){
      if(gameNmr==0){
        context.fillStyle=color;
        context.fillRect(this.x,this.y,this.width,this.height)
      }else{
        context2.fillStyle=color;
        context2.fillRect(this.x,this.y,this.width,this.height)
      }
   
     
    
      
    }
}
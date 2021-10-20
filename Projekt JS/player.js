function Player(x,y){
    this.x=x;
    this.y=y;
    this.xspeed=0;
    this.yspeed=0;
    this.friction=0.6;
   
    this.maxSpeed=10;
    this.width=50;
    this.height=50;
    this.active=true;
    this.step=function(){
    if(this.active){
        if(!leftKey&&!rightKey||leftKey&&rightKey){
            this.xspeed*=this.friction;
        }else if(rightKey){
              this.xspeed++;
        }else if(leftKey){
            this.xspeed--;
        }
      
        if(upKey){
            if(this.yspeed==0){
                this.yspeed=-35;
            }
                
            
        }
        this.yspeed+=5;

        if(this.xspeed>this.maxSpeed){
            this.xspeed=this.maxSpeed;
        }
        if(this.xspeed<-this.maxSpeed){
            this.xspeed=-this.maxSpeed;
        }
        // if(this.yspeed>this.maxSpeed){
        //     this.yspeed=this.maxSpeed;
        //  }
        //  if(this.yspeed<-this.maxSpeed){
        //      this.yspeed=-this.maxSpeed;
        //  }        
       
        // if(this.xspeed>0){
        //     this.xspeed=Math.floor(this.xspeed);
        // }else{
        //     this.xspeed=Math.ceil(this.xspeed);
        // }
        // if(this.yspeed>0){
        //     this.yspeed=Math.floor(this.yspeed);
        // }else{
        //     this.yspeed=Math.ceil(this.yspeed);
        // }
        let horizontalRect={
            x:this.x+this.xspeed,
            y:this.y,
            width:this.width,
            height:this.height
        }
        let verticalRect={
            x:this.x,
            y:this.y+this.yspeed,
            width:this.width,
            height:this.height
        }

        for(let i=0;i<borders.length;i++){
         let borderRect={
             x:borders[i].x,
             y:borders[i].y,
             width:borders[i].width,
             height: borders[i].height
         }
         if(checkIntersection(horizontalRect,borderRect)){
            this.xspeed=0;
         }
         if(checkIntersection(verticalRect,borderRect)){
           this.yspeed=0;
        }
        }
        
        this.y+=this.yspeed;
        this.x+=this.xspeed;

    }

    }
    this.draw=function(){
      context.fillStyle="black";
      context.fillRect(this.x,this.y,this.width,this.height);
    }
    
}
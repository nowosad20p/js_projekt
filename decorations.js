function Decoration(type,gameNmr,x,y){
    this.type=type;
    this.gameNmr=gameNmr;
    this.x=x;
    this.y=y;

    this.decorationDraw= function(){
        if(gameNmr==0){
          switch(type){
            case "cloud":{
              context.fillStyle="#ebf2fc";
              context.beginPath();
              context.arc(x,y,30,0,360)
              context.arc(x+40,y,40,0,360)
              context.arc(x+80,y,20,0,360)
              context.moveTo(x+70,y+10)
              context.lineTo(x,y+10)
              context.strokeStyle="#ebf2fc"
              context.stroke()
              context.fill()
              break;
            }
            case "mountain":{
                context.beginPath();
                context.moveTo(x,y);
                context.lineTo(x+200,y-300)
                context.lineTo(x+400,y)
                context.lineTo(x,y)
             
                context.fillStyle="#adadad";
                context.strokeStyle="#adadad"
                context.stroke()
                context.fill();
                break;
            }
            case "sun":{
              context.fillStyle="#edca6b";
              context.beginPath();
              context.arc(x,y,50,0,360)
              context.closePath();
              context.strokeStyle="#edca6b"
              context.stroke()
              context.fill()
              break;
            }

          }
        }
        if(gameNmr==1){
            switch(type){
              case "cloud":{
                context2.fillStyle="#2e2f30";
                context2.beginPath();
                context2.arc(x,y,30,0,360)
                context2.arc(x+40,y,40,0,360)
                context2.arc(x+80,y,20,0,360)
                context2.moveTo(x+70,y+10)
                context2.lineTo(x,y+10)
                context2.strokeStyle="#2e2f30"
                context2.stroke()
                context2.fill()
                break;
              }
              case "mountain":{
                  context2.beginPath();
                  context2.moveTo(x,y);
                  context2.lineTo(x+200,y-300)
                  context2.lineTo(x+400,y)
                  context2.lineTo(x,y)
               
                  context2.fillStyle="#454343";
                  context2.strokeStyle="#454343"
                  context2.stroke()
                  context2.fill();
                  break;
              }
              case "moon":{
                context2.fillStyle="#b3b0a8";
                context2.beginPath();
                context2.arc(x,y,50,0,360)
                context2.closePath();
                context2.strokeStyle="#b3b0a8"
                context2.stroke()
                context2.fill()
                break;
              }
              
              
            }
          }
      };
}
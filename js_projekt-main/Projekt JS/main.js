let canvas;
let context;

let gameLoop;
let player;
let borders=[];



var upKey1;
var rightKey1;
var downKey1;
var leftKey1;
var upKey2;
var rightKey2;
var downKey2;
var leftKey2;


window.onload=function(){
canvas=document.getElementById("gameCnv");
context=canvas.getContext("2d");

canvas2=document.getElementById("gameCnv2");
context2=canvas2.getContext("2d");

player = new Player(10,10,0);
player2=new Player(30,30,1)

gameLoop=setInterval(step,1000/60);

context.fillStyle="lightGray"
context.fillRect(0,0,1280,360);
context2.fillStyle="darkGray"
context2.fillRect(0,0,1280,360);
setupInputs();
setupLvl1();
}
function step(){
    player.step();
    player2.step();
    draw();
}
function draw(){
   
    context.fillStyle="lightGray";
context.fillRect(0,0,1280,360);
context2.fillStyle="lightGray";
context2.fillRect(0,0,1280,360);
player.draw();
player2.draw();
for(let i=0;i<borders.length;i++){
    borders[i].draw();
}
}
function setupInputs(){
    document.addEventListener("keydown",function(event){
      if(event.key==="w"){
          upKey1=true;
      }
      if(event.key==="a"){
        leftKey1=true;
    }
    if(event.key==="s"){
        downKey1=true;
    }
    if(event.key==="d"){
        rightKey1=true;
    }
    if(event.key==="ArrowUp"){
        upKey2=true;
    }
    if(event.key==="ArrowLeft"){
      leftKey2=true;
  }
  if(event.key==="ArrowDown"){
      downKey2=true;
  }
  if(event.key==="ArrowRight"){
      rightKey2=true;
  }
    });
    document.addEventListener("keyup",function(event){
        if(event.key==="w"){
            upKey1=false;
        }
        if(event.key==="a"){
          leftKey1=false;
      }
      if(event.key==="s"){
          downKey1=false;
      }
      if(event.key==="d"){
          rightKey1=false;
      }
      if(event.key==="ArrowUp"){
        upKey2=false;
    }
    if(event.key==="ArrowLeft"){
      leftKey2=false;
  }
  if(event.key==="ArrowDown"){
      downKey2=false;
  }
  if(event.key==="ArrowRight"){
      rightKey2=false;
  }
      });

}
function checkIntersection(r1,r2){
    if(r1.x>r2.x+r2.width){
        return false;
    }else if(r1.x+r1.width<=r2.x){
        return false;
    }else if(r1.y>=r2.y+r2.height){
        return false;
    }else if(r1.y+r1.height<=r2.y){
        return false;
    }else{
        return true;
    }
}
function setupLvl1(){
    
    
        borders.push(new Border(0,350,1280,10,1,0));
    
    
        borders.push(new Border(100,210,100,100,1,0));
        
    
            borders.push(new Border(0,350,1280,10,1,1));
        
        
            borders.push(new Border(100,210,100,100,1,1));
        
}

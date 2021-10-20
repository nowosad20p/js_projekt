let canvas;
let context;

let gameLoop;
let player;
let borders=[];



var upKey;
var rightKey;
var downKey;
var leftKey;

window.onload=function(){
canvas=document.getElementById("gameCnv");
context=canvas.getContext("2d");

player = new Player(100,400);
for(let i=0;i<6;i++){
    borders.push(new Border(0,710,1000,10,1));
}

    borders.push(new Border(100,610,100,100,1));

gameLoop=setInterval(step,1000/30);

context.fillStyle="lightGray"
context.fillRect(0,0,1280,720);

setupInputs();
}
function step(){
    player.step();
    
    draw();
}
function draw(){
   
    context.fillStyle="lightGray";
context.fillRect(0,0,1280,720);
player.draw();
for(let i=0;i<borders.length;i++){
    borders[i].draw();
}
}
function setupInputs(){
    document.addEventListener("keydown",function(event){
      if(event.key==="w"||event.key==="ArrowUp"){
          upKey=true;
      }
      if(event.key==="a"||event.key==="ArrowLeft"){
        leftKey=true;
    }
    if(event.key==="s"||event.key==="ArrowDown"){
        downKey=true;
    }
    if(event.key==="d"||event.key==="ArrowRight"){
        rightKey=true;
    }
    });
    document.addEventListener("keyup",function(event){
        if(event.key==="w"||event.key==="ArrowUp"){
            upKey=false;
        }
        if(event.key==="a"||event.key==="ArrowLeft"){
          leftKey=false;
      }
      if(event.key==="s"||event.key==="ArrowDown"){
          downKey=false;
      }
      if(event.key==="d"||event.key==="ArrowRight"){
          rightKey=false;
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

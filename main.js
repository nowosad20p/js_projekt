//canvasy i contexty do wyświetlania gry
let canvas;
let context;
let canvas2;
let context2;

let gameLoop;

let player;
let player2;
//tablice z elementami mapy
let decorations=[];
let borders = [];
let interactives = [];


//wejścia
let upKey1;
let rightKey1;
let downKey1;
let leftKey1;
let upKey2;
let rightKey2;
let downKey2;
let leftKey2;
let interactionKey;
let interactionKey2;

//ustawienia gry
let framerate = 45;
let interactiveRange = 120;
let showTips = true
let gameTimeSeconds=0;
let gameTimeMinutes=0;
let gameTimeHours=0;
//zmienne odpowiadające za sprawdzenie czy graczwe dotarli do mety
let playerOneFinished;
let playerTwoFinished;
//zmienne odpowiadające za ładowanie się poziomów
let curLevel = 8;
let maxLevel = curLevel;
//wczytywanie ustawien
function loadSettings() {
 
  showTips = document.querySelector("#showTips").checked
}
//funkcja do przycisku restartującego poziom
function restartLevel(){
setupLvl(curLevel)
}
//funkcja do wyczyszczenia okienka z błędem
function clearErrorMsg(){
  errorMsg.innerHTML=""
}
//funkcja do cofnięcia poziomu
function prevLevel(){
if(curLevel-1>0){
  curLevel--;
  setupLvl(curLevel)
}else{
  errorMsg.innerHTML="Jesteś już na pierwszym poziomie"
  setTimeout(clearErrorMsg,2000)
}
}
//funkcja do przejścia do kolejnego poziomu o ile jest odblokowany
function nextLevel(){
if(curLevel<maxLevel){
  curLevel++;
  setupLvl(curLevel)
}else{
  errorMsg.innerHTML="Aby odblokować kolejny poziom najpierw przejdź obecny"
  setTimeout(clearErrorMsg,2000)
}
}
function countTime(){
  gameTimeSeconds++;
  if(gameTimeSeconds>59){
    gameTimeSeconds=0
    gameTimeMinutes++;
    if(gameTimeMinutes>59){
      gameTimeSeconds=0
      gameTimeHours++
    }
  }
}
window.onload = function () {

  loadSettings()
  document.querySelector("#showTips").addEventListener("click", loadSettings)
  document.querySelector("#resetGame").addEventListener("click", restartLevel)
  document.querySelector("#prevLevel").addEventListener("click", prevLevel)
  document.querySelector("#nextLevel").addEventListener("click", nextLevel)
  document.querySelector("#gameFinished>button").addEventListener("click",()=>window.location.reload(true))
  errorMsg=document.querySelector("#errorMessage")
  canvas = document.getElementById("gameCnv");
  context = canvas.getContext("2d");

  canvas2 = document.getElementById("gameCnv2");
  context2 = canvas2.getContext("2d");

  player = new Player(10, 40, 0);
  player2 = new Player(30, 40, 1);

  gameLoop = setInterval(step, 1000 / framerate);
  countTimee=setInterval(countTime,1000)
  context.fillStyle = "lightGray";
  context.fillRect(0, 0, 1280, 360);
  context2.fillStyle = "darkGray";
  context2.fillRect(0, 0, 1280, 360);
  setupInputs();
  setupLvl(curLevel);
};

function step() {
  player.step();
  player2.step();
  draw();
  for (let i = 0; i < interactives.length; i++) {
    if(interactives[i].gameNmr==0){
      interactives[i].check(player.x, player.y, player.height, player.with);
    }else{
      interactives[i].check(player2.x, player2.y, player.height, player.width);
    }
    
    
  }
}

function draw() {

  context.fillStyle = "#d4e4fc";
  context.fillRect(0, 0, 1280, 360);
  context2.fillStyle = "#404752";
  context2.fillRect(0, 0, 1280, 360);
  for (let i = 0; i < decorations.length; i++) {
    decorations[i].decorationDraw();
  }
  drawTips();
  player.draw();
  player2.draw();
  
  for (let i = 0; i < interactives.length; i++) {
    interactives[i].draw();
  }
  for (let i = 0; i < borders.length; i++) {
    borders[i].draw();
  }
  
}
//funkcja przygotowująca wszystkie pptrzebne dane wejściowe
function setupInputs() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "w") {
      upKey1 = true;
    }
    if (event.key === "a") {
      leftKey1 = true;
    }
    if (event.key === "s") {
      downKey1 = true;
    }
    if (event.key === "d") {
      rightKey1 = true;
    }
    if (event.key === "ArrowUp") {
      upKey2 = true;
    }
    if (event.key === "ArrowLeft") {
      leftKey2 = true;
    }
    if (event.key === "ArrowDown") {
      downKey2 = true;
    }
    if (event.key === "ArrowRight") {
      rightKey2 = true;
    }
    if (event.key === "e") {
      interactionKey = true;
    }
    if (event.key === ".") {
      interactionKey2 = true;
    }
  });
  document.addEventListener("keyup", function (event) {
    if (event.key === "w") {
      upKey1 = false;
    }
    if (event.key === "a") {
      leftKey1 = false;
    }
    if (event.key === "s") {
      downKey1 = false;
    }
    if (event.key === "d") {
      rightKey1 = false;
    }
    if (event.key === "ArrowUp") {
      upKey2 = false;
    }
    if (event.key === "ArrowLeft") {
      leftKey2 = false;
    }
    if (event.key === "ArrowDown") {
      downKey2 = false;
    }
    if (event.key === "ArrowRight") {
      rightKey2 = false;
    }
    if (event.key === "e") {
      interactionKey = false;
    }
    if (event.key === ".") {
      interactionKey2 = false;
    }
  });
}
//funkcja odpowiadająca za sprawdzenie czy obiekt jest w drugim
function checkIntersection(r1, r2,xy) {
  if (r1.gameNmr == r2.gameNmr) {
    if (r1.x > r2.x + r2.width) {
      if (r2.type == 2)
        objective(false, r1.type);
      return false;
    } else if (r1.x + r1.width <= r2.x) {
      if (r2.type == 2)
        objective(false, r1.type);
      return false;
    } else if (r1.y >= r2.y + r2.height) {
      if (r2.type == 2)
        objective(false, r1.type);
      return false;
    } else if (r1.y + r1.height <= r2.y) {
      if (r2.type == 2)
        objective(false, r1.type);
      return false;
    } else {
      if (r2.type == 2) {
        if (r1.y < r2.y) {
          objective(true, r1.type);
        }
      }
      if (r1.gameNmr != r2.gameNmr) {
        return false;
      }
      if (r2.interactive != null) {
        if(r2.type==3){
        if (r2.interactive.active) {

          return false;
        }
      }else if(r2.type==4){
        if (!r2.interactive.active) {

          return false;
        }
      }
      }
      return true;
    }
  }
}
//funkcja odpowiadająca za skończenie gry
function EndGame(){
  canvas.style.display="none";
  canvas2.style.display="none";
  let a=document.querySelector("#gameFinished")
  a.style.display="block";
  a.getElementsByTagName("p")[0].innerHTML="Gratuluję, ukończyliście grę!<br>Wasz czas to: "+gameTimeHours+":"+gameTimeMinutes+":"+gameTimeSeconds;
  clearTimeout(countTimee)
 
  

}
//funkcja odpowiadająca za sprawdzenie czy gracz dotarł do mety
function objective(onOff, playerNmr) {
  if (onOff) {
    if (playerNmr == 0) {
      playerOneFinished = true;
    } else if (playerNmr == 1) {
      playerTwoFinished = true;
    }
    checkLvl();
  } else {
    if (playerNmr == 0) {
      playerOneFinished = false;
    } else if (playerNmr == 1) {
      playerTwoFinished = false;
    }
  }
}
//funkcja tworząca obiekty składające się na poziom
function setupLvl(level) {
  context2.fillRect(0, 0, 1280, 360);
  context.fillRect(0, 0, 1280, 360);
  playerOneFinished = false;
  playerTwoFinished = false;
  borders = [];
  interactives=[];
  decorations=[];
  player.x=0
  player.y=300
  player2.x=0
  player2.y=300
  if (level == 1) {
    borders.push(new Border(0, 350, 1280, 10, 1, 1, null, "black"));
    borders.push(new Border(0, 350, 1280, 10, 1, 0, null, "gray"));
    borders.push(new Border(100, 310, 100, 100, 1, 0, null, "gray"));
    borders.push(new Border(100, 310, 100, 100, 1, 1, null, "black"));
    borders.push(new Border(310, 260, 100, 50, 1, 0, null, "gray"));
    borders.push(new Border(310, 260, 100, 50, 1, 1, null, "black"));
    borders.push(new Border(610, 190, 100, 50, 1, 0, null, "gray"));
    borders.push(new Border(610, 190, 100, 50, 1, 1, null, "black"));
    borders.push(new Border(810, 190, 100, 50, 2, 0, null, "green"));
    borders.push(new Border(810, 190, 100, 50, 2, 1, null, "green"));
    decorations.push(new Decoration("sun",0,1100,100))
    decorations.push(new Decoration("moon",1,1100,100))
    decorations.push(new Decoration("mountain",0,200,450))
    decorations.push(new Decoration("mountain",0,300,350))
    decorations.push(new Decoration("cloud",0,500,100))
    decorations.push(new Decoration("cloud",0,1000,50))

    decorations.push(new Decoration("mountain",1,200,450))
    decorations.push(new Decoration("mountain",1,300,350))
    decorations.push(new Decoration("cloud",1,500,100))
    decorations.push(new Decoration("cloud",1,1000,50))
    
    context.fillStyle = "black"

  }
  if (level == 2) {
    decorations.push(new Decoration("sun",0,1100,100))
    decorations.push(new Decoration("moon",1,1100,100))
    decorations.push(new Decoration("mountain",0,300,500));
    decorations.push(new Decoration("mountain",0,400,400));
    decorations.push(new Decoration("mountain",1,300,500));
    decorations.push(new Decoration("mountain",1,400,400));
    decorations.push(new Decoration("cloud",1,500,100));
    decorations.push(new Decoration("cloud",0,500,100));
    borders.push(new Border(0, 350, 1280, 10, 1, 1, null, "black"));
    borders.push(new Border(0, 350, 1280, 10, 1, 0, null, "gray"));
    borders.push(new Border(200, 340, 100, 10, 1, 0, null, "red"))
    borders.push(new Border(400, 340, 100, 10, 1, 0, null, "yellow"))

    borders.push(new Border(800, 340, 100, 10, 1, 0, null, "green"))
    borders.push(new Border(1000, 340, 100, 10, 1, 0, null, "pink"))

    borders.push(new Border(200, 340, 100, 10, 1, 1, null, "blue"))
    borders.push(new Border(400, 340, 100, 10, 1, 1, null, "yellow"))
    borders.push(new Border(600, 340, 100, 10, 1, 1, null, "green"))
    borders.push(new Border(1000, 340, 100, 10, 1, 1, null, "purple"))
    borders.push(new Border(800, 340, 100, 10, 2, 1, null, "yellow"))
    borders.push(new Border(600, 340, 100, 10, 2, 0, null, "yellow"))
  }
  if (level == 3) {
    decorations.push(new Decoration("sun",0,1100,100))
    decorations.push(new Decoration("moon",1,1100,100))
    
    interactives.push(new InteractiveObject(100, 102, 50, 50, 0,0));
    borders.push(new Border(1100, 150, 10, 520, 3, 0, interactives[0],"black"));
    
    interactives.push(new InteractiveObject(100, 102, 50, 50, 1,0));
    borders.push(new Border(1100, 150, 10, 520, 3, 1, interactives[1],"black"));

    borders.push(new Border(300,210,50,90,1,0,null,"#628dc4"))
    borders.push(new Border(200,280,50,80,1,0,null,"#628dc4"))
    borders.push(new Border(100,150,100,20,1,0,null,"#628dc4"))

    borders.push(new Border(300,210,50,90,1,1,null,"black"))
    borders.push(new Border(200,280,50,80,1,1,null,"black"))
    borders.push(new Border(100,150,100,20,1,1,null,"black"))

    borders.push(new Border(0, 350, 1280, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(0, 350, 1280, 10, 1, 1, null,"black"));

    borders.push(new Border(1150, 340, 1280, 10, 2, 0, null,"green"));
    borders.push(new Border(1150, 340, 1280, 10, 2, 1, null,"green"));
    decorations.push(new Decoration("mountain",1,100,370))
    decorations.push(new Decoration("mountain",1,700,360))
     decorations.push(new Decoration("cloud",1,300,90))
     decorations.push(new Decoration("cloud",1,800,140))
    decorations.push(new Decoration("mountain",0,100,370))
    decorations.push(new Decoration("mountain",0,700,360))
     decorations.push(new Decoration("cloud",0,300,90))
     decorations.push(new Decoration("cloud",0,800,140))
  }

  if(level==4){
    decorations.push(new Decoration("sun",0,1100,100))
    decorations.push(new Decoration("moon",1,1100,100))
    
    borders.push(new Border(0, 350, 200, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(0, 350, 200, 10, 1, 1, null,"black"));

    borders.push(new Border(320, 130, 100, 100, 1, 0, null,"#628dc4"));
    borders.push(new Border(500, 100, 100, 100, 1, 0, null,"#628dc4"));
    borders.push(new Border(750, 230, 100, 50, 1, 0, null,"#628dc4"));

    borders.push(new Border(320, 130, 100, 100, 1, 1, null,"black"));
    borders.push(new Border(500, 100, 100, 100, 1, 1, null,"black"));
    borders.push(new Border(750, 230, 100, 50, 1, 1, null,"black"));

    decorations.push(new Decoration("mountain",0,100,500));
    decorations.push(new Decoration("mountain",0,200,400));
    decorations.push(new Decoration("mountain",0,700,430));
    decorations.push(new Decoration("cloud",0,120,100));
    decorations.push(new Decoration("cloud",0,850,150));
    decorations.push(new Decoration("mountain",1,100,500));
    decorations.push(new Decoration("mountain",1,200,400));
    decorations.push(new Decoration("mountain",1,700,430));
    decorations.push(new Decoration("cloud",1,120,100));
    decorations.push(new Decoration("cloud",1,850,150));
   
    borders.push(new Border(1150, 340, 1280, 10, 2, 0, null,"green"));
    borders.push(new Border(1150, 340, 1280, 10, 2, 1, null,"green"));
  }
  if(level==5){
    decorations.push(new Decoration("sun",0,1100,100))
    decorations.push(new Decoration("moon",1,1100,100))
    
    interactives.push(new InteractiveObject(200, 130, 50, 50, 1,0));
    interactives.push(new InteractiveObject(1200, 125, 50, 25, 0,1));
    interactives.push(new InteractiveObject(1200, 340, 50, 10, 1,1));

    borders.push(new Border(0, 350, 400, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(900, 350, 380, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(900, 150, 380, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(900, 150, 10, 200, 3, 0, interactives[2],"#9ecfff"));
    borders.push(new Border(400, 250, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(600, 300, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(200, 180, 100, 10, 1, 0, null,"#628dc4ck"));
    borders.push(new Border(700, 180, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(900, 00, 10, 200, 3, 0, interactives[0],"#9ecfff"));

    borders.push(new Border(900, 150, 380, 10, 1, 1, null,"black"));
    borders.push(new Border(400, 250, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(600, 300, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(200, 180, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(900, 150, 10, 200, 3, 1, interactives[1],"black"));
    borders.push(new Border(0, 350, 1280, 10, 1, 1, null,"black"));
    
    borders.push(new Border(1050, 340, 100, 10, 2, 0, null,"green"));
    borders.push(new Border(1050, 340, 100, 10, 2, 1, null,"green"));

   
    decorations.push(new Decoration("mountain",1,0,400));
    decorations.push(new Decoration("mountain",1,100,360));
    decorations.push(new Decoration("mountain",1,500,380));
    decorations.push(new Decoration("mountain",1,600,450));
    decorations.push(new Decoration("cloud",1,50,100));
    decorations.push(new Decoration("cloud",1,700,70));

    decorations.push(new Decoration("mountain",0,0,400));
    decorations.push(new Decoration("mountain",0,100,360));
    decorations.push(new Decoration("mountain",0,500,380));
    decorations.push(new Decoration("mountain",0,600,450));
    decorations.push(new Decoration("cloud",0,50,100));
    decorations.push(new Decoration("cloud",0,700,70));
 
  }
  if(level==6){
    
    interactives.push(new InteractiveObject(1200, 200, 50, 50, 0,0));
    interactives.push(new InteractiveObject(1200, 300, 50, 50, 1,0));
    interactives.push(new InteractiveObject(1200, 300, 50, 50, 0,0));
    interactives.push(new InteractiveObject(0, 200, 50, 50, 1,0));
    interactives.push(new InteractiveObject(0, 100, 50, 50, 0,0));
    borders.push(new Border(950, 140, 100, 10, 2, 0, null,"green"));
    borders.push(new Border(950, 140, 100, 10, 2, 1, null,"green"));
    borders.push(new Border(0, 350, 1280, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(0, 350, 1280, 10, 1, 1, null,"black"));
    borders.push(new Border(0, 250, 900, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(0, 250, 300, 10, 1, 1, null,"black"));
    borders.push(new Border(300, 250, 150, 10, 3, 1, interactives[0],"black"));
    borders.push(new Border(450, 250, 600, 10, 3, 1, interactives[4],"black"));
    borders.push(new Border(1050, 250, 230, 10, 1, 1, null,"black"));

    borders.push(new Border(900, 250, 900, 10, 3, 0, interactives[2],"#628dc4"));
    borders.push(new Border(1100, 250, 280, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(1100, 250, 10, 100, 3, 0, interactives[1],"#628dc4"));

    borders.push(new Border(400, 150, 10, 100, 3, 0, interactives[3],"#628dc4"));
    borders.push(new Border(900, 250, 10, 100, 3, 0, interactives[1],"#628dc4"));
    borders.push(new Border(900, 250, 10, 100, 4, 1, interactives[1],"black"));
    borders.push(new Border(0, 150, 200, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(200, 150, 200, 10, 3, 0, interactives[1],"#628dc4"));
    borders.push(new Border(400, 150, 880, 10, 1, 0, null,"#628dc4"));

    borders.push(new Border(0, 150, 300, 10, 1, 1, null,"black"));
    borders.push(new Border(300, 150, 150, 10, 3, 1, interactives[2],"black"));
    borders.push(new Border(450, 150, 1280, 10, 1,1, null,"black"));
    borders.push(new Border(0,150, 300, 10, 1, 1, null,"black"));
    borders.push(new Border(300,150, 200, 10, 3, 1, interactives[2],"black"));
    
    decorations.push(new Decoration("sun",0,1100,60))
    decorations.push(new Decoration("moon",1,1100,60))
    decorations.push(new Decoration("mountain",0,0,390))
    decorations.push(new Decoration("mountain",0,100,360))
    decorations.push(new Decoration("mountain",0,1100,360))
    decorations.push(new Decoration("cloud",0,900,50))
    decorations.push(new Decoration("cloud",0,400,45))

    decorations.push(new Decoration("mountain",1,0,390))
    decorations.push(new Decoration("mountain",1,100,360))
    decorations.push(new Decoration("mountain",1,1100,360))
    decorations.push(new Decoration("cloud",1,900,50))
    decorations.push(new Decoration("cloud",1,400,45))
  }
  if(level==7){
    interactives.push(new InteractiveObject(1200, 50, 50, 50, 1,0));
    interactives.push(new InteractiveObject(1200, 50, 50, 50, 0,0));
    borders.push(new Border(0, 350, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(0, 350, 100, 10, 1, 1, null,"black"));

    borders.push(new Border(200, 300, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(100,170, 100, 30, 1, 1, null,"black"));
    borders.push(new Border(200, 150, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(360, 100, 10, 260, 1, 1, null,"black"));
    borders.push(new Border(440, 000, 10, 260, 1, 1, null,"black"));
    borders.push(new Border(440, 330, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(1100, 100, 200, 10, 1, 1, null,"black"));
    borders.push(new Border(900, 250, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(1100, 200, 100, 10, 1, 1, null,"black"));
    borders.push(new Border(600, 350, 200, 10, 1, 1, null,"black"));
    borders.push(new Border(600, 260, 10, 100, 1, 1, null,"black"));
    borders.push(new Border(800, 260, 10, 100, 1, 1, null,"black"));
    borders.push(new Border(600, 250, 210, 10, 3, 1, interactives[1],"black"));
    borders.push(new Border(610, 340, 190, 10, 2, 1, null,"green"));

    borders.push(new Border(200, 300, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(100,170, 100, 30, 1, 0, null,"#628dc4"));
    borders.push(new Border(200, 150, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(360, 100, 10, 260, 1, 0, null,"#628dc4"));
    borders.push(new Border(440, 000, 10, 260, 1, 0, null,"#628dc4"));
    borders.push(new Border(440, 330, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(1100, 100, 200, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(900, 250, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(1100, 200, 100, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(600, 350, 200, 10, 1, 0, null,"#628dc4"));
    borders.push(new Border(600, 260, 10, 100, 1, 0, null,"#628dc4"));
    borders.push(new Border(800, 260, 10, 100, 1, 0, null,"#628dc4"));
    borders.push(new Border(600, 250, 210, 10, 3, 0, interactives[0],"#628dc4"));
    borders.push(new Border(610, 340, 190, 10, 2, 0, null,"green"));
    decorations.push(new Decoration("mountain",1,800,410))
    decorations.push(new Decoration("mountain",1,950,360))
    decorations.push(new Decoration("mountain",1,0,440))
    decorations.push(new Decoration("moon",1,870,50))
    decorations.push(new Decoration("cloud",1,800,50))
    decorations.push(new Decoration("cloud",1,0,80))

    decorations.push(new Decoration("mountain",0,800,410))
    decorations.push(new Decoration("mountain",0,950,360))
    decorations.push(new Decoration("mountain",0,0,440))
    decorations.push(new Decoration("sun",0,870,50))
    decorations.push(new Decoration("cloud",0,800,50))
    decorations.push(new Decoration("cloud",0,0,80))
  }
  if(level==8){
    interactives.push(new InteractiveObject(0, 120, 50, 50, 1,0))
    interactives.push(new InteractiveObject(1000, 120, 50, 50, 0,0))
    
    borders.push(new Border(0,170,50,10,1,1,null,"black"))
    borders.push(new Border(0,350,300,10,1,1,null,"black"))
    borders.push(new Border(0,350,300,10,1,0,null,"#628dc4"))
    borders.push(new Border(350,230,100,10,1,1,null,"black"))
    borders.push(new Border(850,230,100,10,1,1,null,"black"))
    borders.push(new Border(550,170,100,10,4,1,interactives[1],"black"))
    borders.push(new Border(200,150,150,10,1,1,null,"black"))
    borders.push(new Border(0,100,100,10,1,1,null,"black"))

   
    borders.push(new Border(350,230,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(750,170,100,10,4,0,interactives[0],"#628dc4"))
    borders.push(new Border(950,170,100,10,4,0,null,"#628dc4"))
    borders.push(new Border(550,170,100,10,4,0,null,"#628dc4"))
    borders.push(new Border(200,150,150,10,1,0,null,"#628dc4"))
    borders.push(new Border(0,100,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(1050,330,120,10,1,0,null,"#628dc4"))
    borders.push(new Border(1050,230,120,10,4,0,interactives[0],"#628dc4"))
    borders.push(new Border(1050, 240, 10, 100, 1, 0, null,"#628dc4"));
    borders.push(new Border(1160, 240, 10, 100, 1, 0, null,"#628dc4"));
    borders.push(new Border(1060, 321, 100, 10, 2, 0, null,"green"));
    borders.push(new Border(1060, 321, 100, 10, 2, 1, null,"green"));
    borders.push(new Border(1050,330,120,10,1,1,null,"black"))
    borders.push(new Border(1050, 240, 10, 100, 1, 1, null,"black"));
    borders.push(new Border(1160, 240, 10, 100, 1, 1, null,"black"));
    
    decorations.push(new Decoration("mountain",0,100,420))
    decorations.push(new Decoration("mountain",0,700,360))
    decorations.push(new Decoration("cloud",0,350,50))
    decorations.push(new Decoration("cloud",0,800,150))
    decorations.push(new Decoration("sun",0,1200,60))
    decorations.push(new Decoration("mountain",1,100,420))
    decorations.push(new Decoration("mountain",1,700,360))
    decorations.push(new Decoration("cloud",1,350,50))
    decorations.push(new Decoration("cloud",1,800,150))
    decorations.push(new Decoration("moon",1,1200,60))
  }
  if(level==9){
   
    interactives.push(new InteractiveObject(0, 200, 50, 50,1,0))
    interactives.push(new InteractiveObject(350, 50, 50, 50,1,0))
    interactives.push(new InteractiveObject(0, 200, 50, 50,0,0))
    interactives.push(new InteractiveObject(350, 50, 50, 50,0,0))
    borders.push(new Border(0,100,100,10 ,1,1,null,"black"))
    borders.push(new Border(0,250,100,10,1,1,null,"black"))
    borders.push(new Border(250,0,10,360,3 ,1,interactives[2],"black"))
    borders.push(new Border(260,240,90,10,1,1,null,"black"))
    borders.push(new Border(350,100,90,50,1,1,null,"black"))
    borders.push(new Border(490,100,90,10,1,1,null,"black"))
    borders.push(new Border(490,300,90,10,1,1,null,"black"))

    borders.push(new Border(650,180,100,10,1,1,null,"black"))
    borders.push(new Border(820,150,100,10,1,1,null,"black"))
    borders.push(new Border(990,120,100,10,1,1,null,"black"))
    borders.push(new Border(1110,80,100,10,1,1,null,"black"))
    borders.push(new Border(1110,0,10,80,1,1,null,"black"))
    borders.push(new Border(1210,0,10,360,3,1,interactives[3],"black"))
    borders.push(new Border(1120, 70, 90, 10, 2, 1, null,"green"));

    
    borders.push(new Border(0,100,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(0,250,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(250,0,10,360,3 ,0,interactives[0],"#628dc4"))
    borders.push(new Border(260,240,90,10,1,0,null,"#628dc4"))
    borders.push(new Border(350,100,90,50,1,0,null,"#628dc4"))
    borders.push(new Border(490,100,90,10,1,0,null,"#628dc4"))
    borders.push(new Border(490,300,90,10,1,0,null,"#628dc4"))

    borders.push(new Border(650,180,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(820,150,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(990,120,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(1110,80,100,10,1,0,null,"#628dc4"))
    borders.push(new Border(1110,0,10,80,1,0,null,"#628dc4"))
    borders.push(new Border(1210,0,10,360,3,0,interactives[1],"#628dc4"))
    borders.push(new Border(1120, 70, 90, 10, 2, 0, null,"green"));

    decorations.push(new Decoration("moon",1,700,60))
    decorations.push(new Decoration("mountain",1,500,460))
    decorations.push(new Decoration("mountain",1,600,360))
    decorations.push(new Decoration("mountain",1,0,550))
    decorations.push(new Decoration("cloud",1,700,100))
    decorations.push(new Decoration("cloud",1,100,50))

    decorations.push(new Decoration("sun",0,700,60))
    decorations.push(new Decoration("mountain",0,500,460))
    decorations.push(new Decoration("mountain",0,600,360))
    decorations.push(new Decoration("mountain",0,0,550))
    decorations.push(new Decoration("cloud",0,700,100))
    decorations.push(new Decoration("cloud",0,100,50))
    player.x=0
    player.y=50
    player2.x=0 
    player2.y=50
  }
  if(level==10){
    interactives.push(new InteractiveObject(1000, 140, 50, 10,0,1))
    interactives.push(new InteractiveObject(1100, 200, 50, 50,1,0))
    interactives.push(new InteractiveObject(1100, 200, 50, 50,0,0))
    player.x=0
    player.y=50
    player2.x=0 
    player2.y=50
    borders.push(new Border(1070, 340, 100, 10, 2, 1, null,"green"));
    borders.push(new Border(1100, 140, 100, 10, 2, 0, null,"green"));

    borders.push(new Border(0,150,100,10,1,1,null,"black"))
    borders.push(new Border(100,150,100,10,3,1,interactives[0],"black"))
    borders.push(new Border(200,150,1100 ,10,1,1,null,"black"))
    borders.push(new Border(0,150,100,10,1,0,null,"black"))
    borders.push(new Border(100,150,100,10,3,0,interactives[1],"black"))
    borders.push(new Border(200,150,1100 ,10,1,0,null,"black"))
    borders.push(new Border(900,150,10 ,100,4,0,interactives[1],"black"))

    borders.push(new Border(0,250,1000,10,1,1,null,"black"))
    borders.push(new Border(1000,250,100,10,3,1,interactives[2],"black"))
 
    borders.push(new Border(1100,250,200,10,3,1,null,"black"))
   
    borders.push(new Border(0,250,100,10,1,0,null,"black"))
    borders.push(new Border(100,250,100,10,1,0,null,"black"))
    borders.push(new Border(200,250,1100 ,10,1,0,null,"black"))
    

    borders.push(new Border(0,350,100,10,1,1,null,"black"))
    borders.push(new Border(100,350,100,10,3,1,null,"black"))
    borders.push(new Border(200,350,1100 ,10,1,1,null,"black"))
    borders.push(new Border(0,350,100,10,1,0,null,"black"))
    borders.push(new Border(100,350,100,10,1,0,null,"black"))
    borders.push(new Border(200,350,1100 ,10,1,0,null,"black"))

    decorations.push(new Decoration("mountain",1,800,410))
    decorations.push(new Decoration("mountain",1,950,360))
    decorations.push(new Decoration("mountain",1,0,440))
    decorations.push(new Decoration("moon",1,870,50))
    decorations.push(new Decoration("cloud",1,800,50))
    decorations.push(new Decoration("cloud",1,0,80))

    decorations.push(new Decoration("mountain",0,800,410))
    decorations.push(new Decoration("mountain",0,950,360))
    decorations.push(new Decoration("mountain",0,0,440))
    decorations.push(new Decoration("sun",0,870,50))
    decorations.push(new Decoration("cloud",0,800,50))
    decorations.push(new Decoration("cloud",0,0,80))
  }
}

function checkLvl() {
  if (playerOneFinished && playerTwoFinished) {
    if(curLevel<10){
    curLevel+=1;
    if(curLevel>maxLevel){
      maxLevel=curLevel;
    }
    setupLvl(curLevel);
   }else{
     EndGame();
   }
}
}

function drawTips() {

  context.fillStyle = "black"
  context2.fillStyle = "white"
  context.font="15px Verdana"
  context2.font="15px Verdana"
  if (showTips) {
    switch (curLevel) {
      case 1: {
        context.fillText("Witajcie w grze. Waszym zadaniem jest dotrzeć do zielonych pól. Powodzenia!", 400, 30, 1280)
        context2.fillText("Witajcie w grze. Waszym zadaniem jest dotrzeć do zielonych pól. Powodzenia!", 400, 30, 1280)
        break;
      }
      case 2: {
        context.fillText("Zręczność to nie wszystko. Mimo, że metę symbolizuje zawsze ten sam kolor znalezienie jej nie musi byc takie łatwe. Wskazówka: współpracujcie", 100, 30, 1280)
        context2.fillText("Zręczność to nie wszystko. Mimo, że metę symbolizuje zawsze ten sam kolor znalezienie jej nie musi byc takie łatwe. Wskazówka: współpracujcie", 200, 30, 1280)
        break;
      }
      case 3: {
        context.fillText("W grze występują obiekty interaktywne. Rozpoznasz je po innym kolorze. Kliknij klawisz E gdy jesteś obok nich, aby aktywować mechanizm!", 120, 30, 1280)
        context2.fillText("W grze występują obiekty interaktywne. Rozpoznasz je po innym kolorze. Kliknij klawisz . gdy jesteś obok nich, aby aktywować mechanizm!", 120, 30, 1280)
        break;
      }
      case 4:{
        context.fillText("Gra ma jeszcze jedną dość ważną mechanikę. Spróbuj ją odkryć!", 400, 30, 1280)
        context2.fillText("Gra ma jeszcze jedną dość ważną mechanikę. Spróbuj ją odkryć!", 400, 30, 1280)
        break;
      }


    }
  }

}
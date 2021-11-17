let canvas;
let context;

let gameLoop;
let player;
let borders = [];
let interactives = [];

let showTips = true
//inputs
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

//game settings
let framerate = 45;
let interactiveRange = 152;


let playerOneFinished;
let playerTwoFinished;

let curLevel = 3;
let maxLevel = curLevel;

function loadSettings() {
  console.log("dzialam" + showTips)
  showTips = document.querySelector("#showTips").checked
}
function restartLevel(){
setupLvl(curLevel)
}
function clearErrorMsg(){
  errorMsg.innerHTML=""
}
function prevLevel(){
if(curLevel-1>0){
  curLevel--;
  setupLvl(curLevel)
}else{
  errorMsg.innerHTML="Jesteś już na pierwszym poziomie"
  setTimeout(clearErrorMsg,2000)
}
}
function nextLevel(){
if(curLevel<maxLevel){
  curLevel++;
  setupLvl(curLevel)
}else{
  errorMsg.innerHTML="Aby odblokować kolejny poziom najpierw przejdź obecny"
  setTimeout(clearErrorMsg,2000)
}
}
window.onload = function () {
  loadSettings()
  document.querySelector("#showTips").addEventListener("click", loadSettings)
  document.querySelector("#resetGame").addEventListener("click", restartLevel)
  document.querySelector("#prevLevel").addEventListener("click", prevLevel)
  document.querySelector("#nextLevel").addEventListener("click", nextLevel)

  errorMsg=document.querySelector("#errorMessage")
  canvas = document.getElementById("gameCnv");
  context = canvas.getContext("2d");

  canvas2 = document.getElementById("gameCnv2");
  context2 = canvas2.getContext("2d");

  player = new Player(10, 40, 0);
  player2 = new Player(30, 40, 1);

  gameLoop = setInterval(step, 1000 / framerate);

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

  context.fillStyle = "lightGray";
  context.fillRect(0, 0, 1280, 360);
  context2.fillStyle = "lightGray";
  context2.fillRect(0, 0, 1280, 360);
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

function checkIntersection(r1, r2) {
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
        if (r2.interactive.active == true) {

          return false;
        }
      }
      return true;
    }
  }
}

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

function setupLvl(level) {
  context2.fillRect(0, 0, 1280, 360);
  context.fillRect(0, 0, 1280, 360);
  playerOneFinished = false;
  playerTwoFinished = false;
  borders = [];
  interactives=[];
  player.x=0
  player.y=0
  player2.x=0
  player2.y=0
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
    context.fillStyle = "black"

  }
  if (level == 2) {
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
    interactives.push(new InteractiveObject(100, 102, 50, 50, 0, 0));
    borders.push(new Border(1100, 150, 10, 520, 3, 0, interactives[0],"black"));
    
    interactives.push(new InteractiveObject(100, 102, 50, 50, 1, 1));
    borders.push(new Border(1100, 150, 10, 520, 3, 1, interactives[1],"black"));

    borders.push(new Border(300,210,50,90,1,0,null,"black"))
    borders.push(new Border(200,280,50,80,1,0,null,"black"))
    borders.push(new Border(100,150,100,20,1,0,null,"black"))

    borders.push(new Border(300,210,50,90,1,1,null,"black"))
    borders.push(new Border(200,280,50,80,1,1,null,"black"))
    borders.push(new Border(100,150,100,20,1,1,null,"black"))

    borders.push(new Border(0, 350, 1280, 10, 1, 0, null,"black"));
    borders.push(new Border(0, 350, 1280, 10, 1, 1, null,"black"));

    borders.push(new Border(1150, 340, 1280, 10, 2, 0, null,"green"));
    borders.push(new Border(1150, 340, 1280, 10, 2, 1, null,"green"));

  }

  if(level==4){
    borders.push(new Border(0, 350, 200, 10, 1, 0, null,"black"));
    borders.push(new Border(0, 350, 200, 10, 1, 1, null,"black"));

    borders.push(new Border(350, 130, 100, 100, 1, 0, null,"black"));
    borders.push(new Border(530, 100, 100, 100, 1, 0, null,"black"));
    borders.push(new Border(750, 230, 100, 50, 1, 0, null,"black"));

    borders.push(new Border(350, 130, 100, 100, 1, 1, null,"black"));
    borders.push(new Border(530, 100, 100, 100, 1, 1, null,"black"));
    borders.push(new Border(750, 230, 100, 50, 1, 1, null,"black"));

    
    

    borders.push(new Border(1150, 340, 1280, 10, 2, 0, null,"green"));
    borders.push(new Border(1150, 340, 1280, 10, 2, 1, null,"green"));
  }
}

function checkLvl() {
  if (playerOneFinished && playerTwoFinished) {
    curLevel++;
    if(curLevel>maxLevel){
      maxLevel=curLevel;
    }
    setupLvl(curLevel);
  }
}

function drawTips() {

  context.fillStyle = "black"
  context2.fillStyle = "black"
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
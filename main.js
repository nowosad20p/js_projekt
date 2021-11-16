let canvas;
let context;

let gameLoop;
let player;
let borders = [];
let interactives = [];


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
let framerate=45;
let interactiveRange=152;

let playerOneFinished;
let playerTwoFinished;

let curLevel = 2;

window.onload = function() {
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
  for(let i=0;i<interactives.length;i++){
     interactives[i].check(player.x,player.y,player.height,player.with);
     interactives[i].check(player2.x,player2.y,player.height,player.width);
  }
}
function draw() {
  context.fillStyle = "lightGray";
  context.fillRect(0, 0, 1280, 360);
  context2.fillStyle = "lightGray";
  context2.fillRect(0, 0, 1280, 360);
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
  document.addEventListener("keydown", function(event) {
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
  document.addEventListener("keyup", function(event) {
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
  if (r1.x > r2.x + r2.width) {
    objective(false, r1.type);
    return false;
  } else if (r1.x + r1.width <= r2.x) {
    objective(false, r1.type);
    return false;
  } else if (r1.y >= r2.y + r2.height) {
    objective(false, r1.type);
    return false;
  } else if (r1.y + r1.height <= r2.y) {
    objective(false, r1.type);
    return false;
  } else {
    if (r2.type == 2) {
      if (r1.y < r2.y) {
        objective(true, r1.type);
      }
    }
    if(r1.gameNmr!=r2.gameNmr){
      return false;
    }
    if(r2.interactive.active==true){
      return false;
    }
    return true;
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
  if (level == 1) {
    borders.push(new Border(0, 350, 1280, 10, 1, 1,null));
    borders.push(new Border(0, 350, 1280, 10, 1, 0,null));
    borders.push(new Border(100, 310, 100, 100, 1, 0,null));
    borders.push(new Border(100, 310, 100, 100, 1, 1,null));
    borders.push(new Border(310, 260, 100, 50, 1, 0,null));
    borders.push(new Border(310, 260, 100, 50, 1, 1,null));
    borders.push(new Border(610, 190, 100, 50, 1, 0,null));
    borders.push(new Border(610, 190, 100, 50, 1, 1,null));
    borders.push(new Border(810, 190, 100, 50, 2, 0,null));
    borders.push(new Border(810, 190, 100, 50, 2, 1,null));
  }
  if (level == 2) {
    interactives.push(new InteractiveObject(1001, 250, 50, 50, 0, 0));
    interactives.push(new InteractiveObject(1010, 250, 50, 50, 1, 1));
    borders.push(new Border(0, 350, 1280, 10, 3, 0,interactives[0]));
    borders.push(new Border(0, 350, 1280, 10, 3, 1,interactives[1]));
    
  }
}
function checkLvl() {
  if (playerOneFinished && playerTwoFinished) {
    curLevel++;
    setupLvl(curLevel);
  }
}

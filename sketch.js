var form, game, player, playercount, backgroundimg, database,gamestate;
var car1, car1img, car2, car2img, cars, pistaimg;
var allplayers;
var fuelimg,fuels,coinimg,coins,obs1img,obs2img,obs,life,lifeimg;
var blastimg;


function preload() {
  backgroundimg=loadImage("assets/planodefundo.png");
  pistaimg=loadImage("assets/PISTA.png");
  car1img=loadImage("assets/car1.png");
  car2img=loadImage("assets/car2.png");
  fuelimg=loadImage("assets/fuel.png");
  coinimg=loadImage("assets/goldCoin.png");
  obs1img=loadImage("assets/obstacle1.png");
  obs2img=loadImage("assets/obstacle2.png");
  lifeimg=loadImage("assets/life.png");
  blastimg=loadImage("assets/blast.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.lerEstado();
  game.start();
  
  
}

function draw() {
  background(backgroundimg);
  
  if(playercount === 2){
     game.atualizarestado(1);
  }
  if(gamestate === 1){
    game.play();
  }

  if(gamestate === 2){
    game.showplacar();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

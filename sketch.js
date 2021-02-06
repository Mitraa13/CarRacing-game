var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var cars;
var car1,car2,car3,car4;

var car1img,car2img,car3img,car4img,groundimg,trackimg;
var goldimg,silverimg,bronzeimg;
var finishedplayer = 0;
var passedfinish;

function preload(){
  car1img = loadImage("images/car1.png");
  car2img = loadImage("images/car2.png");
  car3img = loadImage("images/car3.png");
  car4img = loadImage("images/car4.png");
  groundimg = loadImage("images/ground.jpg");
  trackimg = loadImage("images/track.jpg");
  goldimg = loadImage("images/1gold.jpg");
  silverimg = loadImage("images/2silver.jpg");
  bronzeimg = loadImage("images/3bronze.jpg");
}


function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  
  background(groundimg);

  if(playerCount === 4 && finishedplayer === 0){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedplayer===4){
    game.update(2);
  }
  if(gameState === 2 && finishedplayer === 4){
    game.displayRanks();
  }


}

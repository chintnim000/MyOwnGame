var player1_img,player1_jumping,player1_running;
var player2_img,player2_jumping,player2_running;
var player3_img,player3_jumping,player3_running;
var player4_img,player4_jumping,player4_running;
var player1,player2,player3,player4;
var divider1,divider2,divider3,divider4;
var form,race,game,player,track,hurdle,hurdleImg,hurdleGroup;
var gameState=0;
var playerCount, PlayersAtEnd;
var database;
var distance=0;
var allPlayers;
var players=[];

function preload(){
    track=loadImage("images/track1.jpg");
    loadSpriteImages();
   
    hurdleTouchSound=loadSound("Sounds/hurdleTouch.mp3");
    raceStartSound=loadSound("Sounds/raceStart.mp3");
    jumpingSound=loadSound("Sounds/jumping.mp3");

}

function setup() {
    createCanvas(displayWidth-20, displayHeight-30);

    database=firebase.database();
    game=new Game();
    game.getState();
    game.start();
  
}
function draw() {
    
    if(playerCount===4 && gameState===0){
        game.update(1);
        raceStartSound.play();
    }
    if(gameState===1){
        clear();
        game.play();
        if(World.frameCount%30===0){
            player.time++;
        }
        player.displayTime();
    } 
}
function loadSpriteImages(){
    player1_img=loadAnimation("images/player1.png");
    player1_notrunning=loadAnimation("images/NotRunning1.png");
    player1_jumping=loadAnimation("images/jumping/jumping1.png","images/jumping/jumping2.png",
    "images/jumping/jumping3.png","images/jumping/jumping4.png",
    "images/jumping/jumping5.png","images/jumping/jumping6.png");
    player1_running=loadAnimation("images/running/running1.png","images/running/running2.png",
    "images/running/running3.png","images/running/running4.png",
    "images/running/running5.png","images/running/running6.png");

    player2_img=loadAnimation("images/player2.png");
    player2_notrunning=loadAnimation("images/NotRunning2.png");
    player2_jumping=loadAnimation("images/jumping/jumping21.png","images/jumping/jumping22.png",
    "images/jumping/jumping23.png","images/jumping/jumping24.png",
    "images/jumping/jumping25.png","images/jumping/jumping26.png");
    player2_running=loadAnimation("images/running/running21.png","images/running/running22.png",
    "images/running/running23.png","images/running/running24.png",
    "images/running/running25.png","images/running/running26.png");

    player3_img=loadAnimation("images/player3.png");
    player3_notrunning=loadAnimation("images/NotRunning3.png");
    player3_jumping=loadAnimation("images/jumping/jumping31.png","images/jumping/jumping32.png",
    "images/jumping/jumping33.png","images/jumping/jumping34.png",
    "images/jumping/jumping35.png","images/jumping/jumping36.png");
    player3_running=loadAnimation("images/running/running31.png","images/running/running32.png",
    "images/running/running33.png","images/running/running34.png",
    "images/running/running35.png","images/running/running36.png");

    player4_img=loadAnimation("images/player4.png");
    player4_notrunning=loadAnimation("images/NotRunning4.png");
    player4_jumping=loadAnimation("images/jumping/jumping41.png","images/jumping/jumping42.png",
    "images/jumping/jumping43.png","images/jumping/jumping44.png",
    "images/jumping/jumping45.png","images/jumping/jumping46.png");
    player4_running=loadAnimation("images/running/running41.png","images/running/running42.png",
    "images/running/running43.png","images/running/running44.png",
    "images/running/running45.png","images/running/running46.png");

    hurdleImg=loadImage("images/hurdle.png");

}



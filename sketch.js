
var jake, jake_running;
var ground, invisibleGround, groundImg;
var  coinImg;
var bomb, bombImg;
var energyDrink, energyDImg;
var power, powerImg;
var END =0;
var PLAY =1;
var gameState = PLAY;

var score=0;
var gameOver, restart;

var edges;
var coinG,bombG,eDG,powerG;
var gameOImg;
var rImg;

function preload() {
  jake_running = loadAnimation("jake3.png", "jake4.PNG", "jake5.png");
  coinImg = loadImage("coin.png")
  bombImg = loadImage("bomb.png")
  energyDImg = loadImage("energyDrink.png")
  powerImg = loadImage("power.png")
  rImg = loadImage("restart.png")
  gameOImg = loadImage("gameOImg.jpg")
  groundImg = loadImage("path.png")
}

function setup() {
//createCanvas(400, 500);


  
//create a ground sprite
 createCanvas(500, 500);
  ground = createSprite(250,100)
  ground.addImage(groundImg)
  ground.scale = 1.6
  ground.velocityY = 0.5
  
  //create a trex sprite
jake = createSprite(250,450,20,50);
jake.addAnimation("running", jake_running);
jake.scale = 0.8;
  //jake.debug= true;
  //jake.setCollider("rectangle",0,0,10,50)
  

gameOver = createSprite(250,150);
gameOver.addImage(gameOImg);
gameOver.scale = 0.3;
gameOver.visible = false; 
  
restart = createSprite(250,280);
restart.addImage(rImg);
restart.scale = 0.2;
restart.visible = false; 
  
   coinG = new Group();
  bombG = new Group();
  
  
}

function draw() {
 background(220);
  textSize(20);
  fill("white");
  text("Score: "+ score,400,50);
  
  if(gameState===PLAY){
    
  
   ground.velocityY = -(6 + 2*score/150);
  
   jake.x = World.mouseX;
  
   edges= createEdgeSprites();
   jake .collide(edges);
  
  //code to reset the background
  if(ground.y < 0 ){
    ground.y = height/2;
    
  }
  spwanCoins();
    spwanBombs();
    
  if(coinG.isTouching(jake)){
    
    coinG.destroyEach();
    score = score +10
    
  }
    
    if(bombG.isTouching(jake)){
      gameState = END;
    }
    
    if( gameState === END) {
      ground.velocityY = 0;
      jake.destroy();
      coinG.destroyEach();
      bombG.destroyEach();
      gameOver.visible = true;
      restart.visible = true;
      if(mousePressedOver(restart)){
        gameOver.visible = false;
  restart.visible = false;
  score = 0;
  gameState = PLAY
      }
    }
  }
drawSprites();
  textSize(20); fill(255); text("Score: "+ score,150,30);
}
  
function spwanCoins(){
  if (World.frameCount % 150 === 0) {
    var coin = createSprite(100,0,40,10);
    coin.x = Math.round(random(50,450));
    coin.addImage(coinImg);
    coin.scale = 0.5
    coin.velocityY = 5;
    //coin.debug = true;
    //coin.setCollider("circle",0,0,15)
     //assign lifetime to the variable
    coin.lifetime = 90;
    
    
    
    coinG.add(coin);
}
}
function spwanBombs(){
if (World.frameCount % 250 === 0) {
    var bomb = createSprite(150,0,40,10);
    bomb.x = Math.round(random(50,450));
    bomb.addImage(bombImg);
    bomb.scale = 0.1;
    bomb.velocityY = 4;
    
     //assign lifetime to the variable
    bomb.lifetime = 120;;
    
    
    //add each cloud to the group
    bombG.add(bomb);
}
}

function restart(){
  
}

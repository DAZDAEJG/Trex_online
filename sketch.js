var trex, trex_running, trex_collided,trex_down;
var bird, birdimage;
var ground, invisibleGround, groundImage;
var invfloor;
var cloud, cloudimage;
var cactus, cactusimage, cactusimage2, cactusimage3, cactusimage4, cactusimage5, cactusimage6;
var restart, restartimage;
var gameO, gameOimage;
var cloudgroup;
var cactusgroup;
var birdgroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  trex_down= loadAnimation('trex_down1.png','trex_down2.png');
  
  birdimage=loadAnimation('bird1.png','bird2.png');
  
  cloudimage = loadImage('cloud.png');

  cactusimage = loadImage('obstacle1.png');
  cactusimage2 = loadImage('obstacle2.png');
  cactusimage3 = loadImage('obstacle3.png');
  cactusimage4 = loadImage('obstacle4.png');
  cactusimage5 = loadImage('obstacle5.png');
  cactusimage6 = loadImage('obstacle6.png');
  
  groundImage = loadImage("ground2.png");
  
  restartimage = loadImage('restart.png');
  
  gameOimage = loadImage('gameOver.png');
}

function setup() {

createCanvas(600, 200);

//crea el sprite del Trex
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation('collided',trex_collided);
trex.addAnimation('down',trex_down);
trex.scale = 0.5;
trex.setCollider ('circle',0,0,45); 
trex.debug=true;
  
//crea el sprite del suelo
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
  
restart = createSprite(300,100);
restart.addImage(restartimage);
restart.scale=0.5;
  
gameO = createSprite(300,150);
gameO.addImage(gameOimage);
gameO.scale=0.5;

  
invfloor = createSprite(200,200,400,20);
invfloor.visible=false;
  
cloudgroup = new Group();
cactusgroup = new Group();
birdgroup = new Group();

console.log('No'+'Yes');
}

function draw() {
  

  background(60);
  
  if (gamestate === PLAY){
      restart.visible=false;
      gameO.visible=false;
      ground.velocityX = -4;
      score = score + Math.round(frameCount/60);
      text('0'+score,530,20);
    if (ground.x < 0) {
  
    ground.x = ground.width / 2;
  
    }
    if (keyDown("space")&&trex.y>=166) {
  
    trex.velocityY = -15;
  }
    if (keyDown('DOWN_ARROW')){
      trex.changeAnimation('down',trex_down);
      trex.setCollider ('rectangle',0,20,45,50); 
    }
    else{
      trex.changeAnimation('running',trex_running);
      trex.setCollider ('circle',0,0,45); 
    }
  trex.velocityY = trex.velocityY + 0.8

  cloudgen();
  cacti();
  birdgen();
    
  if(cactusgroup.isTouching(trex)){
    gamestate = END;
   }  
  if(birdgroup.isTouching(trex)){
    gamestate= END;
  }
  }
  else if (gamestate === END){
  restart.visible=true;
  gameO.visible=true;
  trex.velocityY = 0; 
  ground.velocityX = 0;
  cactusgroup.setVelocityXEach(0);
  cloudgroup.setVelocityXEach(0);
  cactusgroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
 
  trex.changeAnimation('collided',trex_collided);
  if (mousePressedOver(restart)){
    reset();
  }
  }
//salta cuando se presiona la barra espaciadora

  
  
  

  trex.collide(invfloor);
  
  drawSprites();
  
  console.count();
}

function reset() {
  cactusgroup.destroyEach();
  cloudgroup.destroyEach();
  birdgroup.destroyEach();
  score=0;
  trex.changeAnimation('running',trex_running);
  gamestate = PLAY;
}
function cloudgen(){
  if (frameCount%60===0){
    cloud=createSprite(600,0,30,30);
    cloud.addImage(cloudimage);
    cloud.y=Math.round(random(10,60));
    cloud.scale = 0.2;
    cloud.velocityX=- 4;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloud.lifetime=200;
    cloudgroup.add(cloud);
  }
}
function cacti(){
  if (frameCount%90===0){
    cactus=createSprite(600,165,10,40);
    cactus.velocityX=- 4;
    var select = Math.round(random(1,6));
    switch(select){
      case 1: cactus.addImage(cactusimage);
           break;  
      case 2: cactus.addImage(cactusimage2);
           break;
      case 3: cactus.addImage(cactusimage3);
           break;
      case 4: cactus.addImage(cactusimage4);
           break;  
      case 5: cactus.addImage(cactusimage5);
           break;
      case 6: cactus.addImage(cactusimage6);
           break; 
      default: break;     
  }
    cactus.scale=0.09;
    cactus.lifetime=200;
    cactusgroup.add(cactus);
 }
}
function birdgen(){
   if (frameCount%120===0){
     bird=createSprite(600,140,20,20);
     bird.addAnimation('bird',birdimage);
     bird.velocityX=-7;
     bird.scale=0.5;
     bird.lifetime=200;
     birdgroup.add(bird);
   }
}
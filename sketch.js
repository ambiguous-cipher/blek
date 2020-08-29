var monkeyImg;
var bananaImg, foodGroup;
var obstacleImg, obstacleGroup;
var backgroundImg
var score

function preload(){
// the image of the background
  backgroundImg = loadImage("jungle.jpg");

// the image of the obstacles  
  obstacleImg = loadImage("stone.png");

// the player avatar  
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

// the image of the food   
  bananaImg = loadImage("banana.png");
  
//sets the score
  score = 0;
}

function setup() {
  createCanvas(400, 400);
  
  backgroundSprite = createSprite(400, 200, 10, 10);
    backgroundSprite.addImage("background", backgroundImg);
    backgroundSprite.velocityX = -5;
  
  ground = createSprite(200, 380, 400, 20);
    ground.visible = false;
  
  player = createSprite(60, 340, 10, 10);
    player.addAnimation("walkingPlayer", monkeyImg);
    player.scale = 0.1;
    
  
  foodGroup = new Group();
  obstacleGroup = new Group(); 
}

function draw() {
  background(220);
  
  player.velocityY = player.velocityY + 0.8      
  
  player.collide(ground); 
  
  if (backgroundSprite.x < -100){
    backgroundSprite.x = backgroundSprite.width/2;
  }
  
  if (keyDown("space") && player.y > 325){
   player.velocityY = -10           
  }
  
  if (foodGroup.isTouching(player)){
   score = score + 2;
   foodGroup.destroyEach();
  }
  
  switch(score){
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
      default: break;
  }
  
  if (obstacleGroup.isTouching(player)){
   score = 0; 
  }
  
  //help pls
  
  
  console.log(score);
  
  food();
  spawnObstacles();
  drawSprites();
  
  stroke(rgb(255, 255, 255));
  textSize(20);
  fill(rgb(255, 255, 255));
  text("Score: " + score, 300, 50);
}

function food(){
 if (frameCount % 80 === 0){
  var banana = createSprite(600, 360, 10, 10);
   banana.addImage("the food", bananaImg);
   banana.collide(ground);
   banana.velocityX = -5;
   banana.scale = 0.04;
   banana.lifetime = 300;
   foodGroup.add(banana);
   banana.setCollider("rectangle", 0, 0, 10, 100);
 }
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
  var obstacle = createSprite(600, 350, 10, 10);
   obstacle.addImage("the obstacles", obstacleImg);
   obstacle.collide(ground);
   obstacle.velocityX = -5;
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
   obstacle.setCollider("circle", 0, 0, 200);
 }
}
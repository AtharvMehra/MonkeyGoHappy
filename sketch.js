
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var invisibleGround
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);
  
  invisibleGround=createSprite(290,360,190,10)
  invisibleGround.visible=false;
  
  banana=createSprite(600,Math.round(random(120,200)),30,30);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-4;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.velocityX=0;
  monkey.scale=0.1
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-89;
   
  console.log(ground.x);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
}


function draw() {
  background("white");
  
  if(frameCount%300===0){
    obstacle=createSprite(600,330,10,40);
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.1;
  obstacle.velocityX=-4;
  }
  
  if(frameCount%150===0){
  banana=createSprite(600,Math.round(random(120,200)),30,30);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-4;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  stroke("black");
  textSize("20");
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,100,50);
  
  FoodGroup.add(banana);
  
  if(monkey.isTouching(FoodGroup)){
   FoodGroup.destroyEach(banana);
    }
  
  FoodGroup.lifetime=100;
  
  if(monkey.isTouching(obstacleGroup)){
   monkey.destroyEach();
    }
  
  obstacleGroup.lifetime=(-1);
  
  if(obstacleGroup.isTouching(invisibleGround)){
    obstacle.velocityX=2;
  }
  
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-100);
  
  
   FoodGroup.lifetime=100;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
   }
  
  if(keyDown("space")&& monkey.y>=290){
    monkey.velocityY=-24;
  }
    
  monkey.velocityY=monkey.velocityY + 2.0;
  
  monkey.collide(ground);
  obstacleGroup.collide(invisibleGround);
  
  
  
 drawSprites();
  
}







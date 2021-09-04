var jumper;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload()
{
  jumperimg=loadAnimation("sm1.png","sm2.png","sm3.png")
  jumperstanding=loadAnimation("sm1.png","sm1.png")
  gameoverimg=loadImage("gameover.jpg")
  restartimg=loadImage("restart.png")
}
function setup() {
  createCanvas(1000,600);
  jumper=createSprite(500, 300, 50, 50);
  gameover=createSprite(500,200);
  restart=createSprite(500,400);
  gameover.addImage(gameoverimg);
  restart.addImage(restartimg);
  gameover.scale=0.2;
  restart.scale=0.2;
  
  jumper.addAnimation("standing",jumperstanding);
  jumper.addAnimation("jumper",jumperimg);
  ground=createSprite(500,580,1000,15);
  leftloggroup=new Group();
  rightloggroup=new Group();
  
}


function draw() {
  background("black"); 
  if(gameState===PLAY)
{
  if(keyDown("space"))
  {
    jumper.velocityY=-10;
    jumper.changeAnimation("jumper",jumperimg);
  }
  if(keyWentUp("space"))
  {
    jumper.changeAnimation("standing",jumperstanding);
  }
  if(keyDown(LEFT_ARROW))
{ 
  jumper.x=jumper.x-5;
} 
if(keyDown(RIGHT_ARROW))
{ 
  jumper.x=jumper.x+5;
}
 jumper.velocityY=jumper.velocityY+0.5;
 topright();
 topleft();
 if(jumper.isTouching(leftloggroup)||jumper.isTouching(rightloggroup)|| jumper.isTouching(ground))
 {
  restart.visible="false"
  gameover.visible="false"
   gameState=END;
 }
}
else if(gameState===END)
{
  jumper.velocityY=0;
  rightloggroup.setVelocityYEach(0);
  leftloggroup.setVelocityYEach(0);
  restart.visible="true"
  gameover.visible="true"
}
  
 
  drawSprites();
  if(jumper.collide(leftloggroup))

  {
    //TO END THE GAME
  }

}
function topright()
{
if(frameCount%75===0)
{
  var i=random(10,500);
  log=createSprite(i,0,100,30);
  log.velocityY=10;
  log.lifetime=120;
 rightloggroup.add(log);

}
}
function topleft()
{
  if(frameCount%50===0)
{
  var x=random(500,1000);
  log=createSprite(x,0,100,30);
  log.velocityY=10;
  log.lifetime=120;
 leftloggroup.add(log);
}
}

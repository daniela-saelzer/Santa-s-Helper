var sandy;
var happyElfImg;

var wToy,rToy,wToyGroup,rToyGroup;
var horseToy,carToy,guitarToy,boatToy;
var basketToy,treeToy,clockToy,fridgeToy;
var conveyor,conveyorImg;
var backImg;

var selectToy;

var wCount = 0, rCount = 0;

var gameState = "wait";

var reset,resetImg;

var gameOver,betterLuck,youWin;


function preload(){
  happyElfImg = loadImage("Images/happyElf.png");
  conveyorImg = loadImage("Images/conveyor.png");

 //backImg = loadImage("Image");
  horseToy = loadImage("Images/horseToy.png");
  carToy = loadImage("Images/carToy.png"); 
  boatToy = loadImage("Images/boatToy.png"); 
  guitarToy = loadImage("Images/guitarToy.png");   

  basketToy = loadImage("Images/basketToy.png");
  treeToy = loadImage("Images/treeToy.png");
  fridgeToy = loadImage("Images/fridgeToy.png");
  clockToy = loadImage("Images/clockToy.png");

  backImg = loadImage("Images/backgroundImg.png");

  gameOver = loadImage("Images/gameOver.png");
  youWin = loadImage("Images/youWin.jpg");
  betterLuck = loadImage("Images/betterLuck.png");
  resetImg = loadImage("Images/resetButton.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  sandy = createSprite(windowWidth/2+380, windowHeight-350, 50, 50);
  sandy.addImage("happyElf",happyElfImg);
  //&happyElfImg.resize(0,windowHeight/3);
  //sandy.scale = 4;

  reset = createSprite(windowWidth/2,windowHeight/2);
  reset.addImage(resetImg);
  resetImg.resize(windowWidth/3,0);
  //wToy = createSprite(600,200,50,50);

  conveyor = createSprite(windowWidth/2,windowHeight/2 + 150,windowWidth,50);
  conveyor.scale = 5;
  conveyor.addImage(conveyorImg);
  //&conveyorImg.resize(windowWidth,windowHeight/2);
  //conveyor.debug = true;
  //conveyor.setCollider("rectangle",0,0,400,400);

  wToyGroup = new Group();
  rToyGroup = new Group();

  clockToy.resize(0,150);
  fridgeToy.resize(0,150);
  treeToy.resize(0,150);
  basketToy.resize(0,230);

  horseToy.resize(0,70);
  boatToy.resize(0,200);

  textFont("Brush Script MT");
  fill("red");
  textSize(40);
}

function draw() {
  background("green");

  if(gameState==="wait"){

    conveyor.visible = false;
    reset.visible = false;

    textSize(40);
    fill("red");
    text("Welcome to Santa's Factory!",10,windowHeight/4);
    text("Santa needs help and you are the one for the job.",10,windowHeight/4 + 50)
    text("Help by clicking 50 right presents.",10,windowHeight/4 + 100)
    text("But if you click 10 wrong presents you can lose your job as an elf.",10,windowHeight/4 + 150)
    text("It's your job to save Christmas this year!",10,windowHeight/4 + 200)

    text("Right Presents:",10,windowHeight/4 + 300);
    image(horseToy,10,windowHeight/4 + 350);
    image(boatToy,140,windowHeight/4 + 350,100,100);
    image(carToy,200,windowHeight/4 + 350);
    image(guitarToy,370,windowHeight/4 + 350);

    text("Wrong Presents:",10,windowHeight/4 + 500);
    image(basketToy,10,windowHeight/4 + 550,100,100);
    image(fridgeToy,100,windowHeight/4 + 550,100,100);
    image(clockToy,250,windowHeight/4 + 550,70,100);
    image(treeToy,350,windowHeight/4 + 550,100,100);

    text("Press Space to Start",windowWidth/2 - 200,windowHeight - 50)

  

    if(keyDown("space")){
      gameState = "play";

    }


  }

  if(gameState==="play"){
    background(backImg);

    conveyor.visible = true;
    reset.visible = false;

    //Display score
    text("Wrong Presents: " + wCount,windowWidth - 400,100);
    text("Right Presents: " + rCount,windowWidth - 400,150);

    // Spawn the toys randomly depending on the variable selectToy
    if(World.frameCount % 80 === 0){
      selectToy=Math.round(random(1,2));
      
      if(selectToy===1){
        spawnRToy();
      }
      if(selectToy===2){
        spawnWToy();
      }
    }

    //Increment the score
    for(var i = 0; i<rToyGroup.length; i++){
      if(mouseWentDown(LEFT)){
        if(mousePressedOver(rToyGroup.get(i))){
          rCount = rCount + 1;
          rToyGroup.remove(rToyGroup.get(i));
          //rToyGroup.get(i).changeImage()
        }
      }
    }
   
  for(var i = 0; i<wToyGroup.length; i++){
    if(mouseWentDown(LEFT)){
      if(mousePressedOver(wToyGroup.get(i))){
        wCount = wCount + 1;
        wToyGroup.remove(wToyGroup.get(i));
      }
    }
  }
    

    if(rCount===5 || wCount===5){
      gameState = "over";
    }

}


if(gameState==="over"){
  text("Wrong Presents: " + wCount,windowWidth - 400,100);
  text("Right Presents: " + rCount,windowWidth - 400,150);

  rToyGroup.destroyEach();
  wToyGroup.destroyEach();

  reset.visible = true;

  conveyor.visible = false;
  sandy.visible = false;


  //image(gameOver,windowWidth/2,15,width/4,height/4);
  
  
  if(wCount===5){
    text("Better Luck Next Time!",windowWidth/3,windowHeight-50);
   // image(betterLuck,windowWidth/2,windowHeight/2,width/4,height/4);
  }

  if(rCount===5){
    text("You Win!",windowWidth/2,windowHeight - 50);
  // image (youWin,windowWidth/2,windowHeight/2,width/4,height/4);        
  }

  if(mousePressedOver(reset)){
    restart();
  }

}

 drawSprites();

}

function restart(){
  gameState = "play";
  rCount = 0;
  wCount = 0;

}

function spawnRToy(){
  rToy = createSprite(0,windowHeight/2 + 160,50,50);
  //rToy.debug = true;
  conveyor.depth = rToy.depth + 1;
  rToy.velocityX = 4 + rCount/10;
  rToy.scale = 1.5;
  rToy.lifetime = windowWidth/rToy.velocityX;

  //rToy.collide(conveyor);
  var randomToy = Math.round(random(1,4));
    switch(randomToy){
      case 1: rToy.addImage(horseToy);
        break;
      case 2: rToy.addImage(carToy);
        break;
      case 3: rToy.addImage(boatToy);
        break;
      case 4: rToy.addImage(guitarToy);
        break;
    }

  rToyGroup.add(rToy);

}


function spawnWToy(){
  wToy = createSprite(0,windowHeight/2 + 130,50,50);
  wToy.velocityX = 4 + rCount/10;
  conveyor.depth = wToy.depth + 1;
  //wToy.collide(conveyor);
  wToy.lifetime = windowWidth/wToy.velocityX;
  var randomToy = Math.round(random(1,4));
    switch(randomToy){
      case 1: wToy.addImage(basketToy);
        break;
      case 2: wToy.addImage(clockToy);
        break;
      case 3: wToy.addImage(fridgeToy);
        break;
      case 4: wToy.addImage(treeToy);
        break;
    }
    wToyGroup.add(wToy);
  }

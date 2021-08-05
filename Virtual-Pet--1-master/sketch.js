//Create variables here
var dog, happyDog;
var database;
var foodS,foodStock;
 var dogimg,happydogimg;

function preload()
{
  happydogimg = loadImage("images/happydog.png");
  dogimg = loadImage("images/Dog.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(200,200,10,10);
  dog.addImage(dogimg);
  dog.scale = 0.15;
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readstock);
}


function draw() {  
  background(46,139,87);
  
  if (keyWentDown(UP_ARROW)){
    writestock(foodS);
    dog.addImage(happydogimg);
  }
  
  drawSprites();
  //add styles here
  fill("red");
  text("food remaning:" +foodS , 350,450);
}

function readstock(data){
  foodS = data.val()  
}

function writestock(x){
  if (x<=0){
    x=0
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    food:x
  })
}


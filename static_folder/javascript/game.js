var myPlayer;
var obstacles = [];

function startGame() {
  myGameArea.start();
  myPlayer = new component(30, 30, "red", myGameArea.canvas.width/2-15, myGameArea.canvas.height/2-15, "player");
  obstacles = [
    //boundaries
    new component(1, myGameArea.canvas.height, "black", 0, 0),
    new component(myGameArea.canvas.width, 1, "black", 0, myGameArea.canvas.height-5),
    new component(1, myGameArea.canvas.height, "black", myGameArea.canvas.width-1, 0),
    new component(myGameArea.canvas.width, 1, "black", 0, 0),
    // new component(1, myGameArea.canvas.height, "black", myGameArea.canvas.width-101, 0),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-101),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-201),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-301),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-401),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-501),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-601),
    // new component(100, 1, "black", myGameArea.canvas.width-101, myGameArea.canvas.height-701),
    //objects
    new component(300, 250, "resources/images/speech-bubble-md.png", myGameArea.canvas.width-300, 0, "image")
  ];
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = $(window).width()*0.80;
      this.canvas.height = $(window).height();
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
        e.preventDefault();
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = (e.type == "keydown");
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = (e.type == "keydown");
      })
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  this.activable = false;
  if(type == "player"){
    this.color = color;
    this.direction = "up";
  }else if(type == "image"){
    this.image = new Image();
    this.image.src = color;
  }else if(type == "activableObjects"){
    this.activable = true;
    this.activated = false;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    this.x += this.speedX;
    this.y += this.speedY;
    ctx = myGameArea.context;
    if(this.type == "player"){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }else if(this.type == "image"){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }else if(this.activable){
      if(this.activated){
        console.log("This object got activated");
        this.activated = false;
      }
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }else{
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

function updateKeyItems(){

}

function checkCollision(otherobj, speedX, speedY){
  var newleft = myPlayer.x + speedX;
  var newright = newleft + (myPlayer.width);
  var newtop = myPlayer.y + speedY;
  var newbottom = newtop + (myPlayer.height);
  var otherleft = otherobj.x;
  var otherright = otherobj.x + (otherobj.width);
  var othertop = otherobj.y;
  var otherbottom = otherobj.y + (otherobj.height);
  if((newtop < otherbottom) && (newbottom > othertop) && (newleft < otherright) && (newright > otherleft)){
    return true;
  }else{
    return false;
  }
}

function checkActivableObjects(otherobj){
  var speedX = 0;
  var speedY = 0;
  if(myPlayer.direction == "left"){
    speedX = -2;
  }else if(myPlayer.direction == "right"){
    speedX = 2;
  }else if(myPlayer.direction == "up"){
    speedY = -2;
  }else if(myPlayer.direction == "down"){
    speedY = 2;
  }
  return checkCollision(otherobj, speedX, speedY);
}

function updateGameArea() {
  // var t0 = performance.now();
  myGameArea.clear();
  for(var i = 0; i < obstacles.length; i+=1){
    obstacles[i].update();
  }
  myPlayer.speedX = 0;
  myPlayer.speedY = 0;
  if (myGameArea.keys && myGameArea.keys[37]) {myPlayer.speedX = -2; myPlayer.color = "green"; myPlayer.direction = "left";} /*left*/
  if (myGameArea.keys && myGameArea.keys[39]) {myPlayer.speedX = 2; myPlayer.color = "yellow"; myPlayer.direction = "right";} /*right*/
  if (myGameArea.keys && myGameArea.keys[38]) {myPlayer.speedY = -2; myPlayer.color = "red"; myPlayer.direction = "up";} /*up*/
  if (myGameArea.keys && myGameArea.keys[40]) {myPlayer.speedY = 2; myPlayer.color = "blue"; myPlayer.direction = "down";} /*down*/
  for(var i = 0; i < obstacles.length; i+=1){
    if(checkCollision(obstacles[i], myPlayer.speedX, myPlayer.speedY)){
      myPlayer.speedX = 0;
      myPlayer.speedY = 0;
      break;
    }
  }
  myPlayer.update();
  if (myGameArea.keys && myGameArea.keys[32]) {
    for(var i = 0; i < obstacles.length; i+=1){
      if(checkActivableObjects(obstacles[i])){
        obstacles[i].activated = true;
      }
    }
  }
  // var t1 = performance.now();
  // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}

$(document).ready(startGame)

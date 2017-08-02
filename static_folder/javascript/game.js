var myPlayer, myText, girlBack, girlFront, girlLeft, girlRight;
var obstacles = [];
var text = "Grace has been kidnapped in her sleep and locked in an unknown room. Gather the clues to discover who the culprit is and escape the room.";
//var text = "This is a picture of the sun. This text is for testing purposes. Good bye and have a nice day!"

function startGame() {
  myGameArea.start();
  loadImages();
  myPlayer = new component(73, 149, girlBack, myGameArea.canvas.width/2-15, myGameArea.canvas.height/2-15, "player");
  myText = new textMessage("15px Fantasy", "black", myGameArea.canvas.width-160, 40);
  //wallpaper
  for(var i = 10; i <= 1120; i+=80){
    console.log(i);
    obstacles.push(new component(80, 150, "/resources/images/wallpaper.png", i, 10, "image"));
  }
  obstacles.push(
    //boundaries
    new component(300, myGameArea.canvas.height-265, "white", myGameArea.canvas.width-310, 265),
    new component(10, myGameArea.canvas.height, "black", 0, 0), //left
    new component(10, myGameArea.canvas.height, "black", myGameArea.canvas.width-310, 0), //right
    new component(myGameArea.canvas.width-300, 10, "black", 0, 0), //top
    new component(myGameArea.canvas.width, 10, "black", 0, myGameArea.canvas.height-10), //bottom
    new component(300, 10, "black", myGameArea.canvas.width-300, 0),
    new component(10, myGameArea.canvas.height, "black", myGameArea.canvas.width-10, 0),
    new component(300, 265, "black", myGameArea.canvas.width-300, 0),
    new component(myGameArea.canvas.width-300, 2, "black", 0, 160),
    //new component(10, 260, "black", myGameArea.canvas.width-315, 0),
    //new component(315, 150, "black", myGameArea.canvas.width-315, 260),
    //objects
    new component(300, 250, "/resources/images/speech-bubble-md.png", myGameArea.canvas.width-305, 7, "image", "speech"),
    new component(53, 200, "/resources/images/clock.png", 25, 10, "image", "clock"),
    new component(190, 200, "/resources/images/closet.png", 100, 10, "image", "closet"),
    new component(190, 250, "/resources/images/piano.png", 200, 300, "image", "piano"),
    new component(224, 283, "/resources/images/bed.png", 725, 80, "image", "bed"),
    new component(46, 50, "/resources/images/random painting.png", 625, 20, "image"),
    new component(60, 50, "/resources/images/random painting 2.png", 375, 20, "image"),
    //key objects
    new component(131, 95, "resources/images/dresser.png", 550, 90, "image", "dresser")
  );
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = $(window).width();
      this.canvas.height = $(window).height();
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.frameNo = 0;
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

function loadImages(){
  girlBack = new Image(); girlBack.src = "/resources/images/girl back.png";
  girlBack2 = new Image(); girlBack2.src = "/resources/images/girl back 2.png";
  girlBack3 = new Image(); girlBack3.src = "/resources/images/girl back 3.png";
  girlFront = new Image(); girlFront.src = "/resources/images/girl front.png"
  girlFront2 = new Image(); girlFront2.src = "/resources/images/girl front 2.png"
  girlFront3 = new Image(); girlFront3.src = "/resources/images/girl front 3.png"
  girlLeft = new Image(); girlLeft.src = "/resources/images/girl left.png";
  girlLeft2 = new Image(); girlLeft2.src = "/resources/images/girl left 2.png";
  girlLeft3 = new Image(); girlLeft3.src = "/resources/images/girl left 3.png";
  girlRight = new Image(); girlRight.src = "/resources/images/girl right.png";
  girlRight2 = new Image(); girlRight2.src = "/resources/images/girl right 2.png";
  girlRight3 = new Image(); girlRight3.src = "/resources/images/girl right 3.png";
}

function component(width, height, color, x, y, type, name) {
  this.type = type;
  this.name = name;
  this.activable = false;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  if(type == "player"){
    this.image = color;
    this.direction = "up";
    this.moving = false;
  }else if(type == "image"){
    this.image = new Image();
    this.image.src = color;
  }
  this.update = function(){
    ctx = myGameArea.context;
    if(this.activated){
      if(this.name == "piano"){
        myText.text = "This is a piano, I don't know how to play it though.";
      }else if(this.name == "dresser"){
        myText.text = "This is a really ugly dresser, there's dust everywhere.";
      }else if(this.name == "clock"){
        myText.text = "This is a grandfather clock, the ticking is really annoy.";
      }else if(this.name == "closet"){
        myText.text = "There's nothing inside here, don't peek!";
      }else if(this.name == "bed"){
        myText.text = "This is the bed, do you want to sleep in it? (You can't since there's no sleep feature :P)";
      }
      this.activated = false;
    }
    if(this.type == "player"){
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.speedX != 0 || this.speedY != 0){
        if(myGameArea.frameNo % 40 <= 20){
          if(this.direction == "up"){
            this.image = girlBack2;
          }else if(this.direction == "down"){
            this.image = girlFront2;
          }else if(this.direction == "left"){
            this.image = girlLeft2;
          }else if(this.direction == "right"){
            this.image = girlRight2;
          }
        }else{
          if(this.direction == "up"){
            this.image = girlBack3;
          }else if(this.direction == "down"){
            this.image = girlFront3;
          }else if(this.direction == "left"){
            this.image = girlLeft3;
          }else if(this.direction == "right"){
            this.image = girlRight3;
          }
        }
      }else{
        if(this.direction == "up"){
          this.image = girlBack;
        }else if(this.direction == "down"){
          this.image = girlFront;
        }else if(this.direction == "left"){
          this.image = girlLeft;
        }else if(this.direction == "right"){
          this.image = girlRight;
        }
      }
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }else if(this.type == "image"){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }else{
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

function textMessage(font, color, x, y){
  this.text = text;
  ctx = myGameArea.context;
  var words = this.text.split(" ");
  var new_line = words[0];
  var lines = [];
  for(var i = 1; i < words.length; i+=1) {
    if (ctx.measureText(new_line + " " + words[i]).width < 250) {
      new_line += " " + words[i];
    } else {
      lines.push(new_line);
      new_line = words[i];
    }
  }
  lines.push(new_line);
  this.lines = lines;
  this.font = font;
  this.color = color;
  this.x = x;
  this.y = y;
  this.update = function(){
    this.y = 40;
    ctx = myGameArea.context;
    if(rewriteMessage()){
      var words = this.text.split(" ");
      var new_line = words[0];
      var lines = [];
      for(var i = 1; i < words.length; i+=1) {
        if (ctx.measureText(new_line + " " + words[i]).width < 250) {
          new_line += " " + words[i];
        } else {
          lines.push(new_line);
          new_line = words[i];
        }
      }
      lines.push(new_line);
      this.lines = lines;
    }
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    for(var i = 0; i < this.lines.length; i+=1){
      ctx.fillText(this.lines[i], this.x, this.y);
      this.y += 20;
    }
  }
}

function rewriteMessage(){
  return true;
}

function checkCollision(otherobj, speedX, speedY){
  var newleft = myPlayer.x + 10 + speedX;
  var newright = newleft + 50;
  var newtop = myPlayer.y + 110 + speedY;
  var newbottom = newtop + 50;
  if(otherobj.x == 200){
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y + 10;
    var otherbottom = otherobj.y + (otherobj.height);
  }else{
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
  }
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
    speedX = -5;
  }else if(myPlayer.direction == "right"){
    speedX = 5;
  }else if(myPlayer.direction == "up"){
    speedY = -5;
  }else if(myPlayer.direction == "down"){
    speedY = 5;
  }
  return checkCollision(otherobj, speedX, speedY);
}

function updateGameArea() {
  // var t0 = performance.now();
  myGameArea.clear();
  myGameArea.frameNo += 1;
  for(var i = 0; i < obstacles.length; i+=1){
    obstacles[i].update();
  }
  myPlayer.speedX = 0;
  myPlayer.speedY = 0;
  if(myGameArea.keys && myGameArea.keys[37]){
    myPlayer.speedX = -5;
    myPlayer.image = girlLeft;
    myPlayer.direction = "left";
  }
  if(myGameArea.keys && myGameArea.keys[39]){
    myPlayer.speedX = 5;
    myPlayer.image = girlRight;
    myPlayer.direction = "right";
  }
  if(myGameArea.keys && myGameArea.keys[38]){
    myPlayer.speedY = -5;
    myPlayer.image = girlBack;
    myPlayer.direction = "up";
  }
  if(myGameArea.keys && myGameArea.keys[40]){
    myPlayer.speedY = 5;
    myPlayer.image = girlFront;
    myPlayer.direction = "down";
  }
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
  myText.update();
  // var t1 = performance.now();
  // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}

$(document).ready(startGame)

//Credit to Sithjester for the images!

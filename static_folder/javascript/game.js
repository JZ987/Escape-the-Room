var myGamePiece;
var object = [];

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", myGameArea.canvas.width/2-15, myGameArea.canvas.height/2-15);
    object = [
      new component(1, myGameArea.canvas.height, "black", 0, 0),
      new component(myGameArea.canvas.width, 1, "black", 0, myGameArea.canvas.height-1),
      new component(1, myGameArea.canvas.height, "black", myGameArea.canvas.width-1, 0),
      new component(myGameArea.canvas.width, 1, "black", 0, 0),
      new component(50, 50, "green", 300, 120),
      new component(20, 20, "blue", 400, 120)
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

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
}

function checkCollision(otherobj){
  var newleft = myGamePiece.x + myGamePiece.speedX;
  var newright = newleft + (myGamePiece.width);
  var newtop = myGamePiece.y + myGamePiece.speedY;
  var newbottom = newtop + (myGamePiece.height);
  var otherleft = otherobj.x;
  var otherright = otherobj.x + (otherobj.width);
  var othertop = otherobj.y;
  var otherbottom = otherobj.y + (otherobj.height);
  if((newtop < otherbottom) &&
     (newbottom > othertop) &&
     (newleft < otherright) &&
     (newright > otherleft)){
       return true;
     }else{
       return false;
     }
}

function isActivableObject(){
  return false;
}

function updateGameArea() {
    myGameArea.clear();
    for(var i = 0; i < object.length; i+=1){
      object[i].update();
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -2;}
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2;}
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -2;}
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 2;}
    for(var i = 0; i < object.length; i+=1){
      if(checkCollision(object[i])){
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if(isActivableObject() && (myGameArea.keys && myGameArea.keys[32])){

        }
        break;
      }
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

$(document).ready(startGame)

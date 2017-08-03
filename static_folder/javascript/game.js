var myPlayer, myText;
var obstacles = [];
var text = "Grace has been kidnapped in her sleep and locked in an unknown room. Gather the clues to discover who the culprit is and escape the room.";
var quoteComplete = dresserComplete = pictureComplete = dreamCatcherComplete = false;
var ORIGINAL_WIDTH = 1440;
var ORIGINAL_HEIGHT = 826;
var ratio;

function startGame() {
  myGameArea.start();
  adjustPlayArea();
  loadImages();
  myPlayer = new component(73*ratio, 149*ratio, girlBack, 550*ratio, 400*ratio, "player");
  myText = new textMessage(15*ratio + "px Fantasy", "red", myGameArea.canvas.width-(160*ratio), 40*ratio);
  //wallpaper
  for(var i = 10*ratio; i <= 1120*ratio; i+=80*ratio){
    console.log(i);
    obstacles.push(new component(80*ratio, 150*ratio, "/resources/images/wallpaper.png", i, 10*ratio, "image"));
  }
  obstacles.push(
    //boundaries
    new component(300*ratio, myGameArea.canvas.height-(265*ratio), "white", myGameArea.canvas.width-(310*ratio), 265*ratio),
    new component(10*ratio, myGameArea.canvas.height, "black", 0, 0), //left
    new component(10*ratio, myGameArea.canvas.height, "black", myGameArea.canvas.width-(310*ratio), 0), //right
    new component(myGameArea.canvas.width-(300*ratio), 10, "black", 0, 0), //top
    new component(myGameArea.canvas.width, 10*ratio, "black", 0, myGameArea.canvas.height-(10*ratio)), //bottom
    new component(300*ratio, 10*ratio, "black", myGameArea.canvas.width-(300*ratio), 0),
    new component(10*ratio, myGameArea.canvas.height, "black", myGameArea.canvas.width-(10*ratio), 0),
    new component(300*ratio, 265*ratio, "black", myGameArea.canvas.width-(300*ratio), 0),
    new component(myGameArea.canvas.width-(300*ratio), 2*ratio, "black", 0, 160*ratio),
    //new component(10, 260, "black", myGameArea.canvas.width-315, 0),
    //new component(315, 150, "black", myGameArea.canvas.width-315, 260),
    //objects
    new component(300*ratio, 250*ratio, "/resources/images/speech-bubble-md.png", myGameArea.canvas.width-(305*ratio), 7*ratio, "image", "speech"),
    new component(53*ratio, 200*ratio, clock, 25*ratio, 10*ratio, "image", "clock"),
    new component(190*ratio, 200*ratio, "/resources/images/closet.png", 100*ratio, 10*ratio, "image", "closet"),
    new component(190*ratio, 250*ratio, "/resources/images/piano.png", 200*ratio, 300*ratio, "image", "piano"),
    new component(224*ratio, 284*ratio, "/resources/images/bed2.png", 725*ratio, 60*ratio, "image", "bed"),
    new component(72*ratio, 125*ratio, "/resources/images/nightstand.png", 940*ratio, 70*ratio, "image", "nightstand"),
    new component(46*ratio, 50*ratio, "/resources/images/random painting.png", 625*ratio, 20*ratio, "image"),
    new component(60*ratio, 50*ratio, "/resources/images/random painting 2.png", 375*ratio, 20*ratio, "image", "randompainting1"),
    new component(53*ratio, 100*ratio, "/resources/images/chair.png", 815*ratio, 440*ratio, "image", "chair"),
    new component(64*ratio, 100*ratio, "/resources/images/chair3.png", 710*ratio, 515*ratio, "image", "chair"),
    new component(64*ratio, 100*ratio, "/resources/images/chair4.png", 900*ratio, 515*ratio, "image", "chair"),
    new component(180*ratio, 150*ratio, "/resources/images/table.png", 750*ratio, 500*ratio, "image", "table"),
    new component(53*ratio, 91*ratio, "/resources/images/chair2.png", 815*ratio, 615*ratio, "image", "chair"),
    new component(38*ratio, 50*ratio, "/resources/images/candlestick.png", 820*ratio, 525*ratio, "image"),

    //key objects
    new component(131*ratio, 95*ratio, "/resources/images/dresser.png", 550*ratio, 90*ratio, "image", "dresser"),
    new component(15*ratio, 75*ratio, "#451411", 0, 300*ratio, "", "dreamcatcher"),
    new component(14*ratio, 17*ratio, "/resources/images/note.png", 600*ratio, 95*ratio, "image"),
    new component(40*ratio, 15*ratio, "gold", 450*ratio, myGameArea.canvas.height-(15*ratio), "", "quote"),
    new component(100*ratio, 15*ratio, "red", 550*ratio, myGameArea.canvas.height-(15*ratio), "", "door"),
    new component(55*ratio, 75*ratio, "/resources/images/chest side closed.png", myGameArea.canvas.width-(365*ratio), 350*ratio, "image", "chest"),
    new component(50*ratio, 15*ratio, "gold", 750*ratio, myGameArea.canvas.height-(15*ratio), "", "picture")
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
        if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 32){
          hideObjects();
          e.preventDefault();
        }
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = (e.type == "keydown");
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = (e.type == "keydown");
      })
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
      clearInterval(this.interval);
  }
}

function hideObjects(){
  $("#chestInput").hide();
  $("#doorInput").hide();
  $("#dreamcatcher").hide();
  $("#numberpad").hide();
  $("#codeNote").hide();
  $("#quote").hide();
  $("#portrait").hide();
  $("#note").hide();
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
  clock = new Image(); clock.src = "/resources/images/clock.png";
  clock2 = new Image(); clock2.src = "/resources/images/clock 2.png";
  clock3 = new Image(); clock3.src = "/resources/images/clock 3.png";
}

function adjustPlayArea(){
  if(myGameArea.canvas.width >= (myGameArea.canvas.height*(ORIGINAL_WIDTH/ORIGINAL_HEIGHT))){
    var dimension_ratio = myGameArea.canvas.height/ORIGINAL_HEIGHT;
    var new_width = ORIGINAL_WIDTH*dimension_ratio;
    myGameArea.canvas.width = new_width;
  }else{
    var dimension_ratio = myGameArea.canvas.width/ORIGINAL_WIDTH;
    var new_height = ORIGINAL_HEIGHT*dimension_ratio;
    myGameArea.canvas.height = new_height;
  }
  ratio = myGameArea.canvas.width/ORIGINAL_WIDTH;
  $("#chestInput").css({"font-size":30*ratio+"px","width":75*ratio+"px","height":34*ratio+"px",left:1245.6*ratio+"px",top:148.68*ratio+"px"});
  $("#doorInput").css({"font-size":30*ratio+"px","width":75*ratio+"px","height":34*ratio+"px",left:1245.6*ratio+"px",top:148.68*ratio+"px"});
  $("#quote").css({"width":323.2*ratio+"px","height":384*ratio+"px",left:398.4*ratio+"px",top:211*ratio+"px"});
  $("#quoteItem").css({"width":121.2*ratio+"px","height":144*ratio+"px",left:1153*ratio+"px",top:283*ratio+"px"});
  $("#note").css({"width":262*ratio+"px","height":365*ratio+"px",left:429*ratio+"px",top:220.5*ratio+"px"});
  $("#noteItem").css({"width":104.8*ratio+"px","height":146*ratio+"px",left:1305*ratio+"px",top:280*ratio+"px"});
  $("#portrait").css({"width":458*ratio+"px","height":546*ratio+"px",left:331*ratio+"px",top:130*ratio+"px"});
  $("#portraitItem").css({"width":137.4*ratio+"px","height":163.8*ratio+"px",left:1145*ratio+"px",top:450*ratio+"px"});
  $("#dreamcatcher").css({"width":316.4*ratio+"px","height":448*ratio+"px",left:396.8*ratio+"px",top:179*ratio+"px"});
  $("#dreamcatcherItem").css({"width":122.04*ratio+"px","height":172.8*ratio+"px",left:1296.36*ratio+"px",top:446.7*ratio+"px"});
  $("#numberpad").css({"width":256*ratio+"px","height":350.4*ratio+"px",left:700*ratio+"px",top:227.8*ratio+"px"});
  $("#numberpadItem").css({"width":128*ratio+"px","height":175.2*ratio+"px",left:1292.36*ratio+"px",top:626.02*ratio+"px"});
  $("#codeNote").css({"width":158*ratio+"px","height":198*ratio+"px",left:442*ratio+"px",top:304*ratio+"px"});
  $("#codeNoteItem").css({"width":138.25*ratio+"px","height":173.25*ratio+"px",left:1145*ratio+"px",top:627.97*ratio+"px"});
}

function component(width, height, color, x, y, type, name) {
  this.type = type;
  this.name = name;
  this.activated = false;
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
    if(this.name == "clock"){
      this.image = color;
    }else{
      this.image = new Image();
      this.image.src = color;
    }
  }
  this.update = function(){
    ctx = myGameArea.context;
    if(this.activated){
      if(this.name == "piano"){
        myText.text = "This is a piano. I don't know how to play it though.";
      }else if(this.name == "dresser"){
        dresserAction();
      }else if(this.name == "clock"){
        myText.text = "This is a grandfather clock. The ticking is really annoying.";
      }else if(this.name == "closet"){
        myText.text = "There's nothing inside here so don't peek!";
      }else if(this.name == "bed"){
        myText.text = "This is the bed. Do you want to sleep in it? (You can't since there's no sleep feature :P)";
      }else if(this.name == "dreamcatcher"){
        dreamCatcherAction();
      }else if(this.name == "chest"){
        chestAction();
      }else if(this.name == "door"){
        doorAction();
      }else if(this.name == "picture"){
        pictureAction();
      }else if(this.name == "quote"){
        quoteAction();
      }else if(this.name == "nightstand"){
        myText.text = "Looks like a boring nightstand. It have a lamp and several books on it.";
      }else if(this.name == "randompainting1"){
        myText.text = "A painting of a street view of Venice";
      }else if(this.name == "chair"){
        myText.text = "Several chairs surrounding a huge table. What is this for?";
      }
      this.activated = false;
    }
    if(this.type == "player"){
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.speedX != 0 || this.speedY != 0){
        if(myGameArea.frameNo % 30 <= 15){
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
      if(this.name == "clock"){
        if(myGameArea.frameNo % 40 <= 20){
          this.image = clock;
        }else{
          this.image = clock3;
        }
      }
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }else{
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

function quoteAction(){
  quoteComplete = true;
  $("#quote").show();
  $("#quoteItem").show();
  myText.text = "Hmmm there's a quote on this frame...";
}

function dresserAction(){
  if(quoteComplete){
    dresserComplete = true;
    $("#note").show();
    $("#noteItem").show();
    myText.text = "How did I not notice this before? There's a note on the dresser!";
  }else{
    myText.text = "A plain dresser. Nothing interesting.";
  }
}
function pictureAction(){
  if(dresserComplete){
    pictureComplete = true;
    $("#portrait").show();
    $("#portraitItem").show();
    myText.text = "There's message on the back of the portrait!!";
  }else{
    myText.text = "A portrait of the sun. It's blindingly bright somehow...";
  }
}

function dreamCatcherAction(){
  if(pictureComplete){
    $("#dreamcatcher").show();
    $("#dreamcatcherItem").show();
    myText.text = "....";
  }else{
    myText.text = "This is a dream catcher. It looks really creepy...";
  }
}

function chestAction(){
  myText.text = "Please input the 4 digit number: ";
  $("#chestInput").show();
  $('#chestInput').keypress(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        var code = $("#chestInput").val();
        if(code == "6275"){
          $("#numberpad").show();
          $("#numberpadItem").show();
          $("#codeNote").show();
          $("#codeNoteItem").show();
        }else{
          myText.text = "Sorry. Wrong code. Please try again";
          $("#chestInput").val("");
        }
      }
  });
}

function doorAction(){
  myText.text = "Who am I?";
  $("#doorInput").show();
  $('#doorInput').keypress(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        var code2 = $("#doorInput").val();
        if(code2.toLowerCase() == "mark"){
          myText.text = "Congradulation! You completed the game! Your time is: " + myGameArea.frameNo;
          // myGameArea.stop();
        }else{
          myText.text = "Sorry. Wrong person. Please try again";
          $("#doorInput").val("");
        }
      }
  });
}

function textMessage(font, color, x, y){
  this.text = text;
  ctx = myGameArea.context;
  var words = this.text.split(" ");
  var new_line = words[0];
  var lines = [];
  for(var i = 1; i < words.length; i+=1) {
    if (ctx.measureText(new_line + " " + words[i]).width < (225*ratio)) {
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
    this.y = 50*ratio;
    ctx = myGameArea.context;
    if(rewriteMessage()){
      var words = this.text.split(" ");
      var new_line = words[0];
      var lines = [];
      for(var i = 1; i < words.length; i+=1) {
        if (ctx.measureText(new_line + " " + words[i]).width < (225*ratio)) {
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
      this.y += 20*ratio;
    }
  }
}

function rewriteMessage(){
  return true;
}

function checkCollision(otherobj, speedX, speedY){
  var newleft = myPlayer.x + 10*ratio + speedX;
  var newright = newleft + 50*ratio;
  var newtop = myPlayer.y + 110*ratio + speedY;
  var newbottom = newtop + 50*ratio;
  if(otherobj.name == "piano"){
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y + 10*ratio;
    var otherbottom = otherobj.y + (otherobj.height);
  }else if(otherobj.name == "randompainting1"){
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y + 95*ratio;
    var otherbottom = otherobj.y + 95*ratio + (otherobj.height);
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
    speedX = -5*ratio;
  }else if(myPlayer.direction == "right"){
    speedX = 5*ratio;
  }else if(myPlayer.direction == "up"){
    speedY = -5*ratio;
  }else if(myPlayer.direction == "down"){
    speedY = 5*ratio;
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
    myPlayer.speedX = -5*ratio;
    myPlayer.image = girlLeft;
    myPlayer.direction = "left";
  }
  if(myGameArea.keys && myGameArea.keys[39]){
    myPlayer.speedX = 5*ratio;
    myPlayer.image = girlRight;
    myPlayer.direction = "right";
  }
  if(myGameArea.keys && myGameArea.keys[38]){
    myPlayer.speedY = -5*ratio;
    myPlayer.image = girlBack;
    myPlayer.direction = "up";
  }
  if(myGameArea.keys && myGameArea.keys[40]){
    myPlayer.speedY = 5*ratio;
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
  $("#dreamcatcherItem").click(function(){$("#dreamcatcher").show();});
  $("#numberpadItem").click(function(){$("#numberpad").show();});
  $("#codeNoteItem").click(function(){$("#codeNote").show();});
  $("#portraitItem").click(function(){$("#portrait").show();});
  $("#noteItem").click(function(){$("#note").show();});
  $("#quoteItem").click(function(){$("#quote").show();});
  // var t1 = performance.now();
  // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}

$(document).ready(startGame)

//Credit to Sithjester for the images!

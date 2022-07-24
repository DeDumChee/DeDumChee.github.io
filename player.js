var MC = new player("./Resources/Robin.png",robinSprites,200,200);

function player(imgSRC, spriteSheet, x, y) {
    //Set shorthand
    var attributes = spriteSheet.getElementsByTagName("downIdle")[0].attributes;
    this.spriteSheet = spriteSheet;
    //Basic info
    this.width = parseInt(attributes.w.value);
    this.height = parseInt(attributes.h.value);
    this.x = x;
    this.y = y;
    this.run = 2;
    this.walk = Math.ceil(this.run/2);
    this.speed = this.run;
    this.cropX = parseInt(attributes.x.value);
    this.cropY = parseInt(attributes.y.value);
    //Dimensions
    this.left = x;
    this.right = this.left + this.width;
    this.top = y;
    this.bottom = this.top + this.height;
    //Sprite Cooldowns
    this.CD = {
        "left":true,
        "right":true,
        "down":true,
        "up":true,
    }
    //Load Sprites
    this.image = new Image();
    this.image.src = imgSRC;

    this.update = function() {
        w.drawImage(this.image,this.cropX,this.cropY,this.width,this.height,this.x,this.y,this.width,this.height);
        this.left = this.x;
        this.right = this.left + this.width;
        this.top = this.y;
        this.bottom = this.top + this.height;
    }

    this.validMove = function(direction,otherOBJ,subDirection) {
        if (subDirection != null) {
            subDirection = subDirection.toUpperCase();
        }
        //Player current location
        var curLeft = this.left;
        var curRight = this.right;
        var curTop = this.top;
        var curBottom = this.bottom;
        //Placeholders for player new location
        let newLeft = this.left;
        let newRight = this.right;
        let newTop = this.top;
        let newBottom = this.bottom;
        //Boundries
        var topBound = 0;
        var bottomBound = win.height;
        var leftBound = 0;
        var rightBound = win.width;
        //Other Location
        var otherLeft = otherOBJ.x;
        var otherRight = otherOBJ.x + (otherOBJ.width);
        var otherTop = otherOBJ.y;
        var otherBottom = otherOBJ.y + (otherOBJ.height);

        var dArray = [direction, subDirection]
        var validMove = false;
        var valid = {
            "LEFT": false,
            "RIGHT": false,
            "UP": false,
            "DOWN": false,
        }

        for (var i = 0; i<dArray.length;i++) {

            switch (dArray[i]) {
                case "LEFT":
                    newLeft = this.left - this.speed;
                    newRight = this.right - this.speed;
                    if (newLeft > leftBound && (newLeft > otherRight || curRight < otherLeft || curBottom < otherTop || curBottom > otherBottom)) {
                        valid["LEFT"] = true;
                    }
                    break;
                case "RIGHT":
                    newLeft = this.left + this.speed;
                    newRight = this.right + this.speed;
                    if (newRight < rightBound && (newRight < otherLeft || curLeft > otherRight || curBottom < otherTop || curBottom > otherBottom)) {
                        valid["RIGHT"] = true;
                    }
                    break;
                case "UP":
                    newBottom = this.bottom - this.speed;
                    if (newTop > topBound && (newBottom > otherBottom || curBottom < otherTop || curLeft > otherRight || curRight < otherLeft)) {
                        valid["UP"] = true;
                    }
                    break;
                case "DOWN":
                    newBottom = this.bottom + this.speed;
                    if (newBottom < bottomBound && (newBottom < otherTop || curBottom > otherBottom || curLeft > otherRight || curRight < otherLeft)) {
                        valid["DOWN"] = true;
                    }
                    break;
                default:
                    break;
            }

            // switch (dArray[i]) {
            //     case "LEFT":
            //         newLeft = this.left - this.speed;
            //         newRight = this.right - this.speed;
            //         if (newLeft > leftBound && (newLeft > otherRight || curRight < otherLeft || curBottom < otherTop || curTop > otherBottom)) {
            //             valid["LEFT"] = true;
            //         }
            //         break;
            //     case "RIGHT":
            //         newLeft = this.left + this.speed;
            //         newRight = this.right + this.speed;
            //         if (newRight < rightBound && (newRight < otherLeft || curLeft > otherRight || curBottom < otherTop || curTop > otherBottom)) {
            //             valid["RIGHT"] = true;
            //         }
            //         break;
            //     case "UP":
            //         newTop = this.top - this.speed;
            //         newBottom = this.bottom - this.speed;
            //         if (newTop > topBound && (newTop > otherBottom || curBottom < otherTop || curLeft > otherRight || curRight < otherLeft)) {
            //             valid["UP"] = true;
            //         }
            //         break;
            //     case "DOWN":
            //         newTop = this.top + this.speed;
            //         newBottom = this.bottom + this.speed;
            //         if (newBottom < bottomBound && (newBottom < otherTop || curTop > otherBottom || curLeft > otherRight || curRight < otherLeft)) {
            //             valid["DOWN"] = true;
            //         }
            //         break;
            //     default:
            //         break;
            // }
        }

        let validCount = 0;
        for (var i = 0;i<dArray.length;i++) {
            if (valid[dArray[i]] || valid[dArray[i]] == undefined) {
                validCount++;
            }
        }
        if (validCount == 2) {
            validMove = true;
            return (validMove);
        }
    }

    this.move = function(rawDirection,subDirection) {
        var walkRight, walkLeft, idle;
        let direction = rawDirection.toLowerCase();
        
        if (subDirection != undefined) {
            subDirection = subDirection.toLowerCase();
        } else {
            subDirection = null;
        }
        walkRight = direction + "WalkRight";
        walkLeft = direction + "WalkLeft";
        idle = direction + "Idle";

        if (this.validMove(rawDirection,obs, subDirection)) {
            if (this.CD[direction]) {
                switch (this.cropX) {
                    case attributeToInt(this.spriteSheet,walkLeft,"x"):
                        this.cropX = attributeToInt(this.spriteSheet,walkRight,"x");
                        this.cropY = attributeToInt(this.spriteSheet,walkRight,"y");
                        break;
                    case attributeToInt(this.spriteSheet,walkRight,"x"):
                        this.cropX = attributeToInt(this.spriteSheet,idle,"x");
                        this.cropY = attributeToInt(this.spriteSheet,idle,"y");
                        break;
                    default:
                        this.cropX = attributeToInt(this.spriteSheet,walkLeft,"x");
                        this.cropY = attributeToInt(this.spriteSheet,walkLeft,"y");
                        break;
                }
                var playerObject = this;
                this.CD[direction] = false;
                setTimeout(function(){
                    playerObject.CD[direction] = true;
                },100);
            }
            switch (subDirection) {
                case "up":
                    this.y -= this.speed;
                    break;
                case "down":
                    this.y += this.speed;
                    break;
                default:
                    //No subDirection
                    break;
            }
            switch (direction) {
                case "up":
                    this.y -= this.speed;
                    break;
                case "down":
                    this.y += this.speed;
                    break;
                case "left":
                    this.x -= this.speed;
                    break;
                case "right":
                    this.x += this.speed;
                    break;
            }
        } else {
            this.cropX = attributeToInt(this.spriteSheet,idle,"x");
            this.cropY = attributeToInt(this.spriteSheet,idle,"y");
        }
    }
    playerList.push(this);
    //refreshBoard();
}

var pressedKeys = {};
function handleInput(keys,event) {

    if (event == "SHIFT") {
        if (keys["SHIFT"]) {
            MC.speed = MC.walk;
        } else {
            MC.speed = MC.run;
        }
    }

    if (event == "LEFT" || event == "RIGHT" || event == "UP" || event == "DOWN") {
        //If conflicting directions
        if ((keys["LEFT"] && keys["RIGHT"]) || (keys["UP"] && keys["DOWN"])) {
            clearInterval(moveInterval);
            MC.cropX = MC.spriteSheet.getElementsByTagName("downIdle")[0].getAttribute("x");
            MC.cropY = MC.spriteSheet.getElementsByTagName("downIdle")[0].getAttribute("y");
        } else {
            //If diagonal
            if ((keys["LEFT"] && keys["UP"])) {
                clearInterval(moveInterval);
                moveInterval = setInterval(function() {MC.move("LEFT","UP");},10);
            } else if ((keys["LEFT"] && keys["DOWN"])) {
                clearInterval(moveInterval);
                moveInterval = setInterval(function() {MC.move("LEFT","DOWN");},10);
            } else if ((keys["RIGHT"] && keys["UP"])) {
                clearInterval(moveInterval);
                moveInterval = setInterval(function() {MC.move("RIGHT","UP");},10);
            } else if ((keys["RIGHT"] && keys["DOWN"])) {
                clearInterval(moveInterval);
                moveInterval = setInterval(function() {MC.move("RIGHT","DOWN");},10);
            } else {
                //Array to determine # of keys pressed
                let exclusiveArray = ["LEFT","RIGHT","UP","DOWN"];
                exclusiveArray.splice(exclusiveArray.indexOf(event),1);
                //If single direction key pressed
                if (keys[event] && !keys[exclusiveArray[0]] && !keys[exclusiveArray[1]] && !keys[exclusiveArray[2]]) {
                    clearInterval(moveInterval);
                    moveInterval = setInterval(function() {MC.move(event,undefined);},10);
                //If single key pressed, but not event
                } else if (!keys[event] && (keys[exclusiveArray[0]] || keys[exclusiveArray[1]] || keys[exclusiveArray[2]])) {
                    let direction;
                    for (var i = 0;i<exclusiveArray.length;i++) {
                        if (keys[exclusiveArray[i]]) {
                            direction = exclusiveArray[i];
                            break;
                        }
                    }
                    clearInterval(moveInterval);
                    moveInterval = setInterval(function() {MC.move(direction,undefined);},10);
                //If no direction keys pressed
                } else if (!keys["LEFT"] && !keys["RIGHT"] && !keys["UP"] && !keys["DOWN"]) {
                    clearInterval(moveInterval);
                    MC.cropX = MC.spriteSheet.getElementsByTagName(event.toLowerCase() + "Idle")[0].getAttribute("x");
                    MC.cropY = MC.spriteSheet.getElementsByTagName(event.toLowerCase() + "Idle")[0].getAttribute("y");
                }
            }
        }
    }
    //refreshBoard();
}

function setKey(event, status) {
    var code = event.keyCode;
    var key;

    switch(code) {
    case 16:
        key = 'SHIFT'; break;
    //case 32:
    //    key = 'SPACE'; break;
    case 37:
        key = 'LEFT'; break;
    case 38:
        key = 'UP'; break;
    case 39:
        key = 'RIGHT'; break;
    case 40:
        key = 'DOWN'; break;
    case 65:
        key = 'LEFT'; break;
    case 68:
        key = 'RIGHT'; break;
    case 83:
        key = 'DOWN'; break;
    case 87:
        key = 'UP'; break;
    default:
        key = null;
        // console.log(code);
        // Convert ASCII codes to letters
        // console.log(String.fromCharCode(code));
    }
        if (pressedKeys[key] != status && key != null) {
            pressedKeys[key] = status;
            handleInput(pressedKeys,key);
        }       
}

document.addEventListener("keydown",function(e) {
    setKey(e,true);
});

document.addEventListener('keyup',function(e) {
    setKey(e, false);
});
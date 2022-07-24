var win = document.getElementById("gameWindow");
var w = win.getContext("2d");
var WW = win.width;
var WH = win.height;
let bodyElement = document.body;
var robinSprites = parser.parseFromString(robinXML, "text/xml");
var objectList = [];
var playerList = [];
var uiList = [];
let fullscreenToggle = false;
let moveInterval;

bodyElement.oncontextmenu = function() {return (false);};

function refreshBoard() {
    w.clearRect(0,0,win.width,win.height);
    defaultLevel();
    for (var i = 0;i<objectList.length;i++) {
        objectList[i].update();
    }
    for (var i = 0;i<uiList.length;i++) {
        uiList[i].update();
    }
    for (var i = 0;i<playerList.length;i++) {
        playerList[i].update();
    }
}

function userClicked(clickX,clickY) {
    let cObj;
    let clickedObject;
    for (var i = 0;i<objectList.length;i++) {
        cObj = objectList[i];
        if (clickX > cObj.left && clickX < cObj.right && clickY > cObj.top && clickY < cObj.bottom) {
            clickedObject = cObj;
            break;
        }
    }
    if (clickedObject == undefined) {
        for (var i = 0;i<uiList.length;i++) {
            cObj = uiList[i];
            if (clickX > cObj.left && clickX < cObj.right && clickY > cObj.top && clickY < cObj.bottom) {
                clickedObject = cObj;
                break;
            } 
        }
    }
    if (clickedObject != undefined) {
        clickedObject.onClick();
    }
    //refreshBoard();
}

function attributeToInt(spritesheet, position, att) {
    return(parseInt(spritesheet.getElementsByTagName(position)[0].getAttribute(att)));
}

function getMousePosition(e) {
    let rect = win.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;
    userClicked(clickX,clickY);
}

win.addEventListener('mousedown',function(e) {
    getMousePosition(e);
});

window.addEventListener('load',function(e) {
    defaultLevel();
}) 

setInterval(refreshBoard,10);
var obs = new object(32,32,"black",WW/2,WH/2);

function defaultLevel() {
    var levelImage = new Image();
    levelImage.src = "./Resources/levels/test2.png";
    w.drawImage(levelImage,0,WH-levelImage.height);
    w.fillStyle = "rgba(33,37,41,1)";
    w.strokeStyle = "rgba(33,37,41,1)";
    w.fillRect(0,0,WW,WH-levelImage.height,);
}

function object(width, height, fill, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.style = fill;
    this.left = x;
    this.right = this.left + this.width;
    this.top = y;
    this.bottom = this.top + this.height;
    this.clickState = false;

    this.update = function() {
            w.fillStyle = this.style;
            w.fillRect(this.x, this.y, this.width, this.height);
            this.left = this.x;
            this.right = this.left + this.width;
            this.top = this.y;
            this.bottom = this.top + this.height;
   }

   this.onClick = function() {
    if (!this.clickState) {
        this.x += 10;
    } else {

    }
    this.clickState = !this.clickState;
   }
    objectList.push(this);
}
var fullscreenButton = new component(16,16,"./Resources/FS.svg",WW-16,WH-16);

function component(width, height, imgSrc, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    // this.style = fill;
    this.left = x;
    this.right = this.left + this.width;
    this.top = y;
    this.bottom = this.top + this.height;
    this.visible = true;

    this.image = new Image();
    this.image.src = imgSrc;

    this.update = function() {
        // w.fillStyle = this.style;
        // w.fillRect(this.x, this.y, this.width, this.height);

        // w.drawImage(this.image,0,0,this.width,this.height,this.x,this.y,this.width,this.height);

      if (this.visible) {
        w.drawImage(this.image,this.x,this.y);
      }

        this.left = this.x;
        this.right = this.left + this.width;
        this.top = this.y;
        this.bottom = this.top + this.height;
   }

   this.onClick = function() {
    let requestMethod = bodyElement.requestFullScreen || bodyElement.webkitRequestFullScreen || bodyElement.mozRequestFullScreen || bodyElement.msRequestFullScreen;
    requestMethod.call(bodyElement);
   }

   uiList.push(this);
}

function toggleFullscreenButton() {
    if (fullscreenToggle) {
        fullscreenButton.visible = true;
        win.width = WW;
        win.height = WH;
    } else {
        win.width = window.innerWidth;
        win.height = window.innerHeight;
        fullscreenButton.visible = false;
    }
    fullscreenToggle = !fullscreenToggle;
    //refreshBoard();
}

/* Standard syntax */
document.addEventListener("fullscreenchange", function(e) {
    toggleFullscreenButton();
  });
  
  /* Firefox */
  document.addEventListener("mozfullscreenchange", function(e) {
    toggleFullscreenButton();
  });
  
  /* Chrome, Safari and Opera */
  document.addEventListener("webkitfullscreenchange", function(e) {
    toggleFullscreenButton();
  });
  
  /* IE / Edge */
  document.addEventListener("msfullscreenchange", function(e) {
    toggleFullscreenButton();
  });
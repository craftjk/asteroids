(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.frames = 0;
  }

  Ship.inherits(Asteroids.MovingObject);  
  Ship.COLOR = "#000";
  Ship.RADIUS = 20;
  
  Ship.prototype.power = function(impulse) {
    this.velX += impulse[0];
    this.velY += impulse[1];
  }
  
  Ship.prototype.draw = function(canvas) {
    var frame = Math.floor(this.frames / 8)+1;
    var image  = document.getElementById("nyan-" + frame);
    canvas.drawImage(image,this.posX,this.posY,70,40);
    if (this.frames > 40) this.frames = 0;
    else ++this.frames;
  }
  
  Ship.prototype.fireBullet = function(){
    if (this.velX != 0 || this.velY != 0){
      var vel = [];
      var speed = Math.sqrt(Math.pow(this.velX,2) + Math.pow(this.velY,2))
      vel[0] = 15*(this.velX / speed);
      vel[1] = 15*(this.velY / speed);
      return new Asteroids.Bullet([this.posX,this.posY],vel);
    }
    return false
  }
  
})(this);


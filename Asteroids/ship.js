(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }

  Ship.inherits(Asteroids.MovingObject);  
  Ship.COLOR = "#000";
  Ship.RADIUS = 20;
  
  Ship.prototype.power = function(impulse) {
    this.velX += impulse[0];
    this.velY += impulse[1];
  }
  
  Ship.prototype.draw = function(canvas) {
    var image  = document.getElementById("ship");
    canvas.drawImage(image,this.posX,this.posY,70,40);
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


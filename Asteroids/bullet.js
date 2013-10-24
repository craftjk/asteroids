(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  }

  Bullet.inherits(Asteroids.MovingObject);  
  Bullet.COLOR = "#000";
  Bullet.RADIUS = 4;
  
  Bullet.prototype.draw = function(canvas) {
    var image  = document.getElementById("bullet");
    canvas.drawImage(image,this.posX,this.posY,30,10);
  }
  
})(this);
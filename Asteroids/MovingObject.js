(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.posX = pos[0];
    this.posY = pos[1];
    this.velX = vel[0];
    this.velY = vel[1];
    this.radius = radius;
    this.color = color;
  }
  
  MovingObject.prototype.move = function() {
    this.posX += this.velX;
    this.posY += this.velY;
  }
  
  MovingObject.prototype.draw = function(canvas) {
    canvas.fillStyle = this.color;
    canvas.beginPath();
    canvas.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    
    canvas.fill();
  }
  
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    distance = lineDistance( [this.posX, this.posY], 
      [otherObject.posX, otherObject.posY]);
    return (distance < this.radius + otherObject.radius) 
  }
  
  function lineDistance( point1, point2 ) {
    var xs = 0;
    var ys = 0;
 
    xs = point2[0] - point1[0];
    xs = xs * xs;
 
    ys = point2[1] - point1[1];
    ys = ys * ys;
 
    return Math.sqrt( xs + ys );
  }
  
})(this);


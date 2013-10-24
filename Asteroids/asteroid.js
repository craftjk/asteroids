(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
    Asteroids.MovingObject.call(this, pos, vel, radius, Asteroid.COLOR);
  }

  Asteroid.inherits(Asteroids.MovingObject);  
  Asteroid.COLOR = "#700707";
  Asteroid.RADIUS = 60;
    
  Asteroid.randomAsteroid = function (dimX, dimY) {
    aposx = Math.random() * dimX;
    aposy = Math.random() * dimY; 
    return new Asteroid([aposx, aposy], randomVec(5), Asteroid.RADIUS); 
  }
  
  Asteroid.createBabyAsteroid = function (parent) {
    aposx = parent.posX;
    aposy = parent.posY;
    var radius = (parent.radius == 30 ? 20 : 30);
    var vel = (parent.radius == 30 ? 16 : 10);
    return new Asteroid([aposx, aposy], randomVec(vel), radius); 
  }
  
  Asteroid.prototype.draw = function(canvas) {
    var image  = document.getElementById("ned");
    canvas.drawImage(image,this.posX,this.posY,this.radius,this.radius);
  }
  
  var randomVec = function (num) {
    return [(Math.random() - .5) * num, (Math.random() - .5) * num];
    
    // use Asteroid.RADIUS to help define vel so that smaller asteroids are faster
  }
  
})(this);


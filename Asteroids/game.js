(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function(ctx,canvas) {
    this.canvas = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.dimx = canvas.width;
    this.dimy = canvas.height;
    this.FPS = 30;
    this.addAsteroids(10);
    this.ship = new Asteroids.Ship([this.dimx/2, this.dimy/2], [0,0]);
  };
  
  Game.prototype.addAsteroids = function (numAsteroids) {
    for (i = 0 ; i < numAsteroids ; i++ ) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this.dimx, this.dimy));
    }
  };
  
  Game.prototype.draw = function () { 
    this.canvas.clearRect(0,0,this.dimx,this.dimy);
    
    var image  = document.getElementById("background");
    this.canvas.drawImage(image, 0,0,this.dimx, this.dimy);
    
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(this.canvas);
    });
    this.bullets.forEach(function (bullet) {
      bullet.draw(this.canvas);
    });
    this.ship.draw(this.canvas);
  };
  
  Game.prototype.move = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
      this.wrap(asteroid);
    }.bind(this));
    this.bullets.forEach(function (bullet) {
      bullet.move();
      if (bullet.posX < 0 || bullet.posX > this.dimx 
            || bullet.posY < 0 || bullet.posY > this.dimy) {
        var index = this.bullets.indexOf(bullet);
        this.bullets.splice(index,1);
      }
    }.bind(this));
    this.wrap(this.ship);
    this.ship.move();
  }
  
  Game.prototype.wrap = function(obj){
    if(obj.posX > this.dimx) obj.posX = 0;
    if(obj.posX < 0) obj.posX = this.dimx;
    if(obj.posY > this.dimy) obj.posY = 0;
    if(obj.posY < 0) obj.posY = this.dimy;
  }
  
  Game.prototype.hitAsteroid = function() {
    this.bullets.forEach(function (bullet) {
      this.asteroids.forEach(function (asteroid) {
         if (asteroid.isCollidedWith(bullet)) {
           var bIndex = this.bullets.indexOf(bullet);
           var aIndex = this.asteroids.indexOf(asteroid);
           this.bullets.splice(bIndex,1);
           this.asteroids.splice(aIndex,1);
           if (asteroid.radius != 20)
           {
             this.asteroids.push(Asteroids.Asteroid.createBabyAsteroid(asteroid));
             this.asteroids.push(Asteroids.Asteroid.createBabyAsteroid(asteroid));
           }
           
         }
      }.bind(this));
    }.bind(this));
  }
  
  Game.prototype.step = function () {
    if(this.asteroids.length === 0){
      this.stop();
      alert('You win.')
    }
    
    this.move();
    this.hitAsteroid();
    this.draw();
    this.checkCollisions();
    
  }
  
  Game.prototype.start = function () {
    key('w, up', function(){this.ship.power([0,-1])}.bind(this));
    key('s, down', function(){this.ship.power([0,1])}.bind(this));
    key('a, left', function(){this.ship.power([-1,0])}.bind(this));
    key('d, right', function(){this.ship.power([1,0])}.bind(this));
    key('space', function(){ 
      var bullet = this.ship.fireBullet();
      console.log(bullet);
      if (bullet) this.bullets.push(bullet);
    }.bind(this));
    this.timer = setInterval(this.step.bind(this), 1000/this.FPS);
  }
  
  Game.prototype.checkCollisions = function () {
    var youLost = false;
    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(this.ship)) youLost = true;
    }.bind(this));
    if(youLost) {
      this.stop();
      alert("You lose :(");
    }
  }
  
  Game.prototype.stop = function () {
    window.clearInterval(this.timer);
  }
  
})(this);


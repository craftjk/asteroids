Function.prototype.inherits = function (parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
}

function Animal(name) {
  this.name = name;
};

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog() {};

// The surrogate will be used to construct `Dog.prototype`.

Dog.inherits(Animal);

Dog.prototype.bark = function () {
  console.log("Bark!");
};

spot = new Dog();
spot.bark();
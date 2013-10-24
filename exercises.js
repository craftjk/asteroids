function sum () {
  total = 0;
  for (i = 0 ; i < arguments.length ; i++ ) {
    total += arguments[i];
  }
  
  return total;
}

Function.prototype.myBind = function (obj) {
  f = this;
  var args = Array.prototype.slice.call(arguments, 1);
  
  return function () {
    return f.apply(obj, args);
  }
}

function simpleSum(x) {
  return x;
}

function curriedSum(numArgs) {
  numbers = [];
  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      total = 0;
      for (i = 0 ; i < numbers.length ; i++ ) {
        total += numbers[i];
      }
      return total;
    } else {
      return _curriedSum;
    }
  }
}

Function.prototype.curry = function(numArgs) {
  f = this;
  
  args = [];
  
  return function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return f.apply(null, args);
    } else {
      return _curry;
    }
  }
}

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 3); // == 27

// you'll write `Function#curry`!
var f1 = sumThree.curry(3);
var f2 = f1(4);
var f3 = f2(20);
var result = f3(3); // = 27

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(3)); // == 27

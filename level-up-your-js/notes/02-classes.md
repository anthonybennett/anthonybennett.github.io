# Classes

```javascript
// Define the Animal constructor.
var Animal = function (name, sound) {
	this.name = name;
	this.sound = (sound || "...");
};

// Add the makeNoise function to its prototype.
// The function is shared across all instances.
Animal.prototype.makeNoise = function () {
	alert(this.sound);
};

// Instantiate a new animal and make some noise.
var animal = new Animal("Generic");
animal.makeNoise();

// Define the Cat constructor.
// Note that it calls the Animal constructor.
var Cat = function (name) {
	Animal.call(this, name, "Meow!");
};

// Copy the Animal prototype.
// Fix the constructor reference.
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

// Instantiate a new cat and make some noise.
var cat = new Cat("Mister Whiskers");
animal.makeNoise();
```

## References and Additional Reading

- [Intro to OO JS](http://goo.gl/x0dyct)
- [Object.create](http://goo.gl/GBujf)
- [Backbone extend](http://goo.gl/X7t9I3)
- [The Two Pillars of JS](http://goo.gl/AAXkV6)
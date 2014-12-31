# Modules

Before we jump into modules, we first need to understand two related
concepts: closures and immediately-invoked function expressions.

## Closures

These are functions that refer to independent (free) variables.
They "remember" the environment in which they were created. E.g.:

```javascript
var init = function () {
	var name = "Bob",
		displayName = function () {
			alert(name);
		};

	displayName();
};

init();
```

displayName is said to be a closure because it references the `name`
variable, with which it shares the same environment or lexical scope.

"So what's the point of a closure?", I might ask for you. Well,
in a nutshell, it gives us a pattern for providing JavaScript with
private variables and methods. We can use this pattern in both
classes as well as in "pure" modules.

## Immediately-Invoked Function Expressions

They are written thusly:

```javascript
(function () {
	// Statements...
}());
```

Using this pattern, we can define modules with private variables and
methods, with full control of which parts we expose. E.g.:

```javascript
(function (root) {
	var c = 0;

	root.counter = {
		value: function (value) {
			// Getting the value.
			if (void 0 === value) {
				return c;
			}

			// Setting the value.
			c = (parseInt(value, 10) || 0);
		}
	};
}(this));
```

Assuming that it's being defined globally, it takes the global context
(window in a browser) and attaches an object called `counter` to it,
which consists of a single function, `value`, which can be used to
get and set the value of the private variable, `c`.

Using this pattern, we could easily have other private variables,
functions, etc. happening inside of the IIFE, while only exposing
those parts that we choose to "export" to the global namespace.

This keeps the global namespace from becoming polluted with excess
variables and increases the security around our code by essentially
presenting users with an "API".

## References and Additional Reading

[Closures](http://goo.gl/Ya0be)
[IIFEs](http://goo.gl/qC3LYh)
[Revealing Module Pattern](http://goo.gl/rUDVL)
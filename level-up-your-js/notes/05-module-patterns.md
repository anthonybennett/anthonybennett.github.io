# Module Patterns

We've already discussed simple or "pure" modules (my term for them).
However, there are other patterns that build on top of the idea of
pure modules: two competing approaches (CommonJS and AMD), and the
one to rule them all (UMD).

## CommonJS Modules

These are used in server-side JavaScript (e.g. NodeJS). They are built
around two components:

1. the `require` function, which is used to import modules; and
2. the free variable `exports`, which is an object to which a
   module may add its API. E.g.:

```javascript
(function (root) {
	var helper = require("helper");

	exports.value = function (value) {
		if (void 0 === value) {
			return c;
		}

		c = (helper.fn(value) || 0);
	};
}(this));
```

The code above defines a module with a `value` function, which depends
on the `helper` module. Assuming it's defined in a file called counter.js,
other modules can import it with require(`counter`).

## Asynchronous Module Definition (AMD) Modules

AMD modules take their inspiration from CommonJS, and were pioneered by
RequireJS, a JavaScript module loader used on the client-side (that is, in
the browser). As the name indicates, using AMD modules allows you to write
your code so it loads asynchronously. RequireJS guarantees that when your
code runs, all of its dependencies have been loaded, regardless of the
order in which they were defined. E.g.:

```javascript
define("counter", ["helper","jquery"], function (helper, $) {
	return {
		value: function (value) {
			if (void 0 === value) {
				return c;
			}

			c = (helper.fn(value) || 0);
		}
	};
});
```

The `counter` module, defined above, depends on the `helper` module.

## Universal Module Definition (UMD) Modules

UMD modules set themselves the ambitious goal of bringing together pure
modules (AKA browser globals), CommonJS modules, and AMD modules. They
should work everywhere, be it client-side or server-side.

Depending on what you're trying to do (say, you have no dependencies),
there are simpler approaches, so there are a number of variations on
the basic UMD module pattern.

```javascript
(function (root, factory) {
	if (("function" == typeof define) && define.amd) {
		define(["exports", "dependency"], factory);
	} else if ("object" == typeof exports) {
		factory(exports, require("dependency"));
	} else {
		factory((root.module = {}), root.dependency);
	}
}(this, function (exports, dependency) {
	exports.action = function () {};
}));
```

The above defines an IIFE which receives two parameters, `root` and
`factory`; and which is responsible for toggling between AMD, UMD,
and browser globals. `root` is the current context and `factory` is
our module, which we write as if it were a CommonJS module.

## References and Additional Reading

[CommonJS Modules](http://goo.gl/85PyfY)
[Asynchronous Module Definition](http://goo.gl/rDzj1r)
[Why AMD?](http://goo.gl/eupnD)
[Universal Module Definition](http://goo.gl/Kp1dy)
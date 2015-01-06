# Style

## On Writing Code

Programming is not unlike other types of writing. For one thing, you have
readers - whether it's you in a few months, or other devs on your team.

The W3C puts it this way:

> "See your code as a narrative. If you can read line by line and
understand what is going on, well done. If you need to use a sketchpad
to keep up with the flow of logic, then your code needs some work."

Taking that further, we can apply rules from "real" writing in our coding.
To paraphrase an essay by George Orwell:

1. Keep variable and function names clear and simple.
2. Don't write more code than you have to.
3. Don't try to be too clever and make your code hard to follow.
   Opt for readability and maintainability over performance.
4. Break any of these rules sooner than ship a bad product.

I strongly believe that all code in any code-base should look like a single
person wrote it, no matter how many people contributed.

As Rebecca Murphey says:

> "Arguments over style are pointless. There should be a style guide,
and you should follow it."

This can be kind of obnoxious, especially if your personal preferences go
against the styleguide. But think how great it would be if you could pick
up any project within your organization, bypass all style discrepancies,
and just jump straight into understanding what it does.

Following common conventions and patterns also makes it easier to follow
code at a higher level. I'm sure you've run into your share of overly-
clever Rube Goldberg machines that are nearly impossible to understand,
let alone debug.

## A JavaScript Style Guide

What follows is my personal preference for what beautiful JavaScript
should look like. I lean heavily on IdiomaticJS. Feel free to disagree. :)

### Whitespace

- Never mix spaces and tabs. Be consistent.
- I like to use tabs, with four spaces per tab.
- If possible, set up your text editor to strip trailing spaces
  and enforce your chosen indentation.

### Quotes

- Single or double, it doesn't matter. Just be consistent.
- I prefer double quotes, but so many people use single quotes
  that I go with it if that's the established convention.

### Control Flow Statements

- Use whitespace to promote readability.
  Here's how I do it for various scenarios:
```javascript
	if (condition) {
		// Statements...
	} else {
		// Statements...
	}

	while (condition) {
		// Statements...
	}

	for (var i = 0, l = data.length; i < l; ++i) {
		// Statements...
	}

	var fn = function () {
		// Statements...
	};

	switch (variable) {
		case "one":
			// Statements...
		break;
		case "two":
			// Statements...
		break;
		default:
			// Statements...
		break;
	}
```
- Always, always, always wrap if/else-statements in curly braces.
- Get invalid cases out of the way first to minimize indentation.
  Instead of writing it this way:
```javascript
	if (condition) {
		// Lots of code...
	} else {
		// Report errors (not a lot of code).
	}
```
  Write it this way:
```javascript
	if (!condition) {
		// Report errors (not a lot of code).
		return;
	}

	// Lots of code...
```
- Yoda conditions, a big fan of, am I.
  Writing it this way:
```javascript
	if ("value" == variable) {
		// Statements...
	}
```
  Means this will always fail:
```javascript
	if ("value" = variable) {
		// Statements...
	}
```

### Functions

- Functions can be defined in one of three ways:
```javascript
	// Function expression.
	var fn = function () {};

	// Function declaration.
	function fn() {}

	// Function expression with an identifier.
	var fn = function fn() {};
```
- I generally go with simple function expressions myself, but would
  recommend using function expressions with an identifier if you need
  to get more detail in stack traces.

### Variables

- I like to use the following conventions, but obviously with more
  meaningful variable names.
```javascript
	var foo = "bar", // One "var".
		integer = 1, // One variable per line.
		array = [], // Literal notation.
		object = { // Ditto.
			a: "alpha"
		},
		// Plain vanilla DOM element.
		span = document.querySelector("span"),
		// jQuery object.
		$span = $("span"),
		// camelCase: ClassesLikeThis, objectsLikeThis.
		fooBar = new FooBar();
```
- I prefer not declaring a variable and/or its value until it is needed.
  Yes, you end up with more than one "var", but this way the variable is
  closer to the part of your code where it is relevant, and the compiler
  moves the declaration to the beginning of the scope anyway.

### Comparisons and Type Checking

- To check the type of a variable, use:
```javascript
	if ("type" == typeof variable) {
		// Statements...
	}
```
  (Douglas Crockford cries when you don't use `===`, but I'm OK with that
  as long as you know what you're doing.)
- To check if something is defined (assuming it won't have a falsy value),
  don't bother with this:
```javascript
	if ("undefined" !== typeof object.property) {
		// Statements...
	}
```
  Or this:
```javascript
	if (void 0 !== object.property) {
		// Statements...
	}
```
  Instead, simply do this:
```javascript
	if (object.property) {
		// Statements...
	}
```
  Or this:
```javascript
	if ("property" in object) {
		// Statements...
	}
```
- Side Note:
```javascript
    console.log([].forEach); // function
    console.log("forEach" in []); // true
    console.log([].hasOwnProperty("forEach")); // false
```
- Another example is array length. Don't bother with:
```javascript
	if (0 == array.length) {
		// Statements...
	}
```
  Just do this:
```javascript
	if (!array.length) {
		// Statements...
	}
```
- Ditto with strings and other variables that evaluate truthy/falsey.

### Type Coercion

- Don't ever coerce types. Your intent reads more clearly if you write:
```javascript
	if (1 == parseInt(string, 10)) {
		// Statements...
	}
```
  Than if you write:
```javascript
	if (1 == +string) {
		// Statements...
	}
```
- Another example. Please do this:
```javascript
	if (array.indexOf("a") >= 0) {
		// Statements...
	}
```
  Not this:
```javascript
	if (!!~array.indexOf("a")) {
		// Statements...
	}
```

## References and Additional Reading

- [JS Best Practices](http://goo.gl/8jYgu)
- [Politics and the English Language](http://goo.gl/QuHn)
- [Idiomatic JS](http://goo.gl/YXpKaP)
- [Apple's SSL/TLS Bug](http://goo.gl/DzRLNq)
- [Function Expressions vs Declarations](http://goo.gl/U2c2c)
- [Yoda Conditions](http://goo.gl/qP13vL)
- [JS The Right Way](http://goo.gl/EufBwT)
- [JS Equality Table](http://goo.gl/ZK714T)
- [Douglas Crockford's JS](http://goo.gl/oy4Tb)
- [Generation JS](http://goo.gl/3Dsncl)
# Other Topics

## this

`this` is an operator that refers to either the global object
or to a specific object at a particular execution context.

Assume we're in the browser, in the global context:

```javascript
var message = "Global";

console.log(message); // "Global"
console.log(window.message); // "Global"
console.log(this.message); // "Global"

var local = {
	message: "Local",
	log: function () {
		console.log(this.message);
	}
};

console.log(local.message); // "Local"
console.log(window.local.message); // "Local"
console.log(this.local.message); // "Local"
local.log(); // "Local"
```

A common convention when trying to avoid confusion is to define
a variable called `self` (or `that`), which references the current
context, so that it can be used in subsequent functions without
worrying about the meaning of `this`.

## Strict Mode

TL;DR: Always use strict mode.

Strict mode is a way to opt in to a restricted variant of JavaScript.
It isn't just a subset: it intentionally has different semantics from
normal code. You enable it thusly:

```javascript
"use strict";
```

It prevents you from doing the following things (to name a few):

1. Accidentally creating global variables.
2. Assigning values to non-writable/extensible variables or properties.
3. Deleting undeletable properties.
4. Dreaming impossible dreams. (j/k)
5. Giving objects properties with duplicate names.
6. Giving functions parameters with duplicate names.
7. Writing octal numbers.
8. Using "with".
9. Introducing new variables via "eval".
10. Defaulting "this" to the global object (e.g. "window") inside
    functions, requiring you to specify the context explicitly.

## Libraries, Polyfills, VanillaJS, and MicroJS

One of the the greatest difficulties in writing JavaScript comes from the
inconsistencies across browsers. It's especially frustrating when there
are all these wonderful new features, common to the latest version of the
language, which we can't use because they're unavailable across the board.

That's where libraries like jQuery, Underscore, and individual polyfills
really save the day by providing developers with a consistent (or close-
enough) API regardless of which browser users are on.

Meanwhile, as developers have grown more confident in their skills, there
has also been a move back to writing pure (or "vanilla") JavaScript without
monolithic libraries. They opt to pull in a handful or "micro" libraries,
or just roll their own. These libraries have a very narrow focus (e.g. DOM
manipulation or routing). Some devs even go so far as to draw a line and
only support "modern" browsers.

My perspective on this is that:

1. There will always be inconsistencies across browsers, and I would
   rather delegate filling in the potholes to someone else.
2. Sometimes the API provided by a library is so much better than the
   alternative that for the sake of clarity and less application code,
   I'm willing to sacrifice a reasonable amount of performance.
3. You may only need part of a library right now, but as your project
   continues growing you may need more of it, and there's no reason
   to set yourself up for potential major rewrites later on.

For these reasons, I'm a strong advocate of using libraries like jQuery
and Underscore, as long as we limit our use of them to those areas where
they really shine. jQuery has an excellent DOM manipulation library, and
its implementation of AJAX is second to none. Underscore is very good at
providing a consistent API for working with arrays, objects, and functions
using a functional approach, which helps makes code far more succinct and
clear than it would be otherwise.

## JSHint and JSLint

Douglas Crockford, has done an awful lot to improve our use of JavaScript.
(We also owe him big time for inventing JSON.)

One of his other creations is JSLint, a tool that runs static code analysis
on JavaScript to make sure it complies with the coding rules he defined
(e.g. use `===` instead of `==`). Because some folks felt like his rules were
obnoxious, they invented their own variant, called JSHint.

I cannot stress how useful static analysis tools are. Make sure you run
all your JavaScript through one (if possible, get it as a plugin for your
text editor of choice). It will save you from a myriad of common errors,
and will even notify you when there are variables and parameters you're
not using (i.e. that you can get rid of).

## References and Additional Reading

- [Misunderstood JS Concepts](http://goo.gl/iLVNEX)
- [this](http://goo.gl/0Fdxc)
- [JS's Slightly Stricter Mode](http://goo.gl/spUzl)
- [Strict Mode](http://goo.gl/vVS7Or)
- [VanillaJS](http://vanilla-js.com/)
- [MicroJS](http://microjs.com/)
- [You Don't Need jQuery](http://goo.gl/q1NRxh)
- [Cutting the Mustard](http://goo.gl/0z98WJ)
- [JSLint](http://goo.gl/v9NNwS)
- [JSHint](http://jshint.com/)
- [JS Anti-Patterns](http://goo.gl/L0NWYb)
- [The Two Pillars of JS](http://goo.gl/AAXkV6)
- [Surprises from jQuery's Source](http://goo.gl/Ix9MT3)
- [Misc JS Tricks](http://goo.gl/ocBGHB)
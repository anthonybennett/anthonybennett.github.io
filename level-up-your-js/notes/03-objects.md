# Objects

A common pattern I fall into is creating one sitename.js for shared
functionality, and one page.js for each section of the site.

(I also usually wrap these in IIFEs, which we'll cover later.)

```javascript
// sitename.js
var sitename = {
	init: function () {
		// Statements...
	},
	makeAwesome: function (element) {
		// Statements...
	}
};

sitename.init();

// page.js
var page = {
	init: function () {
		this.$widget = $("#widget");

		this.$widget.on("click", "a.make-awesome", function (event) {
			sitename.makeAwesome(this);
			event.preventDefault();
		});

		this.$widget.on("click", "button", function (event) {
			page.submitViaAjax();
			event.preventDefault();
		});
	},
	serialize: function () {
		// Statements...
	},
	submitViaAjax: function () {
		var data = this.serialize();
		// Et cetera...
	}
};

page.init();
```

Preferably, the JS should be included after all your markup at the
end of the `<body>`, so you don't have to wait for the DOM to be ready.
If I have to wait, I'll init like this:

```javascript
$(function () {
	page.init();
});
```

Also (and this isn't something I've used myself yet), but these days,
you can do stuff like this:

```javascript
var person = Object.create(Object.prototype, {
	firstName: "John",
	lastName: "Doe",
	fullName: {
		// configurable: ...
		// enumerable: ...
		// writable: ...,
		// value: ...,
		get: function () {
			return (this.firstName + " " + this.lastName);
		},
		set: function (fullName) {
			fullName = fullName.split(" ");
			this.firstName = fullName[0];
			this.lastName = fullName[1];
		}
	}
});

console.log(person.fullName); // "John Doe"
person.fullName = "Jack Ryan";
console.log(person.firstName); // "Jack"
console.log(person.lastName); // "Ryan"
```

And even more awesome, the future looks like this:

```javascript
Object.observe(person, function (changes) {
	changes.forEach(function(change) {
		console.log("What property changed? " + change.name);
		console.log("How did it change? " + change.type);
		console.log("What's its current value? " + change.object[change.name]);

		// Now, imagine updating DOM elements as your data model changes.
	});
});
```

## References and Additional Reading

- [Object.create](http://goo.gl/GBujf)
- [All IE Objects are Kinda Broken](http://goo.gl/wsmdRL)
- [Object.defineProperties](http://goo.gl/FC8kWq)
- [ES5 Getters and Setters](http://goo.gl/0eROA7)
- [Object.observe](http://goo.gl/ideGwf)
- [Data-binding Revolutions w/O.o](http://goo.gl/lByqzI)
- [The Two Pillars of JS](http://goo.gl/AAXkV6)
- [Creating Objects w/o Prototypes](http://goo.gl/vaXdZn)
- [ES6 OOP Features Besides Classes](http://goo.gl/PFBrFg)
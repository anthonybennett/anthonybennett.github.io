# Promises

A promise represents the result of a task. This task may or may not have
been completed yet. You can specify code that runs when it is completed,
whether successfully or otherwise.

Typically use-cases are waiting on ajax calls, chaining data filters,
and error handling.

Let's illustrate what this looks like using jQuery.ajax:

```javascript
$.ajax({
	url: "/some-url"
}).done(function (result) {
	// Aww yisss...
}).fail(function () {
	// Oh noes...
});
```

Compare that to how you typically write the same code:

```javascript
$.ajax({
	url: "/some-url",
	success: function (result) {
		// Aww yisss...
	},
	error: function () {
		// Oh noes...
	}
});
```

Now, why would we write it this way? Well, we wouldn't, necessarily,
for trivial scenarios such as the above.

But how about a more complicated scenario?

```javascript
var example = {
	cache: {},
	getTheData: function (value) {
		// jQuery's mechanism for promises.
		var deferred = $.Deferred();

		// Data were previously cached.
		if (value in cache) {
			// So we can "return" it immediately.
			deferred.resolve(cache[value]);
		// Otherwise...
		} else {
			// We need to look up its key by value.
			$.ajax({
				url: "/some-url",
				data: { value: value }
			}).done(function (firstResult) {
				// Then we need to get the data by that key.
				$.ajax({
					url: "/some-other-url",
					data: { key: firstResult.key }
				}).done(function (secondResult) {
					// Add the data to our cache.
					cache[value] = secondResult;

					// "Return" it.
					deferred.resolve(secondResult);
				}).fail(function () {
					// "Return" failure.
					deferred.reject("failed on some-other-url");
				});
			}).fail(function () {
				// "Return" failure.
				deferred.reject("failed on some-url");
			});
		}

		// Return a promise object.
		return deferred.promise();
	}
};

example.getTheData("foo").done(function (bar) {
	// Do stuff with the data...
}).fail(function (message) {
	// Message the user, or whatever...
});
```

## References and Additional Reading

[Futures and Promises](http://goo.gl/cwTYz)
[jQuery Deferred](http://goo.gl/sbcydG)
[then() vs pipe()](http://goo.gl/eWnbX)
[Promises vs Callbacks](http://goo.gl/JBgrP)
[Native Promises](http://goo.gl/vTdulW)
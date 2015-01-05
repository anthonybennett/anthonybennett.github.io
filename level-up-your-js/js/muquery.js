/*! muquery.js by Anthony Bennett; released under the LGPL on 2014/02/15 */
(function(win, doc, Aprototype, Elprototype) {
	"use strict";

	// Features used below that require IE9+:
	//   querySelector, querySelectorAll,
	//   firstElementChild, nextElementSibling,
	//   previousElementSibling, matches (prefixed)
	//   textContent, Object.keys, Array.forEach,
	//   addEventListener, removeEventListener,
	//   dispatchEvent
	// Features used below that require IE10+:
	//   classList (polyfilled for IE9)

	// Reject < IE9
	if (!win.addEventListener || !doc.querySelector) {
		throw "muquery.js requires a modern browser";
	}

	// private functions, data
	var slice = Aprototype.slice,
		canClassList = ("classList" in Elprototype),
		classProp = (canClassList ? "classList" : "className"),
		matches = (Elprototype.matches ||
					Elprototype.webkitMatchesSelector ||
					Elprototype.mozMatchesSelector ||
					Elprototype.oMatchesSelector ||
					Elprototype.msMatchesSelector),
		events = [],
		splitEventType = function(eventType) {
			eventType = eventType.split(".");
			return {
				type: eventType[0],
				namespace: ((eventType.length < 2) ? "" :
							eventType.slice(1).join("."))
			};
		},
		eventMatches = function(el, eventType, selector, event) {
			return ((event.el == el) &&
					(!eventType.type.length ||
					(event.type == eventType.type)) &&
					(!eventType.namespace.length ||
					(event.namespace == eventType.namespace)) &&
					(!selector ||
					(event.selector == selector)));
		};

	// define muquery
	var mu = win.mu = {
		// DOM search/navigation
		find: function(el, selector) {
			if (!selector) { selector = el; el = doc; }
			return el.querySelector(selector);
		},
		findAll: function(el, selector) {
			if (!selector) { selector = el; el = doc; }
			return slice.call(el.querySelectorAll(selector));
		},
		up: function(el, selector) {
			var ancestor = el;
			while (ancestor != document) {
				ancestor = ancestor.parentNode;
				if (mu.is(ancestor, selector)) {
					return ancestor;
				}
			}
		},
		down: function(el, selector) {
			return (selector ?
					el.querySelector(selector) :
					el.firstElementChild);
		},
		next: function(el) {
			return el.nextElementSibling;
		},
		prev: function(el) {
			return el.previousElementSibling;
		},
		is: function(el, selector) {
			return (!selector || matches.call(el, selector));
		},
		filter: function(els, selector) {
			if (els instanceof NodeList) {
				els = slice.call(els);
			}
			return els.filter(function(el) {
				return mu.is(el, selector);
			});
		},
		text: function(el, text) {
			if (!text) { return el.textContent; }
			el.textContent = text;
			return el;
		},
		html: function(el, html) {
			if (!html) { return el.innerHTML; }
			el.innerHTML = html;
			return el;
		},
		// class/style manipulation
		addClass: (canClassList ? function(el, className) {
			el[classProp].add(className);
			return el;
		} : function(el, className) {
			if (!el[classProp]) {
				el[classProp] = className;
			} else if (!mu.hasClass(el[classProp])) {
				el[classProp] += (" " + className);
			}
			return el;
		}),
		removeClass: (canClassList ? function(el, className) {
			el[classProp].remove(className);
			return el;
		} : function(el, className) {
			if (el[classProp] && mu.hasClass(el[classProp])) {
				var re = new RegExp("(\\s|^)" + className + "(\\s|$)");
				el[classProp] = el[classProp]
								.replace(re, " ")
								.replace(/(^\s*)|(\s*$)/g, "");
			}
			return el;
		}),
		toggleClass: (canClassList ? function(el, className) {
			el[classProp].toggle(className);
			return el;
		} : function(el, className) {
			return mu[mu.hasClass(el, className) ?
					"removeClass" : "addClass"](el, className);
		}),
		hasClass: (canClassList ? function(el, className) {
			return el[classProp].contains(className);
		} : function(el, className) {
			if (!el[classProp]) { return false; }
			var re = new RegExp("(\\s|^)" + className + "(\\s|$)");
			return re.test(el[classProp]);
		}),
		css: function(el, styles) {
			Object.keys(styles).forEach(function(key) {
				el.style[key] = styles[key];
			});
			return el;
		},
		// equivalent of $(fn);
		ready: function(fn) {
			doc.addEventListener("DOMContentLoaded", fn, false);
		},
		// event binding/unbinding/triggering
		on: function(el, eventType, selector, handler) {
			// split event type into type and namespace
			eventType = splitEventType(eventType);
			// wrap handler if selector given;
			// take handler from selector if none given
			if (selector) {
				if (handler) {
					var _handler = handler;
					handler = function(event) {
						if (mu.is(event.target, selector)) {
							_handler.call(event.target, event);
						}
					};
				} else {
					handler = selector;
				}
			}
			// register event
			events.push({
				el: el,
				type: eventType.type,
				namespace: eventType.namespace,
				selector: selector,
				handler: handler
			});
			// add event listener to element
			el.addEventListener(eventType.type, handler, false);
		},
		off: function(el, eventType, selector) {
			// split event type into type and namespace
			eventType = splitEventType(eventType);
			// loop over registered events
			var temp = [];
			events.forEach(function(event) {
				// if element and other options match,
				// remove event listener(s) from element;
				// otherwise, keep event registered
				if (eventMatches(el, eventType, selector, event)) {
					el.removeEventListener(event.type, event.handler, false);
				} else {
					temp.push(event);
				}
			});
			events = temp;
		},
		trigger: function(el, eventType, data) {
			// split event type into type and namespace
			eventType = splitEventType(eventType);
			// construct data object
			if (!data) { data = {}; }
			data.target = el;
			data.type = eventType.type;
			// loop over registered events
			var found = false;
			events.forEach(function(event) {
				// if element and other options match,
				// manually trigger our handlers
				if (eventMatches(el, eventType, null, event)) {
					found = true;
					event.handler.call(el, data);
				}
			});
			// if no matches found, dispatch event normally
			if (!found) { el.dispatchEvent(new Event(eventType.type)); }
		}
	};
}(window, document, Array.prototype, Element.prototype));
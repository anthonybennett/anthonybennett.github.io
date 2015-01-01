(function(win) {
	// Save some typing below.
	var mu = win.mu;

	// Define slides.
	var slides = {
		init: function() {
			// Find all sections. Start on first.
			this.els = mu.findAll("section");
			this.count = this.els.length;
			this.index = 0;
		},
		hide: function() {
			// Hide current element.
			mu.css(this.els[this.index], { display: "none" });
		},
		show: function() {
			// Force GIFs to start from the beginning.
			var bg = mu.find(this.els[this.index], "div.bg"),
				bgi = win.getComputedStyle(bg).backgroundImage.replace(
						/(\?rand=[^\)]+)?\)/, ("?rand=" + Math.random() + ")"));
			mu.css(bg, { backgroundImage: bgi });

			// Show current element.
			mu.css(this.els[this.index], { display: "block" });
		},
		next: function() {
			// Hide current.
			this.hide();

			// Show next (wrap around).
			this.index = ((this.index + 1) % this.count);
			this.show();
		},
		prev: function() {
			// Hide current.
			this.hide();

			// Show previous (wrap around).
			this.index = ((this.index || this.count) - 1);
			this.show();
		}
	};

	// On DOM ready.
	mu.ready(function() {
		// Initialize slides.
		slides.init();

		// Left/right arrow keys go to previous/next slide.
		mu.on(document, "keyup", function(e) {
			switch (e.which) {
				case 37: slides.prev(); break;
				case 39: slides.next(); break;
			}
		});

		// Left click goes to next slide.
		mu.on(document, "click", function() {
			slides.next();
		});

		// Right click goes to previous slide.
		mu.on(document, "contextmenu", function(e) {
			slides.prev();
			e.preventDefault();
		});
	});
}(this));
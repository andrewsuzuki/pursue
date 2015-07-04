function Pursue() {
	this.driver = null;
	this.result_n = -1;
}

Pursue.prototype.log = function(str) {
	console.log('pursue: ' + str);
};

// Use first applicable driver
Pursue.prototype.tryDriver = function(driver) {
	if (this.driver === null && driver.isApplicable()) {
		this.driver = driver;
		this.driver.setup();
		this.driver.highlightResult(this.result_n);
	}
};

// Open nth result's url, optionally in a new tab
Pursue.prototype.goToResult = function(n, newtab) {
	if (typeof newtab === 'undefined' || !this.driver.newTabOkay()) {
		newtab = false;
	}

	var href = this.driver.resultUrl(this.result_n);

	if (newtab) {
		window.open(href, '_blank');
	} else {
		location.href = href;
	}
};

// List keyboard commands and assoiated methods
Pursue.prototype.shortcuts = function() {
	return {
		'shift+down': this.doDown.bind(this),
		'shift+up': this.doUp.bind(this), 
		'shift+enter': this.doEnter.bind(this), 
		'ctrl+shift+enter': this.doTabEnter.bind(this),
		'command+shift+enter': this.doTabEnter.bind(this)
	};
};

Pursue.prototype.doDown = function() {
	if (this.result_n < this.driver.countResults()) {
		this.result_n += 1;
	}
	this.driver.highlightResult(this.result_n);
};

Pursue.prototype.doUp = function() {
	if (this.result_n > 0) {
		this.result_n -= 1;
	}
	this.driver.highlightResult(this.result_n);
};

Pursue.prototype.doEnter = function() {
	this.goToResult(this.result_n, false);
};

Pursue.prototype.doTabEnter = function() {
	this.goToResult(this.result_n, true);
};

Pursue.prototype.handleShortcut = function(event, handler) {
	var sc = handler.shortcut; // shortcut used
	var shortcuts = this.shortcuts();
	if (shortcuts[sc]) {
		shortcuts[sc].call();
	}
	return false; // prevent default
};

Pursue.prototype.run = function() {
	// watch for shortcuts using keymaster
	key(Object.keys(this.shortcuts()).join(', '), this.handleShortcut.bind(this));
};

var pursue = new Pursue();
pursue.run();

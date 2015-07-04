function Pursue() {
	this.drivers = [];
	this.newTabMode = false;
}

Pursue.prototype.log = function(str) {
	console.log('pursue: ' + str);
};

Pursue.prototype.getResults = function() {
	return $('body .g');
};

Pursue.prototype.getNthResultEl = function(n) {
	var gs = this.getResults();

	// check if result n exists
	if (gs.eq(n - 1).length) {
		return gs.eq(n - 1);
	}

	return false;
};

Pursue.prototype.flashResult = function(el) {
	// TODO: flash headlight effect on result
};

Pursue.prototype.goToResult = function(el, newtab) {
	newtab = typeof newtab === 'undefined' ? false : newtab;

	var href = el.find('a').first().attr('href');

	if (newtab) {
		window.open(href, '_blank');
	} else {
		location.href = href;
	}
};

Pursue.prototype.shortcutList = function() {
	var prefix = 'alt+';

	// generate alt+1, alt+2, etc shortcuts
	var nums = Array.apply(null, new Array(9)).map(function(val, i) {
		return prefix + (i + 1);
	});

	nums.push(prefix + 's'); // search 
		
	return nums;
};

Pursue.prototype.handleShortcut = function(event, handler) {
	var sc = handler.shortcut; // shortcut used
	var n = sc.split('+')[1];

	var el = this.getNthResultEl(n);
	if (el !== false) {
		this.flashResult(el);
		this.goToResult(el, this.newTabMode);
	} else {
		this.log('result get err');
	}

	return false; // prefent default
};

Pursue.prototype.run = function() {
	// watch for shortcuts using keymaster
	key(this.shortcutList().join(', '), this.handleShortcut.bind(this));
};

var pursue = new Pursue();
pursue.run();

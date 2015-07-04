$(function() {
	var cuts = 'alt+shift+1, alt+shift+2, alt+shift+3, ' +
		'alt+shift+4, alt+shift+5, alt+shift+6, ' + 
		'alt+shift+7, alt+shift+8, alt+shift+9';

	var log = function(str) {
		console.log('pursue: ' + str);
	};

	var getResults = function() {
		return $('body .g');
	};

	var getNthResultEl = function(n) {
		var gs = getResults();

		// check if result n exists
		if (gs.eq(n - 1).length) {
			return gs.eq(n - 1);
		}

		return false;
	};

	var flashResult = function(el) {
		// TODO: flash headlight effect on result
	};

	var goToResult = function(el, newtab) {
		newtab = typeof newtab === 'undefined' ? false : newtab;

		var href = el.find('a').first().attr('href');

		if (newtab) {
			window.open(href, '_blank');
		} else {
			location.href = href;
		}
	};

	key(cuts, function(event, handler) {
		var sc = handler.shortcut; // shortcut used
		var n = sc.split('+')[2]; // 1<=n<=9

		var el = getNthResultEl(n);
		if (el !== false) {
			flashResult(el);
			goToResult(el, false);
		} else {
			// TODO: disp error
		}

		return false; // prefent default
	});
});

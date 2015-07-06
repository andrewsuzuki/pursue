function Github() {
}

Github.prototype.isApplicable = function() {
	return false;
};

Github.prototype.newTabOkay = function() {
	return true;
};

Github.prototype.setup = function() {
};

Github.prototype.getResults = function() {
	return $('body ul.repo-list li.repo-list-item');
};

Github.prototype.countResults = function() {
	return this.getResults().length;
};

Github.prototype.getResult = function(n, results) {
	results = results || this.getResults();
	var result = results.eq(n);
	if (!result) {
		return false;
	}
	return result;
};

Github.prototype.highlightResult = function(n) {
	var results = this.getResults();
	var result = this.getResult(n, results);
	// reset others
	results.each(function(i) {
		$(this).css('background', 'white');
	});
	if (result) {
		// highlight given
		result.css('background', '#FFFFD1');
	}
};

Github.prototype.resultUrl = function(n) {
	var result = this.getResult(n);
	if (!result) {
		return false;
	}
	var href = result.find('h3.repo-list-name a').first().attr('href');
	if (!href.length) {
		return false;
	}
	return href;
};

Github.prototype.search = function() {
	$('input.js-site-search-focus').first().focus();
};

pursue.tryDriver(new Github());

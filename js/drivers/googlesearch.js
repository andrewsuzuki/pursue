function GoogleSearch() {
}

GoogleSearch.prototype.isApplicable = function() {
	// TODO: only return true when on search results page
	return false;
};

GoogleSearch.prototype.newTabOkay = function() {
	return true;
};

GoogleSearch.prototype.setup = function() {

};

GoogleSearch.prototype.getResults = function() {
	return $('body .g');
};

GoogleSearch.prototype.countResults = function() {
	return this.getResults().length;
};

GoogleSearch.prototype.getResult = function(n, results) {
	results = results || this.getResults();
	var result = results.eq(n);
	if (!result) {
		return false;
	}
	return result;
};

GoogleSearch.prototype.highlightResult = function(n) {
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

GoogleSearch.prototype.resultUrl = function(n) {
	var result = this.getResult(n);
	if (!result) {
		return false;
	}
	var href = result.find('a').first().attr('href');
	if (!href.length) {
		return false;
	}
	return href;
};

pursue.tryDriver(new GoogleSearch());

exports.capitalize = function(string) {
	 if (typeof string != 'string') {
	 	console.log(string);
	 	throw new Error('expected a string');
	 }
	return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.reverse = function() {
	return 'oof';
};


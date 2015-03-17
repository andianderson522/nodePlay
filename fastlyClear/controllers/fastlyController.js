var log = require('../logger');

exports.prepare = function() {
	body = {title: 'Fastly Clear Form'};
	return body;
};
exports.process = function(body) {
	result = {};
	log.debug('got post body: ' + JSON.stringify(body));
	validator = require('../validators');
	errorTitle = 'Fastly Clear Form Errors';
	if (validator.isNullOrEmpty(body)) {
		return {error: 'missing post body', title: errorTitle};
	}	
	if (validator.isNullOrEmpty(body.url)) {
		return {error: 'missing URLS to clear', title: errorTitle};
	}
	return result;
};
var log = require('../logger');

exports.prepare = function() {
	body = {title: 'Fastly Clear Form'};
	return body;
};
exports.process = function(body) {
	log.debug('body: ' + JSON.stringify(body));
	result = {};
	validator = require('../validators');
	errorTitle = 'Fastly Clear Form Errors';
	if (validator.isNullOrEmpty(body)) {
		log.debug('body is not valid');
		result.error = 'missing post body';
		result.title = errorTitle;
		return result;
	}	
	if (validator.isNullOrEmpty(body.URL)) {
		log.debug('body.URL is not valid');
		result.error = 'missing URL to clear';
		result.title = errorTitle;
		return result;
	}
	if (validator.isNullOrEmpty(body.key)) {
		log.debug('body.key is not valid');
		result.error = 'missing key';
		result.title = errorTitle;
		return result;
	}
	log.debug('No validation errors');
	result.title = "Fastly Clear Success";
	return result;
};
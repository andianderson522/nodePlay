var log = require('../logger');

exports.prepare = function(req, res) {
	body = {title: 'Fastly Clear Form'};
	return body;
};
exports.process = function(req, res) {
	result = {};
	log.debug('got post body: ' + req.body);
	
	return result;
};
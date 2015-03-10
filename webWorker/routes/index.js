var express = require('express');
var router = express.Router();
var validator = require('../validators');

/* GET home page. */
router.get('/ping', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ pong: true}));
});
router.post('/put-cut', function(req, res) {
	req.logger.info('in post');
	req.logger.info(req.body.path);
	res.setHeader('Content-Type', 'application/json');
	if (validator.isEmpty(req.body)) {
		res.end(JSON.stringify({ error: 'missing post body' }));
	}
	req.logger.info(req.body.width);
	req.logger.info(req.body.height);
	
    res.end(JSON.stringify({ success: true }));
});

/*
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
 
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
 
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 
    return true;
}
*/
module.exports = router;

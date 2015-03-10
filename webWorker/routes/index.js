var express = require('express');
var router = express.Router();
var validator = require('../validators');

/* GET home page. */
router.get('/ping', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ pong: true}));
});
router.get('/put-cut', function(req, res) {
	req.logger.info('in get');
	var db = req.db;
	var collection = db.get('imagePaths');
	collection.find({},{},function(e,docs){
		res.setHeader('Content-Type', 'application/json');
        res.status(200).send(docs);
    });
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
	
	var db = req.db;
	var collection = db.get('imagePaths');
	collection.insert({
		"path" : req.body.path,
		"width" : req.body.width,
		"height" : req.body.height,
		"date" : new Date().getTime()
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            req.logger.error("problem with db");
            res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            req.logger.info('data inserted');
        }
    });
    res.end(JSON.stringify({ success: true }));
});


module.exports = router;

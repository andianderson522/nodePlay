var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
	req.logger.info('in post');
	res.render('success', { title: 'YEAH'});

});

module.exports = router;

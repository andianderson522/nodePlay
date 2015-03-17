var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	var controller = require('../controllers/fastlyController');
  	res.render('index', controller.prepare());
});
router.post('/', function(req, res) {
	result = require('../controllers/fastlyController').process(req.body);
	if (result.error) {
		res.render('index', result);
	} else {
		res.render('index', { title: 'Fastly Clear Form Success' });
	}
});

module.exports = router;

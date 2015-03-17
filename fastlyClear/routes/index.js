var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	var controller = require('../controllers/fastlyController');
  	res.render('index', controller.prepare(req, res, err));
});
router.post('/', function(req, res) {
	res.render('index', { title: 'Fastly Clear Form Success' });
});

module.exports = router;

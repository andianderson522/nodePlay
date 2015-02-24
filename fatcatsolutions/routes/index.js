var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Fat Cat Solutions', layout: 'layout2' });
});

module.exports = router;

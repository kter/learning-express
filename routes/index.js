var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var title = req.body.title;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(title);
    console.log(createdAt);
    res.render('index', { title: 'Express' });
});

module.exports = router;

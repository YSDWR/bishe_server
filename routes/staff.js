var express = require('express');
var router = express.Router();
const db = require('../database')

router.get('/', function(req, res, next) {
  db.query('select * from staff', (err, results) => {
    res.send(results)
  })
});

module.exports = router;
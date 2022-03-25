var express = require('express');
var router = express.Router();
const db = require('../database')

router.get('/:id', function(req, res, next) {
  db.query('select * from trackRecord where id = ?',[req.params.id] , (err, results) => {
    res.send(results)
  })
});

module.exports = router;
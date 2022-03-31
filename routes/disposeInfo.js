var express = require('express');
var router = express.Router();
const db = require('../database')
const ws = require('../ws')

router.get('/', function(req, res, next) {
  db.query('select * from disposeInfo', (err, results) => {
    res.send(results)
    // app.ws.send('get_websocket')
    // console.log(app);
    console.log(ws);
    // ws.connections[0].sendText('out out')
  })
});

module.exports = router;
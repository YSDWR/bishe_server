const router = require('express').Router()
const db = require('../database')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config/keys')

/* db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */

router.post('/', (req, res) => {
  const data = req.body
  db.query('select * from user where id = ? and password = ?', [data.user, data.password],
    (error, results) => {
      if (error) {
        res.send({
          status: false
        })
        return console.log(err.message);
      } else {
        if (results.length) {
          const rule = {id: data.user}
          const toknStr = jwt.sign(rule, secretKey, {expiresIn: '12h'})
          res.send({
            status: true,
            user: data.user,
            token: toknStr
          })
        } else {
          res.send({
            status: false
          })
        }
      }
    })
})

module.exports = router;

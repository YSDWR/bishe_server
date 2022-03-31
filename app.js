const createError = require('http-errors');
const express = require('express');
const expressJwt = require('express-jwt')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { secretKey } = require('./config/keys')
const cors = require('cors')


const usersRouter = require('./routes/users');
const disposeInfo = require('./routes/disposeInfo')
const packageInfo = require('./routes/packageInfo')
const tempStorageInfo = require('./routes/tempStorageInfo')
const transferRecord = require('./routes/transferRecord')
const trackRecord = require('./routes/trackRecord')
const staff = require('./routes/staff');
const { log } = require('console');

const app = express();

// const ws = io.createServer(connection => {
//   console.log('new connection...')
//   //处理客户端发送过来的消息	
//   connection.on("text", function (data) {
//     console.log("接收到的客户端消息:" + data);
//     connection.sendText("服务器端返回数据:" + data)

//     //监听关闭
//     connection.on("close", function (code, reason) {
//       console.log("Connection closed")
//     })
//     //监听异常
//     connection.on("error", () => {
//       console.log('服务异常关闭...')
//     })
//   })
// }).listen(3001, _ => {console.log('ws on')})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressJwt({ secret: secretKey, algorithms: ['HS256'] })
  .unless({ path: [/^\/login/, /^\/socket/] }))

// begin******************************
app.use('/login', usersRouter);
app.use('/disposeInfo', disposeInfo);
app.use('/packageInfo', packageInfo);
app.use('/tempStorageInfo', tempStorageInfo);
app.use('/transferRecord', transferRecord);
app.use('/trackRecord', trackRecord);
app.use('/staff', staff);

app.get('/', (req, res) => {
  res.send({
    d: 'data'
  })
  ws.connections[0].sendText('get wssss')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => { console.log(3000); })
// module.exports = app;


const ws = require('./ws')
ws.listen(3001, _ => {console.log('ws on')})

// setTimeout(() => {
//   ws.connections[0].sendText('out out')
// }, 10000)
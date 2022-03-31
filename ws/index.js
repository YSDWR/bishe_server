const io = require('nodejs-websocket')

const ws = io.createServer(connection => {
  console.log('new connection...')
  //处理客户端发送过来的消息	
  connection.on("text", function (data) {
    console.log("接收到的客户端消息:" + data);
    connection.sendText("服务器端返回数据:" + data)

    //监听关闭
    connection.on("close", function (code, reason) {
      console.log("Connection closed")
    })
    //监听异常
    connection.on("error", () => {
      console.log('服务异常关闭...')
    })
  })
})

module.exports = ws;
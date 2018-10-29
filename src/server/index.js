'use strict'

const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())

const io = require('socket.io')(server)

server.listen(3000, '0.0.0.0')

app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.body = 'OK'
})

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })

  socket.on('my other event', function (data) {
    console.log(data)
  })
})

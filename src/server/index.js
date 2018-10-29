'use strict'

const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const Core = require('./lib/Core')

const gameCore = new Core(io)

gameCore.startServer()

server.listen(3000, '0.0.0.0')

app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.body = 'OK'
})

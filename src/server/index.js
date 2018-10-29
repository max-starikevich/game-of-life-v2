'use strict'

const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const Game = require('./lib/Game.js')

const instance = new Game(io)

instance.startServer().then(() => {
  console.log('Game of Life is online')
})

server.listen(3000, '0.0.0.0')

app.use(async (ctx) => {
  ctx.type = 'html'
  ctx.body = 'OK'
})

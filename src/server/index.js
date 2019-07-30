'use strict'

const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const Core = require('./src/Core')

const game = new Core(io)

game.prepareGame().then(async () => {
  console.log('Game of Life is online')
  await game.startGame()
})

server.listen(3000, '0.0.0.0')

app.use(async (ctx) => {
  ctx.type = 'html'
  ctx.body = 'OK'
})

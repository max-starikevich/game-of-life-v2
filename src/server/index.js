'use strict'

const Koa = require('koa')
const Core = require('./src/Core')

const app = new Koa()
const server = require('http').createServer(app.callback())

server.listen(9000)

const io = require('socket.io')(server)
const game = new Core(io)

game.prepareGame().then(() => {
  console.log('Game of Life is online')
  game.startGame()
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

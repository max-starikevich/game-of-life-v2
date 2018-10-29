'use strict'

const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())

server.listen(3000, '0.0.0.0')

app.use(async (ctx) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream(path.resolve(process.pwd + '/../dist/index.html'))
})

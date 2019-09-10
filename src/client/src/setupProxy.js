const proxy = require('http-proxy-middleware')
const URI = process.env.REVERSE_PROXY_URI || 'http://localhost:9000'

const proxyHandler = app => {
  app.use(proxy('/socket.io', { ws: true, target: URI }))
}

module.exports = proxyHandler

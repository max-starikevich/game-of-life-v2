const Communication = require('./Communication.js')

class Core {
  constructor(io) {
    this.communication = new Communication(io)
  }

  startServer() {
    this.communication.establish()
  }
}

module.exports = Core

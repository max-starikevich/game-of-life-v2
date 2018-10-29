const Communication = require('./Communication.js')
const World = require('./World.js')

class Game {
  constructor(io) {
    this.communication = new Communication(io)
    this.world = new World()
  }

  async startServer() {
    await this.communication.establish()
    await this.world.buildField()
  }
}

module.exports = Game

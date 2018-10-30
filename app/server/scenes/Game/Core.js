const Communication = require('./Communication.js')
const World = require('./World.js')

class Core {
  constructor(io) {
    this.communication = new Communication(io)
    this.world = new World()
  }

  async startServer() {
    await this.communication.establish()
    await this.prepareEvents()
    await this.world.build()
  }

  prepareEvents() {
    return new Promise((resolve => {
      this.communication.on('worldChange', (data) => {
        this.handleClientChange(data)
      })
      resolve()
    }))
  }

  handleClientChange(data) {
    console.log(data)
  }
}

module.exports = Core

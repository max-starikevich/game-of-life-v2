const Communication = require('./Communication.js')
const Playground = require('./Playground')

const triggerClientEventsList = [
  'world-change-client'
]

class Core {

  constructor(io) {
    this.communication = new Communication(io, triggerClientEventsList)
    this.playground = new Playground()
  }

  async startServer() {
    await this.communication.establish()
    this.communication.on('world-change-client', (...data) => {
      this.onWorldChangeClient(...data)
    })

    await this.playground.build()
    this.playground.on('world-change-server', (...data) => {
      this.onWorldChangeServer(...data)
    })
  }

  onWorldChangeClient(affectedCells) {
    this.playground.applyChanges(affectedCells)
    console.log(`onWorldChangeClient:`, affectedCells)
  }

  onWorldChangeServer(affectedCells) {
    this.communication.broadcast('world-change-server', affectedCells)
  }
}

module.exports = Core

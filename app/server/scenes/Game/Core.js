const Communication = require('./Communication.js')
const World = require('./World.js')

const triggerClientEventsList = [
  'world-change-client'
]

class Core {

  constructor(io) {
    this.communication = new Communication(io, triggerClientEventsList)
    this.world = new World()
  }

  async startServer() {
    await this.communication.establish()
    this.communication.on('world-change-client', (...data) => {
      this.onWorldChangeClient(...data)
    })

    await this.world.build()
    this.world.on('world-change-server', (...data) => {
      this.onWorldChangeServer(...data)
    })
  }

  onWorldChangeClient(affectedCells) {
    this.world.applyChanges(affectedCells)
    console.log(`onWorldChangeClient:`, affectedCells)
  }

  onWorldChangeServer(affectedCells) {
    this.communication.broadcast('world-change-server', affectedCells)
  }
}

module.exports = Core

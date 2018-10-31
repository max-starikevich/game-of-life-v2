const Communication = require('./Communication')
const World = require('./World')

const triggerClientEventsList = [
  'world-change-client'
]

class Core {
  constructor(io) {
    this.communication = new Communication(io, triggerClientEventsList)
    this.world = new World()
  }

  async prepareGame() {
    await this.communication.establish()
    this.communication.on('world-change-client', (...data) => {
      this.onWorldChangeClient(...data)
    })

    await this.world.build()
    this.world.on('world-change-server', (...data) => {
      this.onWorldChangeServer(...data)
    })
  }

  startGame() {
    this.world.randomizeWorld()
    this.world.startLifeCycle().then(() => {})
  }

  onWorldChangeClient(affectedCells) {
    this.world.modifyWorld(affectedCells)
    console.log(`onWorldChangeClient:`, affectedCells)
  }

  onWorldChangeServer(affectedCells) {
    this.communication.broadcast('world-change-server', affectedCells)
  }
}

module.exports = Core

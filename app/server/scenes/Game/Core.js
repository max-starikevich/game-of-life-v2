const Communication = require('./Communication')
const World = require('./World')

const triggerClientEventsList = [
  'cells-changed-client'
]

class Core {
  constructor(io) {
    this.communication = new Communication(io, triggerClientEventsList)
    this.world = new World()
  }

  async prepareGame() {
    await this.communication.establish()

    this.communication.on('cells-changed-client', (...data) => {
      this.onWorldChangeClient(...data)
    })

    await this.world.build()

    this.world.on('next-generation-built', () => {
      this.onNextGeneration()
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

  onNextGeneration() {
    this.communication.broadcast('next-generation-built', this.world.exportWorld())
  }
}

module.exports = Core

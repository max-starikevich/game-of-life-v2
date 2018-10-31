const Communication = require('./Communication')
const World = require('./World')

const eventHandlers = {
  'stop-lifecycle': (core) => {
    core.stopGame()
  },
  'start-lifecycle': (core) => {
    core.startGame()
  },
  'randomize-world': (core) => {
    core.randomizeWorld()
    core.broadcastWorld()
  },
  'world-update-request': (core, data, socket) => {
    core.sendWorldToClient(socket)
  },
  'cells-change': (core, data) => {
    core.registerCellsChange(data)
  }
}

class Core {
  constructor (io) {
    this.communication = new Communication(io, Object.keys(eventHandlers))
    this.world = new World()
  }

  async prepareGame () {
    await this.communication.establish()

    Object.keys(eventHandlers).map(eventName => {
      this.communication.on(eventName, (data, socket) => {
        this.onClientAction(eventName, data, socket)
      })
    })

    await this.world.build()

    this.world.randomize()

    this.world.on('world-update', () => {
      this.onNewWorldBuilt()
    })
  }

  startGame () {
    console.log('Starting lifecycle')

    this.world.startLifeCycle().then(() => {
      console.log('Lifecycle stopped')
    })
  }

  stopGame () {
    this.world.stopLifeCycle()
    this.broadcastWorld()
  }

  randomizeWorld () {
    this.world.randomize()
  }

  onClientAction (eventName, data, socket) {
    eventHandlers[eventName](this, data, socket)
  }

  onNewWorldBuilt () {
    this.broadcastWorld()
  }

  broadcastWorld () {
    this.communication.broadcast('world-update', this.export())
  }

  sendWorldToClient (socket) {
    this.communication.sendToClient(socket, 'world-update', this.export())
  }

  registerCellsChange(cells) {
    this.world.modifyCells(cells)
  }

  export() {

    let exportedWorld = this.world.export()
    let clientsCount = this.communication.clients.size

    return {
      ...exportedWorld,
      clientsCount
    }
  }
}

module.exports = Core

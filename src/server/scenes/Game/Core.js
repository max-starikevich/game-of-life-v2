const Network = require('./Network')
const World = require('./World')

const clientEvents = {
  'stop-lifecycle': (core) => {
    core.stopGame()
  },
  'start-lifecycle': (core) => {
    core.startGame()
  },
  'randomize-world': (core) => {
    core.randomizeWorld()
    core.sendWorldToAllClients()
  },
  'clear-world': (core) => {
    core.clearWorld()
    core.sendWorldToAllClients()
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
    this.network = new Network(io, Object.keys(clientEvents))
    this.world = new World()
  }

  async prepareGame () {
    await this.network.establish()

    Object.keys(clientEvents).map(eventName => {
      this.network.on(eventName, (data, socket) => {
        clientEvents[eventName](this, data, socket)
      })
    })

    await this.world.build()

    this.world.randomize()

    this.world.on('world-update', () => {
      this.onWorldUpdate()
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
    this.sendWorldToAllClients()
  }

  randomizeWorld () {
    this.world.randomize()
  }

  clearWorld() {
    this.world.clear()
  }

  onWorldUpdate () {
    this.sendWorldToAllClients()
  }

  sendWorldToAllClients () {
    this.network.sendToAllClients('world-update', this.exportGameData())
  }

  sendWorldToClient (socket) {
    this.network.sendToClient(socket, 'world-update', this.exportGameData())
  }

  registerCellsChange(cells) {
    this.world.modifyCells(cells)
  }

  exportGameData() {
    let exportedWorld = this.world.export()
    let clientsCount = this.network.clients.size

    return {
      ...exportedWorld,
      clientsCount
    }
  }
}

module.exports = Core

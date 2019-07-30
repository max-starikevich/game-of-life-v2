const Network = require('./Network')
const World = require('./World')

const clientEvents = {
  'stop-lifecycle': (core) => {
    core.stopGame()
  },
  'start-lifecycle': (core) => {
    core.startGame().then()
  },
  'randomize-world': (core) => {
    core.randomizeWorld().then()
    core.sendWorldToAllClients()
  },
  'clear-world': (core) => {
    core.clearWorld().then()
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
    this.network.establish()

    Object.keys(clientEvents).map(eventName => {
      this.network.on(eventName, (data, socket) => {
        clientEvents[eventName](this, data, socket)
      })
    })

    this.network.on('client-connected', (clientId) => {
      console.log(`Client ${clientId} connected`)
      this.sendClientDataToAllClients()
    })

    this.network.on('client-disconnected', (clientId) => {
      console.log(`Client ${clientId} disconnected`)
      this.sendClientDataToAllClients()
    })

    this.world.build()

    this.world.on('world-update', () => {
      this.onWorldUpdate()
    })

    return true
  }

  async startGame () {
    try {
      console.log('Starting lifecycle')
      await this.world.startLifeCycle()
    } catch (e) {
      if (e instanceof Error) {
        console.error(e)
      } else {
        console.log(`${e.toString()}`)
      }
    }
  }

  stopGame () {
    this.world.stopLifeCycle()
    this.sendWorldToAllClients()
  }

  async randomizeWorld () {
    await this.world.randomize()
  }

  async clearWorld () {
    await this.world.clear()
  }

  onWorldUpdate () {
    this.sendWorldToAllClients()
  }

  sendClientDataToAllClients () {
    this.network.sendToAllClients('client-data-update', {
      clientsCount: this.network.clients.size
    })
  }

  sendWorldToAllClients () {
    this.network.sendToAllClients('world-update', this.exportGameData())
  }

  sendWorldToClient (socket) {
    this.network.sendToClient(socket, 'world-update', this.exportGameData())
  }

  registerCellsChange (cells) {
    this.world.modifyCells(cells)
  }

  exportGameData () {
    return {
      ...this.world.export()
    }
  }
}

module.exports = Core

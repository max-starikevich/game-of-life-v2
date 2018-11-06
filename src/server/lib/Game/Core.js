const Network = require('./Network')
const World = require('./World')

const clientEvents = {
  'stop-lifecycle': async (core) => {
    await core.stopGame()
  },
  'start-lifecycle': async (core) => {
    await core.startGame()
  },
  'randomize-world': async (core) => {
    await core.randomizeWorld()
    await core.sendWorldToAllClients()
  },
  'clear-world': async (core) => {
    await core.clearWorld()
    await core.sendWorldToAllClients()
  },
  'world-update-request': async (core, data, socket) => {
    await core.sendWorldToClient(socket)
  },
  'cells-change': async (core, data) => {
    await core.registerCellsChange(data)
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

    this.network.on('client-connected', (clientId) => {
      console.log(`Client ${clientId} connected`)
      this.sendClientDataToAllClients()
    })

    this.network.on('client-disconnected', (clientId) => {
      console.log(`Client ${clientId} disconnected`)
      this.sendClientDataToAllClients()
    })

    await this.world.build()
    await this.world.randomize()

    this.world.on('world-update', () => {
      this.onWorldUpdate()
    })

    return true
  }

  async startGame () {
    try {
      console.log('Starting lifecycle')
      await this.world.startLifeCycle()
    }
    catch (e) {
      console.log(`Lifecycle stopped. ${e.toString()}`)
    }
  }

  async stopGame () {
    await this.world.stopLifeCycle()
    await this.sendWorldToAllClients()
  }

  async randomizeWorld () {
    await this.world.randomize()
  }

  async clearWorld () {
    await this.world.clear()
  }

  onWorldUpdate () {
    this.sendWorldToAllClients().then(() => {})
  }

  sendClientDataToAllClients () {
    this.network.sendToAllClients('client-data-update', {
      clientsCount: this.network.clients.size
    })
  }

  async sendWorldToAllClients () {
    this.network.sendToAllClients('world-update', await this.exportGameData())
  }

  async sendWorldToClient (socket) {
    this.network.sendToClient(socket, 'world-update', await this.exportGameData())
  }

  registerCellsChange(cells) {
    this.world.modifyCells(cells).then(() => {})
  }

  async exportGameData () {
    let exportedWorld = await this.world.export()

    return {
      ...exportedWorld,
    }
  }
}

module.exports = Core

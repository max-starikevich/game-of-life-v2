const Network = require('./network')
const World = require('./world')

const clientEvents = require('./events')

class Core {
  constructor (io) {
    this.network = new Network(io, Object.keys(clientEvents))
    this.world = new World()
  }

  async prepareGame () {
    this.network.establish()

    Object.keys(clientEvents).map(eventName => {
      const handler = clientEvents[eventName]
      this.network.on(eventName, (data, socket) => handler(this, data, socket))
    })

    this.network.on('client-connected', clientId => {
      console.log(`Client ${clientId} connected`)
      this.sendClientDataToAllClients()
    })

    this.network.on('client-disconnected', clientId => {
      console.log(`Client ${clientId} disconnected`)
      this.sendClientDataToAllClients()
    })

    this.world.build()

    this.world.on('world-update', () => {
      this.onWorldUpdate()
    })
  }

  startGame () {
    this.world.startLifeCycle()
  }

  stopGame () {
    this.world.stopLifeCycle()
    this.sendWorldToAllClients()
  }

  randomizeWorld () {
    this.world.randomize()
  }

  clearWorld () {
    this.world.clear()
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

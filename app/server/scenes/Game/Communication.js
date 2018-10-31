const EventEmitter = require('events')

class Communication extends EventEmitter {
  constructor(io, eventList = []) {
    super()
    this.io = io
    this.clients = new Map()
    this.eventList = eventList
  }

  async establish() {
    this.io.on('connection', (socket) => {
      this.onConnectedClient(socket)
    })
  }

  onConnectedClient(socket) {
    let clientId = socket.id

    console.log(`Client ${clientId} connected`)

    this.clients.set(clientId, {
      id: clientId,
      socket: socket
    })

    socket.on('disconnect', () => {
      this.onDisconnectedClient(clientId)
      console.log(`Client ${clientId} disconnected`)
    })

    for(let eventName of this.eventList) {
      socket.on(eventName, (data) => {
        this.onClientMessage(eventName, data)
      })
    }
  }

  onClientMessage(eventName, data) {
    this.emit(eventName, data)
  }

  onDisconnectedClient(clientId) {
    let client = this.clients.get(clientId)

    if(client && client.socket) {
      client.socket.disconnect(true)
    }

    this.clients.delete(clientId)
  }

  broadcast(eventName, data) {
    this.io.sockets.emit(eventName, data)
  }
}

module.exports = Communication

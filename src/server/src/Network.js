const EventEmitter = require('events')

class Network extends EventEmitter {
  constructor (io, clientEvents = []) {
    super()
    this.io = io
    this.clients = new Map()
    this.clientEvents = clientEvents
  }

  establish () {
    this.io.on('connection', (socket) => {
      this.onConnectedClient(socket)
    })
  }

  onConnectedClient (socket) {
    let clientId = socket.id

    this.clients.set(clientId, {
      id: clientId,
      socket: socket
    })

    this.emit('client-connected', clientId, socket)

    socket.on('disconnect', () => {
      this.onDisconnectedClient(clientId)
    })

    for (let eventName of this.clientEvents) {
      socket.on(eventName, (data) => {
        this.emit(eventName, data, socket)
      })
    }
  }

  onDisconnectedClient (clientId) {
    this.clients.delete(clientId)
    this.emit('client-disconnected', clientId)
  }

  sendToAllClients (eventName, data) {
    this.io.sockets.emit(eventName, data)
  }

  sendToClient (socket, eventName, data) {
    socket.emit(eventName, data)
  }
}

module.exports = Network

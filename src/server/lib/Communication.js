const EventEmitter = require('events')

class Communication extends EventEmitter {

  constructor(io) {
    super()
    this.io = io
    this.connectedClients = new Map()
  }

  connectClient(socket) {
    return new Promise(((resolve) => {
      let clientId = socket.id

      this.connectedClients.set(clientId, {
        id: clientId,
        socket: socket
      })

      socket.on('disconnect', async () => {
        await this.disconnectClient(clientId)
      })

      socket.on('client-cell-change', (data) => {
        console.log(`Position is ${data.position}. Value is ${data.value}`)
      })

      resolve(clientId)
    }))
  }

  disconnectClient(clientId) {
    return new Promise(((resolve) => {
      let client = this.connectedClients.get(clientId)

      if(client && client.socket) {
        client.socket.disconnect(true)
      }

      this.connectedClients.delete(clientId)

      resolve()
    }))
  }

  establish() {
    return new Promise(((resolve) => {
      this.io.on('connection', async (socket) => {
        let clientId = await this.connectClient(socket)
      })
      resolve()
    }))
  }
}

module.exports = Communication

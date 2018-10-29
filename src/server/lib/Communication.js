class Communication {

  constructor(io) {
    this.io = io
    this.connectedClients = new Map()
  }

  connectClient(socket) {

    try {
      let clientId = socket.id

      this.connectedClients.set(clientId, {
        id: clientId,
        socket: socket
      })

      return clientId
    } catch (e) {
      console.err(e)
    }
  }

  disconnectClient(clientId) {

    try {
      let client = this.connectedClients.get(clientId)

      if(client && client.socket) {
        client.socket.disconnect(true)
      }

      this.connectedClients.delete(clientId)
    } catch(e) {
      console.error(e)
    }
  }

  establish() {

    try {
      this.io.on('connection', (socket) => {

        let clientId = this.connectClient(socket)

        socket.on('disconnect', () => {
          if(socket.id) {
            this.disconnectClient(clientId)
          }
        })
      })

    } catch(e) {
      console.error(e)
    }

  }
}

module.exports = Communication

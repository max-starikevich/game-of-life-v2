class Communication {

  constructor(io) {
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

        socket.on('disconnect', async () => {
          await this.disconnectClient(clientId)
        })
      })

      resolve()
    }))
  }
}

module.exports = Communication

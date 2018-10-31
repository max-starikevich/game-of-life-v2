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
  }
}

class Core {
  constructor(io) {
    this.communication = new Communication(io, Object.keys(eventHandlers))
    this.world = new World()
  }

  async prepareGame() {

    await this.communication.establish()

    Object.keys(eventHandlers).map(eventName => {
      this.communication.on(eventName, (data) => {
        this.onClientAction(eventName, data)
      })
    })

    await this.world.build()

    this.world.randomize()

    this.world.on('new-world-built', () => {
      this.onNewWorldBuilt()
    })

    this.world.on('world-died', () => {
      this.stopGame()
    })
  }

  startGame() {
    console.log('Starting lifecycle')
    this.world.startLifeCycle().then(() => {
      console.log('Lifecycle stopped')
    })
  }

  stopGame() {
    this.world.stopLifeCycle()
  }

  randomizeWorld() {
    this.world.randomize()
  }

  onClientAction(eventName, data) {
    eventHandlers[eventName](this, data)
  }

  onNewWorldBuilt() {
    this.broadcastWorld()
  }

  broadcastWorld() {
    this.communication.broadcast('new-world-built', this.world.exportWorld())
  }
}

module.exports = Core

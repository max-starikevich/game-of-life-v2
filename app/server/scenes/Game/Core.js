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

    this.world.on('next-generation-built', () => {
      this.onNextGeneration()
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
    console.log('World randomized')
  }

  onClientAction(eventName, data) {
    let handler = eventHandlers[eventName]
    handler(this, data)
  }

  onNextGeneration() {
    this.broadcastWorld()
  }

  broadcastWorld() {
    this.communication.broadcast('next-generation-built', this.world.exportWorld())
  }
}

module.exports = Core

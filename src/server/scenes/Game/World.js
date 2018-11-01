const EventEmitter = require('events')

class World extends EventEmitter {
  constructor (config = {
    size: [15, 15],
    rate: 100
  }) {
    super()
    this.size = config.size
    this.rate = config.rate
    this.world = null
    this.cycleIsActive = false
    this.generation = 1
  }

  build (size = this.size, initialValue = 0) {
    let yMax = size[0]
    let xMax = size[1]

    const world = []

    for (let i = 0; i < yMax; i++) {
      let row = []

      for (let j = 0; j < xMax; j++) {
        let cell = {
          y: i,
          x: j,
          value: initialValue
        }

        row.push(cell)
      }

      world.push(row)
    }

    this.world = world
  }

  async startLifeCycle (rate = this.rate) {

    if(this.cycleIsActive) {
      return
    }

    try {
      this.cycleIsActive = true

      while (1) {
        await this.delay(rate)
        await this.iterateWorld()
        this.generation++
      }
    } catch (e) {

    }
  }

  async iterateWorld () {
    let {
      world,
      lifeCount
    } = await this.getNextGeneration()

    this.emit('world-update')

    if (!(lifeCount > 0)) {
      this.emit('world-died')
    }

    this.world = world

    return world
  }

  stopLifeCycle () {
    this.cycleIsActive = false
  }

  randomize (world = this.world) {
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        world[i][j].value = Math.round(Math.random())
      }
    }
  }

  clear (world = this.world) {
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        world[i][j].value = 0
      }
    }
  }

  getNextGeneration (world = this.world) {
    return new Promise(async (resolve, reject) => {
      if (!this.cycleIsActive) {
        reject(Error('Cycle stopped explicitly'))
      }

      let nextWorld = JSON.parse(JSON.stringify(world))
      let lifeCount = 0

      for (let i = 0; i < nextWorld.length; i++) {
        for (let j = 0; j < nextWorld[i].length; j++) {
          let futureCell = this.getFutureCell(i, j)
          nextWorld[i][j] = futureCell

          if (futureCell.value === 1) {
            lifeCount++
          }
        }
      }

      resolve({
        world: nextWorld,
        lifeCount
      })
    })
  }

  delay (delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, delay)
    })
  }

  modifyCells (cellsToChange = []) {
    cellsToChange.map(cell => {
      this.modifyCell(cell)
    })

    this.emit('world-update')
  }

  modifyCell (cell, emitUpdate = false) {
    let { y, x, value } = cell

    this.world[y][x] = {
      y, x, value
    }

    if(emitUpdate) {
      this.emit('world-update')
    }
  }

  getFutureCell (y, x, world = this.world) {
    let count = this.getNeighborCount(y, x, world)

    let value = 0

    if (count === 3 || (count === 2 && world[y][x].value === 1)) {
      value = 1
    }

    return {
      y, x, value
    }
  }

  getNeighborCount (y, x, world = this.world) {
    let up = y - 1
    let down = y + 1
    let left = x - 1
    let right = x + 1

    if (x === 0) left = world[0].length - 1
    if (x === world[0].length - 1) right = 0
    if (y === 0) up = world.length - 1
    if (y === world.length - 1) down = 0

    let neighbors = [world[up][x], world[up][right],
      world[y][right], world[down][right], world[down][x],
      world[down][left], world[y][left], world[up][left]]

    let neighborsCount = 0

    neighbors.map(neighbor => {
      if (neighbor.value === 1) {
        neighborsCount++
      }
    })

    return neighborsCount
  }

  export () {
    return {
      rate: this.rate,
      size: this.size,
      world: this.world,
      generation: this.generation
    }
  }
}

module.exports = World

const EventEmitter = require('events')

class World extends EventEmitter {
  constructor (size = [20, 30], rate = 100) {
    super()
    this.size = size
    this.rate = rate
    this.world = null
    this.cycleIsActive = false
    this.generation = 1
  }

  build (initialValue = 0, size = this.size) {
    const yMax = size[0]
    const xMax = size[1]

    const world = []

    for (let i = 0; i < yMax; i++) {
      const row = []

      for (let j = 0; j < xMax; j++) {
        const cell = {
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
    if (this.cycleIsActive) {
      return
    }

    try {
      this.cycleIsActive = true

      while (1) {
        await this.delay(rate)
        if (!await this.iterateWorld()) {
          break
        }
        this.generation++
      }
    } catch (e) {
      this.cycleIsActive = false
    }
  }

  async iterateWorld () {
    if (!this.cycleIsActive) {
      const action = { type: 'action', message: 'Cycle stopped explicitly' }
      throw action
    }

    const { world, lifeCount } = await this.getNextGeneration()

    this.world = world

    this.emit('world-update')

    if (!(lifeCount > 0)) {
      this.emit('world-died')
    }

    return true
  }

  stopLifeCycle () {
    this.cycleIsActive = false
  }

  async randomize () {
    const world = this.world

    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        world[i][j].value = Math.round(Math.random())
      }
    }

    return true
  }

  async clear () {
    const world = this.world

    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        world[i][j].value = 0
      }
    }

    return true
  }

  async getNextGeneration () {
    const world = this.world
    const nextWorld = JSON.parse(JSON.stringify(world))
    let lifeCount = 0

    for (let i = 0; i < nextWorld.length; i++) {
      for (let j = 0; j < nextWorld[i].length; j++) {
        const futureCell = await this.getFutureCell(i, j)
        nextWorld[i][j] = futureCell

        if (futureCell.value === 1) {
          lifeCount++
        }
      }
    }

    return {
      world: nextWorld,
      lifeCount
    }
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
    try {
      const { y, x, value } = cell

      this.world[y][x] = {
        y, x, value
      }

      if (emitUpdate) {
        this.emit('world-update')
      }

      return this.world[y][x]
    } catch (e) {
      return null
    }
  }

  getCell (y, x) {
    try {
      return this.world[y][x]
    } catch (e) {
      return null
    }
  }

  async getFutureCell (y, x) {
    const world = this.world
    const count = await this.getNeighborCount(y, x, world)
    let value = 0

    if (count === 3 || (count === 2 && world[y][x].value === 1)) {
      value = 1
    }

    return {
      y, x, value
    }
  }

  getNeighborCount (y, x) {
    const world = this.world

    let up = y - 1
    let down = y + 1
    let left = x - 1
    let right = x + 1

    if (x === 0) {
      left = world[0].length - 1
    }
    if (x === world[0].length - 1) {
      right = 0
    }
    if (y === 0) {
      up = world.length - 1
    }
    if (y === world.length - 1) {
      down = 0
    }

    const neighbors = [
      world[up][x],
      world[up][right],
      world[y][right],
      world[down][right],
      world[down][x],
      world[down][left],
      world[y][left],
      world[up][left]
    ]

    return neighbors.reduce((neighborsCount, { value }) =>
      value === 1 ? ++neighborsCount : neighborsCount
    , 0)
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

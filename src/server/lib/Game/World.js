const EventEmitter = require('events')

class World extends EventEmitter {
  constructor (size = [20, 20], rate = 100) {
    super()
    this.size = size
    this.rate = rate
    this.world = null
    this.cycleIsActive = false
    this.generation = 1
  }

  async build (initialValue = 0, size = this.size) {
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

    return true
  }

  async startLifeCycle (rate = this.rate) {
    if (this.cycleIsActive) {
      throw 'Cycle is already started'
    }

    try {
      this.cycleIsActive = true

      while (1) {
        await this.delay(rate)
        await this.iterateWorld()
        this.generation++
      }
    }
    catch (e) {
      this.cycleIsActive = false
      throw e
    }
  }

  async iterateWorld () {
    if (!this.cycleIsActive) {
      throw 'Cycle stopped explicitly'
    }

    let {world, lifeCount} = await this.getNextGeneration()

    this.world = world

    this.emit('world-update')

    if (!(lifeCount > 0)) {
      this.emit('world-died')
    }

    return true
  }

  async stopLifeCycle () {
    this.cycleIsActive = false
    return true
  }

  async randomize () {
    let world = this.world
    let cellChangePromises = []
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        cellChangePromises.push(new Promise((resolve) => {
          resolve(world[i][j].value = Math.round(Math.random()))
        }))
      }
    }

    await Promise.all(cellChangePromises)

    return true
  }

  async clear () {
    let world = this.world
    let cellChangePromises = []
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        cellChangePromises.push(new Promise((resolve) => {
          resolve(world[i][j].value = 0)
        }))
      }
    }

    await Promise.all(cellChangePromises)

    return true
  }

  async getNextGeneration () {
    let world = this.world
    let nextWorld = JSON.parse(JSON.stringify(world))
    let lifeCount = 0

    for (let i = 0; i < nextWorld.length; i++) {
      for (let j = 0; j < nextWorld[i].length; j++) {
        let futureCell = await this.getFutureCell(i, j)
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

  async modifyCells (cellsToChange = []) {
    cellsToChange.map(cell => {
      this.modifyCell(cell).then(() => {})
    })

    this.emit('world-update')

    return true
  }

  async modifyCell (cell, emitUpdate = false) {
    let {y, x, value} = cell

    this.world[y][x] = {
      y, x, value
    }

    if (emitUpdate) {
      this.emit('world-update')
    }

    return this.world[y][x]
  }

  async getFutureCell (y, x) {
    let world = this.world
    let count = await this.getNeighborCount(y, x, world)
    let value = 0

    if (count === 3 || (count === 2 && world[y][x].value === 1)) {
      value = 1
    }

    return {
      y, x, value
    }
  }

  async getNeighborCount (y, x) {
    let world = this.world
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

  async export () {
    return {
      rate: this.rate,
      size: this.size,
      world: this.world,
      generation: this.generation
    }
  }
}

module.exports = World

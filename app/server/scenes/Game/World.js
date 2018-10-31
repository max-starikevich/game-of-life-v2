const EventEmitter = require('events')

class World extends EventEmitter {
  constructor(config = {
    size: [10, 10],
    rate: 250
  }) {
    super()
    this.size = config.size
    this.rate = config.rate
    this.world = null
    this.cycleIsActive = false
    this.generation = 1
  }

  build(size = this.size, initialValue = 0) {

    let yMax = size[0]
    let xMax = size[1]

    const world = []

    for(let i = 0; i < yMax; i++) {
      let row = []

      for(let j = 0; j < xMax; j++) {
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

  async startLifeCycle(rate = this.rate) {

    try {

      console.log('Starting lifecycle')

      this.cycleIsActive = true

      while(1) {
        await this.delay(rate)
        this.world = await this.getNextGeneration()
        this.generation++
        this.printWorld()
      }
    } catch(e) {
      console.log(`Lifecycle is stopped.`)
    }
  }

  printWorld(world = this.world, generation = this.generation, returnString = false) {

    let result = `Generation #${generation} \n`

    for(let i = 0; i < world.length; i++) {
      if(i !== 0) {
        result += '\n'
      }
      for(let j = 0; j < world[i].length; j++) {
        result += world[i][j].value ? '# ': '- '
      }
    }

    if(returnString) {
      return result
    }

    console.log(result)
  }

  stopLifeCycle() {
    this.cycleIsActive = false
  }

  randomizeWorld(world = this.world) {
    for(let i = 0; i < world.length; i++) {
      for(let j = 0; j < world[i].length; j++) {
        world[i][j] = {
          y: i, x: j, value: Math.round(Math.random())
        }
      }
    }
  }

  getNextGeneration() {
    return new Promise(async (resolve, reject) => {

      if(!this.cycleIsActive) {
        reject('Cycle stopped explicitly')
      }

      console.log('Building next generation')

      let world = JSON.parse(JSON.stringify(this.world))

      for(let i = 0; i < world.length; i++) {
        for(let j = 0; j < world[i].length; j++) {
          world[i][j] = this.getFutureCell(i, j)
        }
      }

      resolve(world)
    })
  }

  delay(delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, delay)
    })
  }

  modifyWorld(cellsToChange = []) {
    this.emit('world-change-server', cellsToChange)

    cellsToChange.map(cell => {
      this.modifyCell(cell)
    })
  }

  modifyCell(cell) {
    let { y, x, value } = cell
    this.world[x][y] = value
  }

  getFutureCell(y, x, world = this.world) {
    let count = this.getNeighborCount(y, x, world)

    let value = 0

    if(count === 3 || (count === 2 && world[y][x].value === 1)) {
      value = 1
    }

    return {
      y, x, value
    }
  }

  getNeighborCount(y, x, world = this.world) {
    let up = y-1
    let down = y+1
    let left = x-1
    let right = x+1

    if(x === 0) left = world[0].length-1
    if(x === world[0].length-1) right = 0
    if(y === 0) up = world.length-1
    if(y === world.length-1) down = 0

    let neighbors = [world[up][x], world[up][right],
      world[y][right], world[down][right], world[down][x],
      world[down][left], world[y][left], world[up][left]]

    let neighborsCount = 0

    neighbors.map(neighbor => {
      if(neighbor.value === 1) {
        neighborsCount++
      }
    })

    return neighborsCount;
  }
}

module.exports = World

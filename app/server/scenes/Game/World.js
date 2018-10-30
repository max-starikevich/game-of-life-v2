const EventEmitter = require('events')

class World extends EventEmitter {
  constructor() {
    super()

    this.state = {
      size: [10, 10],
      rate: 100,
      world: []
    }
  }

  build() {
    let x = this.state.size[0]
    let y = this.state.size[1]

    for(let i = 0; i < x; i++) {

      this.state.world[i] = Array(y)

      for(let j = 0; j < y; j++) {
        this.state.world[i][j] = 0
      }
    }
  }

  applyChanges(affectedCells = []) {

    let changed = false

    for(let cell of affectedCells) {
      let { x, y, value } = cell
      this.state.world[x][y] = value

      if(!changed) {
        changed = true
      }
    }

    if(changed) {
      this.emit('world-change-server', affectedCells)
    }
  }
}

module.exports = World

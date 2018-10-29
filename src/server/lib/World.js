class World {
  constructor(size = [10, 10], rate = 100) {

    this.state = {
      size,
      rate
    }

    this.worldField = []
  }

  async buildField() {

    return new Promise(async (resolve) => {
      let x = this.state.size[0]
      let y = this.state.size[1]

      for(let i = 0; i < x; i++) {

        this.worldField[i] = Array(y)

        for(let j = 0; j < y; j++) {
          this.worldField[i][j] = 0
        }
      }

      await this.clearField()

      resolve()
    })
  }

  clearField() {
    return new Promise((resolve) => {
      let x = this.state.size[0]
      let y = this.state.size[1]

      for(let i = 0; i < x; i++) {
        for(let j = 0; j < y; j++) {
          this.worldField[i][j] = this.setCellState(i, j, 0)
        }
      }

      resolve()
    })
  }

  setCellState(x, y, state) {
    if(this.worldField[x][y]) {
      this.worldField[x][y] = state
    }
  }
}

module.exports = World

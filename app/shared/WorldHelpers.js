
class WorldHelpers {

  static printWorld(world, generation, returnString = false) {

    let result = ``

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
}

module.exports = WorldHelpers

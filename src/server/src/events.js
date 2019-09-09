const events = {
  'stop-lifecycle': core => {
    core.stopGame()
  },
  'start-lifecycle': core => {
    core.startGame()
  },
  'randomize-world': core => {
    core.randomizeWorld()
    core.sendWorldToAllClients()
  },
  'clear-world': core => {
    core.clearWorld()
    core.sendWorldToAllClients()
  },
  'world-update-request': (core, data, socket) => {
    core.sendWorldToClient(socket)
  },
  'cells-change': (core, data) => {
    core.registerCellsChange(data)
  }
}

module.exports = events

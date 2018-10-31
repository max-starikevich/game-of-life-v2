import React, { Component } from 'react'
import io from 'socket.io-client'

import { World } from './components/World'
import { Header } from './components/Header'
import { Controls } from './components/Controls'

class Game extends Component {

  constructor() {
    super()

    this.establishConnection()

    this.state = {
      rate: null,
      generation: null,
      size: null,
      world: null,
      clientsCount: null
    }

    this.onStopLifeCycle = this.onStopLifeCycle.bind(this)
    this.onStartLifeCycle = this.onStartLifeCycle.bind(this)
    this.onRandomizeWorld = this.onRandomizeWorld.bind(this)
    this.onCellClick = this.onCellClick.bind(this)
  }

  establishConnection() {
    this.socket = io('http://localhost:3000')

    this.socket.on('world-update', (data) => {
      this.onWorldUpdate(data)
    })

    this.requestWorldUpdate()
  }

  requestWorldUpdate() {
    this.sendToServer('world-update-request')
  }

  sendToServer(eventName, data = null) {
    this.socket.emit(eventName, data)
  }

  render() {

    if(!this.state.world) {
      return (
        <div className="world-not-ready">
          Loading...
        </div>
      )
    }

    return (
      <div className="game">
        <Header generation={this.state.generation}
                rate={this.state.rate}
                size={this.state.size}
                clientsCount={this.state.clientsCount} />

        <World world={this.state.world}
               handleCellClick={this.onCellClick} />

        <Controls stopLifeCycle={this.onStopLifeCycle}
                  startLifeCycle={this.onStartLifeCycle}
                  randomizeWorld={this.onRandomizeWorld} />
      </div>
    )
  }

  onWorldUpdate(data) {
    return new Promise(resolve => {
      let { world, generation, rate, size, clientsCount } = data

      this.setState({
        size,
        rate,
        generation,
        world,
        clientsCount
      })

      document.title = `Generation #${generation}`

      resolve()
    })
  }

  onStopLifeCycle() {
    this.sendToServer('stop-lifecycle')
  }

  onStartLifeCycle() {
    this.sendToServer('start-lifecycle')
  }

  onRandomizeWorld() {
    this.sendToServer('randomize-world')
  }

  onCellClick(y, x) {

    if(!y || !x) {
      return
    }

    let changedCell = this.state.world[y][x]
    changedCell.value = changedCell.value === 1 ? 0 : 1

    this.registerCellsChange([
      changedCell
    ])
  }

  registerCellsChange(cells) {
    this.sendToServer('cells-change', cells)
  }
}

export {
  Game
}

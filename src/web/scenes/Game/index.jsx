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
    this.handleClick = this.handleClick.bind(this)
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

        <div className="world-container" onClick={this.handleClick}>
          <World world={this.state.world} />
        </div>

        <Controls stopLifeCycle={this.onStopLifeCycle}
                  startLifeCycle={this.onStartLifeCycle}
                  randomizeWorld={this.onRandomizeWorld} />
      </div>
    )
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

  registerCellsChange(cells) {
    this.sendToServer('cells-change', cells)
  }

  sendToServer(eventName, data = null) {
    this.socket.emit(eventName, data)
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

  handleClick(e) {

    let data = e.target.dataset

    let { x, y } = data

    if(!x || !y) {
      return
    }

    let changedCell = this.state.world[y][x]
    changedCell.value = changedCell.value === 1 ? 0 : 1

    this.registerCellsChange([
      changedCell
    ])
  }
}

export {
  Game
}

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
      worldText: null
    }

    this.onStopLifeCycle = this.onStopLifeCycle.bind(this)
    this.onStartLifeCycle = this.onStartLifeCycle.bind(this)
    this.onRandomizeWorld = this.onRandomizeWorld.bind(this)
  }

  establishConnection() {
    this.socket = io('http://localhost:3000')

    this.socket.on('new-world-built', (data) => {
      this.onNewWorldBuilt(data)
    })
  }

  render() {
    return (
      <div className="game">
        <Header generation={this.state.generation}
                rate={this.state.rate}
                size={this.state.size} />

        <World world={this.state.world} />

        <Controls stopLifeCycle={this.onStopLifeCycle}
                  startLifeCycle={this.onStartLifeCycle}
                  randomizeWorld={this.onRandomizeWorld}
        />
      </div>
    )
  }

  onNewWorldBuilt(data) {

    let { world, generation, rate, size } = data

    this.setState({
      size,
      rate,
      generation,
      world,
    })

    document.title = `Generation #${generation}`
  }

  onStopLifeCycle() {
    this.sendData('stop-lifecycle')
  }

  onStartLifeCycle() {
    this.sendData('start-lifecycle')
  }

  onRandomizeWorld() {
    this.sendData('randomize-world')
  }

  sendData(eventName, data = null) {
    this.socket.emit(eventName, data)
  }
}

export {
  Game
}

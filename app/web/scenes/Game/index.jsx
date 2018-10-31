import React, { Component } from 'react'
import io from 'socket.io-client'

import { World } from './components/World'
import { Header } from './components/Header'

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
  }

  render() {

    let headerContainer = null
    let gameContainer = null

    if(this.state.world) {
      headerContainer = <Header generation={this.state.generation}
                                rate={this.state.rate}
                                size={this.state.size}/>

      gameContainer = <World world={this.state.world}/>
    }

    return (
      <div className="game">
        { headerContainer }
        { gameContainer }
      </div>
    )
  }

  establishConnection() {
    this.socket = io('http://localhost:3000')

    this.socket.on('next-generation-built', (data) => {
      this.onNextGeneration(data)
    })
  }

  sendData(eventName, data) {
    this.socket.emit(eventName, data)
  }

  onNextGeneration(data) {

    let { world, generation, rate, size } = data

    this.setState({
      size,
      rate,
      generation,
      world,
    })
  }

  onWorldChangedClient(affectedCells) {
    this.sendData('world-change-client', affectedCells)
  }
}

export {
  Game
}

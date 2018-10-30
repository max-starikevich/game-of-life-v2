import React, { Component } from 'react'
import io from 'socket.io-client'

import { World } from 'scenes/Game/World'
import { Header } from 'scenes/Game/Header'

class Game extends Component {

  constructor() {
    super()

    this.establishConnection()

    this.state = {
      rate: 100,
      generations: {
        current: 1
      },
      world: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div className="game-container">
        <div className="header">
          <Header state={this.state} />
        </div>

        <div className="world">
          <World state={this.state} />
        </div>

        <button onClick={this.handleClick}>
          Send test data
        </button>
      </div>
    )
  }

  establishConnection() {
    this.socket = io('http://localhost:3000')

    this.socket.on('world-change-server', (data) => {
      this.onWorldChangedServer(data)
    })
  }

  sendData(eventName, data) {
    this.socket.emit(eventName, data)
  }

  handleClick(e) {
    this.onWorldChangedClient([
      {
        x: 0,
        y: 0,
        value: 0
      },
      {
        x: 1,
        y: 0,
        value: 1
      }
    ])
  }

  onWorldChangedServer(affectedCells) {

  }

  onWorldChangedClient(affectedCells) {
    this.sendData('world-change-client', affectedCells)
  }
}

export {
  Game
}

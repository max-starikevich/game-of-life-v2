import React, { Component } from 'react'
import io from 'socket.io-client'

import { World } from 'scenes/Game/World'
import { Header } from 'scenes/Game/Header'

class Game extends Component {

  constructor() {
    super()

    this.socket = io('http://localhost:3000')

    this.state = {
      rate: 100,
      generations: {
        current: 1
      }
    }

    this.world = []
  }

  render() {
    return (
      <div className="game-container">
        <div className="header">
          <Header state={this.state} />
        </div>

        <div className="world">
          <World world={this.world} state={this.state} />
        </div>
      </div>
    )
  }
}

export {
  Game
}

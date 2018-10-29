import React, { Component } from 'react'
import io from 'socket.io-client'

class Game extends Component {

  constructor() {
    super()
    this.socket = io('http://localhost:3000')
    this.sendWorldState = this.sendWorldState.bind(this)
    this.field = []
  }

  render() {
    return (
      <div className="game-container">
        <button onClick={this.sendWorldState}>
          Send state
        </button>
      </div>
    )
  }

  sendWorldState() {

    console.log(this.socket)

    this.socket.emit('client-cell-change', {
      position: [0, 0],
      value: 1
    })
  }
}

export default Game

import React, { Component } from 'react'
import io from 'socket.io-client'

class Game extends Component {
  render() {
    return (
      <div className="game-container">
        Game container
      </div>
    )
  }

  componentDidMount() {
    const socket = io('http://localhost:3000')

    socket.on('news', function (data) {
      console.log(data)
      socket.emit('my other event', { my: 'data' })
    })

    console.log(socket)
  }
}

export default Game

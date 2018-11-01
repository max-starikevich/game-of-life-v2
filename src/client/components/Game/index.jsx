import React, { Component } from 'react'
import io from 'socket.io-client'

import { World } from './components/World'
import { Header } from './components/Header'
import { Controls } from './components/Controls'

class Game extends Component {
  constructor () {
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
    this.onClearWorld = this.onClearWorld.bind(this)

    this.cellChange = this.cellChange.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  render () {

    if (!this.state.world) {
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
                clientsCount={this.state.clientsCount}/>

        <div className="world-container"
             onMouseDown={this.handleMouseDown}
             onMouseUp={this.handleMouseUp}
             onMouseMove={this.handleMouseMove}
        >
          <World world={this.state.world}/>
        </div>

        <Controls stopLifeCycle={this.onStopLifeCycle}
                  startLifeCycle={this.onStartLifeCycle}
                  randomizeWorld={this.onRandomizeWorld}
                  clearWorld={this.onClearWorld}
        />
      </div>
    )
  }

  establishConnection () {
    this.socket = io('http://localhost:3000')

    this.socket.on('world-update', (data) => {
      this.onWorldUpdate(data)
    })

    this.requestWorldUpdate()
  }

  requestWorldUpdate () {
    this.sendToServer('world-update-request')
  }

  registerCellsChange (cells) {
    this.sendToServer('cells-change', cells)
  }

  sendToServer (eventName, data = null) {
    this.socket.emit(eventName, data)
  }

  onWorldUpdate (data) {
    return new Promise(resolve => {
      let {world, generation, rate, size, clientsCount} = data

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

  onStopLifeCycle () {
    this.sendToServer('stop-lifecycle')
  }

  onStartLifeCycle () {
    this.sendToServer('start-lifecycle')
  }

  onRandomizeWorld () {
    this.sendToServer('randomize-world')
  }

  onClearWorld () {
    this.sendToServer('clear-world')
  }

  cellChange (e, explicitValue = null) {
    try {
      let { x, y, value } = this.getCellData(e.target)

      if (!x || !y) {
        return
      }

      let changedCell = {
        x, y
      }

      if (explicitValue !== null) {
        changedCell.value = explicitValue
      }
      else {
        changedCell.value = value === 1 ? 0 : 1
      }

      this.registerCellsChange([
        changedCell
      ])
    } catch(e) {

    }
  }

  getCellData ($node) {
    let data = $node.dataset
    let {x, y} = data

    if (!x || !y) {
      return null
    }

    return {x, y, value: this.state.world[y][x].value}
  }

  handleMouseMove (e) {
    if (!this.mouseDown) {
      return
    }

    this.cellChange(e, this.paintingValue)
  }

  handleMouseDown (e) {
    try {
      e.preventDefault()

      let cell = this.getCellData(e.target)
      this.paintingValue = cell.value === 1 ? 0 : 1

      this.mouseDown = true
      this.cellChange(e, this.paintingValue)
    } catch(e) {

    }
  }

  handleMouseUp () {
    this.mouseDown = false
  }
}

export {
  Game
}

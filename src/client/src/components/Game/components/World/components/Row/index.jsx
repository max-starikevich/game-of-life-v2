import React, { Component } from 'react'
import { Cell } from './components/Cell'
import './styles.scss'

class Row extends Component {
  render() {
    let cells = this.props.cells.map((cell, index) =>
      <Cell y={cell.y}
            x={cell.x}
            value={cell.value}
            key={index}
      />
    )

    return (
      <div className="row">
        { cells }
      </div>
    )
  }
}

export {
  Row
}


import React, { Component } from 'react'
import { Row } from './components/Row'
import './styles.scss'

class World extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    if(!this.props.world) {
      return null
    }

    let rows = this.props.world.map((row, index) =>
      <Row cells={row}
           key={index}
      />
    )

    return (
      <div className="world-container">
        { rows }
      </div>
    )
  }
}

export {
  World
}


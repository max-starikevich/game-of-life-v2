import React, { Component } from 'react'
import { Row } from './components/Row'
import './styles.scss'

class World extends Component {
  render () {
    if (!this.props.world) {
      return null
    }

    const rows = this.props.world.map((row, index) =>
      <Row cells={row} key={index} />
    )

    return (
      <div className='rows-container'>
        { rows }
      </div>
    )
  }
}

export {
  World
}

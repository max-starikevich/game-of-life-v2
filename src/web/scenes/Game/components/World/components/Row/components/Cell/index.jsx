import React, { Component } from 'react'
import './styles.scss'

class Cell extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ 'cell ' + (this.props.value ? 'alive' : 'dead') }
           data-x={this.props.x}
           data-y={this.props.y}
      />
    )
  }
}

export {
  Cell
}

import React, { Component } from 'react'
import './styles.scss'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.onCellClick = this.onCellClick.bind(this)
  }

  render() {
    return (
      <div className={ 'cell ' + (this.props.value ? 'alive' : 'dead') }
           onClick={this.onCellClick}
           data-x={this.props.x}
           data-y={this.props.y}
      />
    )
  }

  onCellClick(event) {
    let { x, y } = event.target.dataset
    this.props.handleCellClick(y, x)
  }
}

export {
  Cell
}

import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    if(!this.props.generation || !this.props.rate || !this.props.size) {
      return null
    }

    return (
      <div className="game-header">
        Generation { this.props.generation }.
        Rate: { this.props.rate }ms.
        Size: { this.props.size[0] }x{ this.props.size[1] }.
      </div>
    )
  }
}

export {
  Header
}

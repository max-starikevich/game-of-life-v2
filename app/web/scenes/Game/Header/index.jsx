import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="game-header">
        Generation { this.props.state.generations.current }. Rate is { this.props.state.rate }ms
      </div>
    )
  }
}

export {
  Header
}

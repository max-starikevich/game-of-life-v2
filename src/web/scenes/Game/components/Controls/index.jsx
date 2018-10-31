import React, { Component } from 'react'

class Controls extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="world-control">
        <button onClick={this.props.startLifeCycle}>
          Start
        </button>

        <button onClick={this.props.stopLifeCycle}>
          Stop
        </button>

        <button onClick={this.props.randomizeWorld}>
          Randomize
        </button>
      </div>
    )
  }
}

export {
  Controls
}

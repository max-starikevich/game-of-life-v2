import React, { Component } from 'react'

class Controls extends Component {
  render () {
    return (
      <div className='world-control'>
        <button onClick={this.props.startLifeCycle}>
          Start
        </button>

        <button onClick={this.props.stopLifeCycle}>
          Stop
        </button>

        <button onClick={this.props.randomizeWorld}>
          Randomize
        </button>

        <button onClick={this.props.clearWorld}>
          Clear
        </button>
      </div>
    )
  }
}

export {
  Controls
}

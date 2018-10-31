import React, { Component } from 'react'

class World extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="world">
        <pre>
          {this.props.worldText}
        </pre>
      </div>
    )
  }
}

export {
  World
}


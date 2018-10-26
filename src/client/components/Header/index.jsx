import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          <Link to="/">
            Main page
          </Link>

          <Link to="/game">
            Start the game
          </Link>
        </ul>
      </header>
    )
  }
}

export default Header

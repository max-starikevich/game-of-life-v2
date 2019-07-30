import React, { Component } from 'react'

import { Header } from './Layout/Header'
import { Footer } from './Layout/Footer'
import { Game } from './Game'

class App extends Component {
  render () {
    return (
      <div className="app-container">
        <Header/>
        <Game />
        <Footer/>
      </div>
    )
  }
}

export { App }

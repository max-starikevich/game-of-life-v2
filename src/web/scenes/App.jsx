import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Header } from 'scenes/Layout/Header'
import { Footer } from 'scenes/Layout/Footer'
import { Game } from 'scenes/Game'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="app-container">
          <Header/>
          <Route exact path="/" component={Game}/>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export {
  App
}

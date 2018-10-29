import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Game from 'components/Game'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Header/>

          <Route exact path="/" component={Game} />

          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App

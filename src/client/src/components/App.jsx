import React from 'react'

import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Game from './Game/Game'

const App = () => {
  return (
    <div className='app-container'>
      <Header />
      <Game />
      <Footer />
    </div>
  )
}

export default App

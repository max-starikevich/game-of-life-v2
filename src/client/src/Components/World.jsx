import React from 'react'
import Row from 'Components/Row'

import './World.styles.scss'

const World = ({ world }) => {
  if (!world) {
    return null
  }

  return (
    <div className='rows-container'>
      {world.map((row, index) =>
        <Row cells={row} key={index} />
      )}
    </div>
  )
}

export default World

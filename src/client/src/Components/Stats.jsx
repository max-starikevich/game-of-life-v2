import React from 'react'

const Stats = ({ generation, rate, size, clientsCount }) => {
  if (!generation || !rate || !size) {
    return null
  }

  return (
    <div className='game-header'>
      Generation {generation}.
      Rate: {rate}ms.
      Size: {size[0]}x{size[1]}.
      Clients: {clientsCount}
    </div>
  )
}

export default Stats

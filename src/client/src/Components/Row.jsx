import React from 'react'
import Cell from 'Components/Cell'

const Row = ({ cells }) => {
  return (
    <div className='row'>
      {cells.map((cell, index) =>
        <Cell
          y={cell.y}
          x={cell.x}
          value={cell.value}
          key={index}
        />
      )}
    </div>
  )
}

export default Row

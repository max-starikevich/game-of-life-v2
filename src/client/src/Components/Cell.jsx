import React from 'react'

const Cell = ({ value, x, y }) => {
  return (
    <div
      className={'cell ' + (value ? 'alive' : 'dead')}
      data-x={x}
      data-y={y}
    />
  )
}

export default Cell

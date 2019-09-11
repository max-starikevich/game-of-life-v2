import React from 'react'

const Controls = ({
  handleStart,
  handleStop,
  handleRandomize,
  handleClear
}) => {
  return (
    <div className='world-control'>
      <button onClick={handleStart}>
        Start
      </button>

      <button onClick={handleStop}>
        Stop
      </button>

      <button onClick={handleRandomize}>
        Randomize
      </button>

      <button onClick={handleClear}>
        Clear
      </button>
    </div>
  )
}

export default Controls

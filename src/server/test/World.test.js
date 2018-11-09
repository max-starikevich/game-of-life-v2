const assert = require('chai').assert
const World = require('../lib/Game/World')

describe('class World', () => {
  const size = [3, 3]
  const rate = 100
  const initialValue = 1

  let worldManager = new World(size, rate)

  it('World object should have correct structure', () => {
    const example = [
      [
        {
          x: 0, y: 0, value: initialValue
        },
        {
          x: 1, y: 0, value: initialValue
        },
        {
          x: 2, y: 0, value: initialValue
        },
      ],
      [
        {
          x: 0, y: 1, value: initialValue
        },
        {
          x: 1, y: 1, value: initialValue
        },
        {
          x: 2, y: 1, value: initialValue
        },
      ],
      [
        {
          x: 0, y: 2, value: initialValue
        },
        {
          x: 1, y: 2, value: initialValue
        },
        {
          x: 2, y: 2, value: initialValue
        },
      ],
    ]

    worldManager.build(initialValue)

    let {world} = worldManager.export()

    assert.deepEqual(world, example)
  })

  it('Cell should be writable', () => {
    let y = 0
    let x = 0
    let value = 1

    let updatedCell = {
      y, x, value
    }

    worldManager.modifyCell(updatedCell)

    assert.deepEqual(updatedCell, worldManager.getCell(y, x))
  })

  it('Multiple cells should be writable', () => {})
})

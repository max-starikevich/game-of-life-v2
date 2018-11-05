const assert = require('chai').assert
const World = require('../lib/Game/World')

describe('World object', () => {

  const size = [3, 3]
  const rate = 100
  const initialValue = 1

  let worldManager = new World(size, rate)

  it('should have correct structure', async () => {

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

    await worldManager.build(initialValue)

    let {world} = await worldManager.export()

    assert.deepEqual(world, example)
  })
})

/* global describe, expect, it */

const World = require('./world')

describe('World object', () => {
  it('should have correct structure after initial build', () => {
    const size = [3, 3]
    const rate = 100
    const worldManager = new World(size, rate)

    worldManager.build()

    const initialWorld = [
      [
        {
          x: 0, y: 0, value: 1
        },
        {
          x: 1, y: 0, value: 0
        },
        {
          x: 2, y: 0, value: 1
        }
      ],
      [
        {
          x: 0, y: 1, value: 0
        },
        {
          x: 1, y: 1, value: 1
        },
        {
          x: 2, y: 1, value: 0
        }
      ],
      [
        {
          x: 0, y: 2, value: 1
        },
        {
          x: 1, y: 2, value: 1
        },
        {
          x: 2, y: 2, value: 0
        }
      ]
    ]

    worldManager.importWorld(initialWorld)

    const expectedWorld = initialWorld
    const { world } = worldManager.export()

    expect(world).toEqual(expectedWorld)
  })

  it('should properly generate next generations', async () => {
    const size = [5, 5]
    const rate = 100
    const worldManager = new World(size, rate)

    worldManager.build()

    const initialSchema = [
      [0, 0, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 1, 0, 1, 1],
      [0, 0, 1, 1, 1]
    ]

    worldManager.importWorldBySchema(initialSchema)

    const expectedSchema = [
      [1, 1, 0, 0, 1],
      [0, 1, 1, 0, 1],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 1]
    ]

    worldManager.cycleIsActive = true

    const repeatTimes = 4

    new Array(repeatTimes).fill().map(() => {
      worldManager.iterateWorld()
    })

    const resultSchema = worldManager.export().getSchema()

    expect(resultSchema).toEqual(expectedSchema)
  })

  it('should properly work with static figures', async () => {
    const size = [5, 5]
    const rate = 100
    const worldManager = new World(size, rate)

    worldManager.build()
    worldManager.cycleIsActive = true

    const initialSchema = [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    const expectedSchema = initialSchema

    worldManager.importWorldBySchema(initialSchema)

    const repeatTimes = 5

    new Array(repeatTimes).fill().map(() => {
      worldManager.iterateWorld()
      expect(worldManager.export().getSchema()).toEqual(expectedSchema)
    })
  })

  it('should properly work with single-cell modifying', () => {
    const size = [3, 3]
    const rate = 100
    const worldManager = new World(size, rate)

    worldManager.build()

    const y = 0
    const x = 0
    const value = 1

    const updatedCell = {
      y, x, value
    }

    worldManager.modifyCell(updatedCell)

    expect(worldManager.getCell(y, x)).toEqual(updatedCell)
  })

  it('should properly work with multiple-cell modifying', () => {
    const size = [3, 3]
    const rate = 100

    const worldManager = new World(size, rate)

    const cells = [
      {
        y: 0, x: 0, value: 1
      },
      {
        y: 2, x: 0, value: 1
      },
      {
        y: 0, x: 1, value: 1
      },
      {
        y: 1, x: 1, value: 1
      }
    ]

    worldManager.modifyCells(cells)

    const result = cells.reduce((result, expectedCell) => {
      const cell = worldManager.getCell(expectedCell.y, expectedCell.x)
      return !!result || cell === expectedCell
    })

    expect(result).toEqual(true)
  })
})

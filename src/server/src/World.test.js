/* global describe, expect, it */

const World = require('./World')

describe('World', () => {
  it('should have correct structure at the start', () => {
    const size = [3, 3]
    const rate = 100
    const worldManager = new World(size, rate)

    worldManager.build()

    const expectedWorld = [
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

    worldManager.importWorld(expectedWorld)

    const { world } = worldManager.export()

    expect(world).toEqual(expectedWorld)
  })

  it('should properly make next generations', async () => {
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
      [0, 0, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 1, 0, 1, 1],
      [0, 0, 1, 1, 1]
    ]

    worldManager.iterateWorld()
    worldManager.iterateWorld()
    worldManager.iterateWorld()
    worldManager.iterateWorld()

    const resultSchema = worldManager.export().getSchema()

    expect(resultSchema).toEqual(expectedSchema)
  })

  describe('Cell', () => {
    it('should change when 1 cell change requested', () => {
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

      worldManager.modifyCells([
        updatedCell
      ])

      expect(worldManager.getCell(y, x)).toEqual(updatedCell)
    })

    it('should change when multiple cells change requested', () => {
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
})

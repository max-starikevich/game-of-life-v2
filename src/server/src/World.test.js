const World = require('./World')

describe('class World', () => {
  const size = [3, 3]
  const rate = 100
  const initialValue = 1

  const worldManager = new World(size, rate)

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

    const { world } = worldManager.export()

    expect(world).toEqual(example)
  })

  it('Cell should be writable', () => {
    const y = 0
    const x = 0
    const value = 1

    const updatedCell = {
      y, x, value
    }

    worldManager.modifyCell(updatedCell)
    expect(worldManager.getCell(y, x)).toEqual(updatedCell)
  })

  it('Multiple cells should be writable', () => {
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
      },
    ]

    worldManager.modifyCells(cells)

    for (let cell of cells) {
      expect(cell).toEqual(worldManager.getCell(cell.y, cell.x))
    }
  })
})

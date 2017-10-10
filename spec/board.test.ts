import { } from 'jasmine'
import { Board } from '../src/board'

describe('board', () => {
  it('creates a board', () => {
    const board = new Board(4, 4)
    expect(board.spots.length).toEqual(16)
  })

  it('randomizes board', () => {
    const board = new Board(10, 10)
    board.randomize()
    const counts = {
      alive: 0,
      dead: 0,
      dying: 0,
      empty: 0
    }
    board.spots.forEach((spot) => {
      counts[spot.status]++
    })
    expect(counts.empty).not.toEqual(100)
    expect(counts.alive).not.toEqual(0)
  })

  it('gets data for board', () => {
    const board = new Board(2, 2)
    expect(board.data()).toEqual([
      {
        xIndex: 0,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      }, {
        xIndex: 1,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      }, {
        xIndex: 0,
        yIndex: 1,
        color: "rgba(240,248,255, 1)"
      }, {
        xIndex: 1,
        yIndex: 1,
        color: "rgba(240,248,255, 1)"
      }
    ])
  })

  it('gets neighbors', () => {
    let board = new Board(3, 3)
    expect(board.neighbors(0)).toEqual([1, 3, 4])
    expect(board.neighbors(1)).toEqual([0, 2, 3, 4, 5])
    expect(board.neighbors(2)).toEqual([1, 4, 5])

    expect(board.neighbors(3)).toEqual([0, 1, 4, 6, 7])
    expect(board.neighbors(4)).toEqual([0, 1, 2, 3, 5, 6, 7, 8])
    expect(board.neighbors(5)).toEqual([1, 2, 4, 7, 8])

    expect(board.neighbors(6)).toEqual([3, 4, 7])
    expect(board.neighbors(7)).toEqual([3, 4, 5, 6, 8])
    expect(board.neighbors(8)).toEqual([4, 5, 7])

    board = new Board(4, 4)
    //  0  1  2  3
    //  4  5  6  7
    //  8  9 10 11
    // 12 13 14 15
    expect(board.neighbors(8)).toEqual([4, 5, 9, 12, 13])
    expect(board.neighbors(6)).toEqual([1, 2, 3, 5, 7, 9, 10, 11])
  })

  it('gets neighbors wrapped', () => {
    let board = new Board(3, 3)
    board.wrapped = true;
    // 0 1 2
    // 3 4 5
    // 6 7 8
    expect(board.neighbors(0)).toEqual([8, 6, 7, 2, 1, 5, 3, 4])
    expect(board.neighbors(1)).toEqual([6, 7, 8, 0, 2, 3, 4, 5])
    expect(board.neighbors(2)).toEqual([7, 8, 6, 1, 0, 4, 5, 3])

    expect(board.neighbors(3)).toEqual([2, 0, 1, 5, 4, 8, 6, 7])
    expect(board.neighbors(4)).toEqual([0, 1, 2, 3, 5, 6, 7, 8])
    expect(board.neighbors(5)).toEqual([1, 2, 0, 4, 3, 7, 8, 6])

    expect(board.neighbors(6)).toEqual([5, 3, 4, 8, 7, 2, 0, 1])
    expect(board.neighbors(7)).toEqual([3, 4, 5, 6, 8, 0, 1, 2])
    expect(board.neighbors(8)).toEqual([4, 5, 3, 7, 6, 1, 2, 0])
  })

  it('gets alive neighbors', () => {
    let board = new Board(3, 3)
    const spots = board.spots
    spots[0].status = "alive"
    spots[4].status = "alive"
    spots[7].status = "alive"
    // A E E
    // E A E
    // E A E
    expect(board.aliveNeighbors(0)).toEqual(1)
    expect(board.aliveNeighbors(1)).toEqual(2)
    expect(board.aliveNeighbors(2)).toEqual(1)

    expect(board.aliveNeighbors(3)).toEqual(3)
    expect(board.aliveNeighbors(4)).toEqual(2)
    expect(board.aliveNeighbors(5)).toEqual(2)

    expect(board.aliveNeighbors(6)).toEqual(2)
    expect(board.aliveNeighbors(7)).toEqual(1)
    expect(board.aliveNeighbors(8)).toEqual(2)
  })

  it('gets steps', () => {
    let board = new Board(3, 3)
    const spots = board.spots
    spots[0].status = "alive"
    spots[4].status = "alive"
    spots[7].status = "alive"
    // A E E
    // E A E
    // E A E

    expect(board.data()).toEqual([
      {
        xIndex: 0,
        yIndex: 0,
        color: "rgba(255,99,71, 1)"
      },
      {
        xIndex: 1,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 2,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      },

      {
        xIndex: 0,
        yIndex: 1,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 1,
        yIndex: 1,
        color: "rgba(255,99,71, 1)"
      },
      {
        xIndex: 2,
        yIndex: 1,
        color: "rgba(240,248,255, 1)"
      },

      {
        xIndex: 0,
        yIndex: 2,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 1,
        yIndex: 2,
        color: "rgba(255,99,71, 1)"
      },
      {
        xIndex: 2,
        yIndex: 2,
        color: "rgba(240,248,255, 1)"
      },
    ])

    board.takeStep()
    // U E E
    // A A E
    // E U E

    expect(board.data()).toEqual([
      {
        xIndex: 0,
        yIndex: 0,
        color: "rgba(255,105,180, 0.8)"
      },
      {
        xIndex: 1,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 2,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      },

      {
        xIndex: 0,
        yIndex: 1,
        color: "rgba(255,99,71, 1)"
      },
      {
        xIndex: 1,
        yIndex: 1,
        color: "rgba(255,99,71, 1)"
      },
      {
        xIndex: 2,
        yIndex: 1,
        color: "rgba(240,248,255, 1)"
      },

      {
        xIndex: 0,
        yIndex: 2,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 1,
        yIndex: 2,
        color: "rgba(255,105,180, 0.8)"
      },
      {
        xIndex: 2,
        yIndex: 2,
        color: "rgba(240,248,255, 1)"
      },
    ])

    board.takeStep()
    // 

    expect(board.data()).toEqual([
      {
        xIndex: 0,
        yIndex: 0,
        color: "rgba(25,25,112, 0.8)"
      },
      {
        xIndex: 1,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 2,
        yIndex: 0,
        color: "rgba(240,248,255, 1)"
      },

      {
        xIndex: 0,
        yIndex: 1,
        color: "rgba(255,105,180, 0.8)"
      },
      {
        xIndex: 1,
        yIndex: 1,
        color: "rgba(255,105,180, 0.8)"
      },
      {
        xIndex: 2,
        yIndex: 1,
        color: "rgba(240,248,255, 1)"
      },

      {
        xIndex: 0,
        yIndex: 2,
        color: "rgba(240,248,255, 1)"
      },
      {
        xIndex: 1,
        yIndex: 2,
        color: "rgba(25,25,112, 0.8)"
      },
      {
        xIndex: 2,
        yIndex: 2,
        color: "rgba(240,248,255, 1)"
      },
    ])
  })
})

import { } from 'jasmine'
import { Board } from '../src/board'

describe('board', () => {
  it('creates a board', () => {
    const board = new Board(4, 4)
    expect(board.spots.length).toEqual(16)
  })

  it('randomizes board', () => {
    const board = new Board(4, 4)
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
    expect(counts.empty).not.toEqual(16)
    expect(counts.dead).not.toEqual(0)
    expect(counts.dying).not.toEqual(0)
    expect(counts.alive).not.toEqual(0)
  })

  it('gets data for board', () => {
    const board = new Board(2, 2)
    expect(board.data()).toEqual([
      {
        xIndex: 0,
        yIndex: 0,
        color: "aliceblue"
      }, {
        xIndex: 1,
        yIndex: 0,
        color: "aliceblue"
      }, {
        xIndex: 0,
        yIndex: 1,
        color: "aliceblue"
      }, {
        xIndex: 1,
        yIndex: 1,
        color: "aliceblue"
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
})

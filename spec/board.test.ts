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
})

import { } from 'jasmine'
import { Board } from '../src/board'

describe('board', () => {
  it('creates a board', () => {
    const board = new Board(4, 4)
    expect(board.spots.length).toEqual(16)
  })
})

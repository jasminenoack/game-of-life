import { } from 'jasmine'
import { Spot } from '../src/spot'

describe('spot', () => {
    it('exists', () => {
        expect(new Spot()).toBeTruthy()
    })

    it('has an index', () => {
        expect((new Spot()).index).toEqual(0)
        expect((new Spot(6)).index).toEqual(6)
        expect((new Spot(11)).index).toEqual(11)
        expect((new Spot(15)).index).toEqual(15)
    })

    it('can find the x index', () => {
        expect((new Spot()).xIndex(4)).toEqual(0)
        expect((new Spot(6)).xIndex(4)).toEqual(2)
        expect((new Spot(11)).xIndex(4)).toEqual(3)
        expect((new Spot(15)).xIndex(4)).toEqual(3)
    })

    it('can find the y index', () => {
        expect((new Spot()).yIndex(4)).toEqual(0)
        expect((new Spot(6)).yIndex(4)).toEqual(1)
        expect((new Spot(11)).yIndex(4)).toEqual(2)
        expect((new Spot(15)).yIndex(4)).toEqual(3)
    })
})

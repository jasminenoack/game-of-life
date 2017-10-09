import { Spot } from './spot'

export class Board {
    spots: Spot[];

    constructor(public width: number, public height: number) {
        this.spots = []
        for (let i = 0; i < width * height; i++) {
            this.spots.push(new Spot(i))
        }
    }

    public randomize() {
        this.spots.forEach((spot) => {
            spot.randomize()
        })
    }

    public data() {
        const result = []
        this.spots.forEach((spot) => {
            result.push({
                xIndex: spot.xIndex(this.width),
                yIndex: spot.yIndex(this.width),
                color: spot.spotColor()
            })
        })
        return result
    }
}

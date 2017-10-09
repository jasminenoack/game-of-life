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

    public firstColumn(i) {
        return i % this.width == 0
    }

    public firstRow(i) {
        return i < this.width
    }

    public lastRow(i) {
        return i > this.width * this.height - (this.width + 1)
    }

    public lastColumn(i) {
        return (i + 1) % this.width == 0
    }

    public neighbors(i) {
        var firstRow = this.firstRow(i)
        var lastRow = this.lastRow(i)
        var firstColumn = this.firstColumn(i)
        var lastColumn = this.lastColumn(i)

        if (this.spots[i].neighborBlocks) {
            return this.spots[i].neighborBlocks
        }

        var neighborBlocks = []
        if (!firstRow && !firstColumn) {
            neighborBlocks.push(i - this.width - 1)
        }
        if (!firstRow) {
            neighborBlocks.push(i - this.width)
        }
        if (!firstRow && !lastColumn) {
            neighborBlocks.push(i - this.width + 1)
        }
        if (!firstColumn) {
            neighborBlocks.push(i - 1)
        }
        if (!lastColumn) {
            neighborBlocks.push(i + 1)
        }
        if (!lastRow && !firstColumn) {
            neighborBlocks.push(i + this.width - 1)
        }
        if (!lastRow) {
            neighborBlocks.push(i + this.width)
        }
        if (!lastRow && !lastColumn) {
            neighborBlocks.push(i + this.width + 1)
        }
        this.spots[i].neighborBlocks = neighborBlocks
        return this.spots[i].neighborBlocks
    }
}

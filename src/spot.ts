export class Spot {
    constructor(public index = 0) { }

    public xIndex(width: number) {
        return this.index % width
    }

    public yIndex(width: number) {
        return Math.floor(this.index / width)
    }
}
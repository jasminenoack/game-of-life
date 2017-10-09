type status = "empty" | "dead" | "dying" | "alive"

const statusMapping = {
    empty: "aliceblue",
    dead: "midnightblue",
    dying: "maroon",
    alive: "tomato"
}

const statuses = Object.keys(statusMapping)

export class Spot {
    public neighborBlocks: number[]

    constructor(public index = 0, public status = "empty") { }

    public xIndex(width: number) {
        return this.index % width
    }

    public yIndex(width: number) {
        return Math.floor(this.index / width)
    }

    public randomize() {
        this.status = statuses[Math.floor(Math.random() * statuses.length)]
    }

    public spotColor() {
        return statusMapping[this.status]
    }
}
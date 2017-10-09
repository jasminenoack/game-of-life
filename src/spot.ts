type status = "empty" | "dead" | "dyingover" | "dyingunder" | "alive"

const statusMapping = {
    empty: "rgba(240,248,255, 1)",
    dead: "rgba(25,25,112, 0.2)",
    dyingover: " rgba(128,0,0,0.2)",
    alive: "rgba(255,99,71, 1)",
    dyingunder: "rgba(255,105,180, 0.2)"
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
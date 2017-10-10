type status = "empty" | "dead" | "dying" | "dying" | "alive"

const statusMapping = {
    empty: "rgba(106,90,205, 0.8)",
    dead: "rgba(25,25,112, 0.8)",
    alive: "rgba(255,99,71, 1)",
    dying: "rgba(255,105,180, 0.8)"
}

const statuses = Object.keys(statusMapping)

export class Spot {
    constructor(public index = 0, public status = "empty") { }

    public xIndex(width: number) {
        return this.index % width
    }

    public yIndex(width: number) {
        return Math.floor(this.index / width)
    }

    public randomize() {
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)] === "alive" ? "alive" : "empty"
        this.status = newStatus
    }

    public spotColor() {
        return statusMapping[this.status]
    }
}
import { Spot } from './spot'

export class Board {
    spots: Spot[];
    wrapped: boolean = false;

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

        // 0 1 2 
        // 3 4 5
        // 6 7 8

        var neighborBlocks = []
        // find the left top
        if (!firstRow && !firstColumn) {
            neighborBlocks.push(i - this.width - 1)
        } else if (this.wrapped) {
            if (firstRow && firstColumn) {
                neighborBlocks.push(this.height * this.width - 1)
            } else if (firstRow) {
                neighborBlocks.push(this.height * this.width - this.width + i - 1)
            } else if (firstColumn) {
                neighborBlocks.push(i - 1)
            }
        }

        // find top middle 
        if (!firstRow) {
            neighborBlocks.push(i - this.width)
        } else if (this.wrapped) {
            neighborBlocks.push(this.height * this.width - this.width + i)
        }

        // find top right 
        if (!firstRow && !lastColumn) {
            neighborBlocks.push(i - this.width + 1)
        } else if (this.wrapped) {
            if (firstRow && lastColumn) {
                neighborBlocks.push(this.height * this.width - this.width)
            } else if (firstRow) {
                neighborBlocks.push(this.height * this.width - this.width + i + 1)
            } else if (lastColumn) {
                neighborBlocks.push(i + 1 - this.width * 2)
            }
        }

        // find left
        if (!firstColumn) {
            neighborBlocks.push(i - 1)
        } else if (this.wrapped) {
            neighborBlocks.push(i - 1 + this.width)
        }

        // find right
        if (!lastColumn) {
            neighborBlocks.push(i + 1)
        } else if (this.wrapped) {
            neighborBlocks.push(i + 1 - this.width)
        }

        // find bottom left
        if (!lastRow && !firstColumn) {
            neighborBlocks.push(i + this.width - 1)
        } else if (this.wrapped) {
            if (lastRow && firstColumn) {
                neighborBlocks.push(this.width - 1)
            } else if (lastRow) {
                neighborBlocks.push((i % this.width) - 1)
            } else if (firstColumn) {
                neighborBlocks.push(i - 1 + this.width * 2)
            }
        }

        // find bottom middle
        if (!lastRow) {
            neighborBlocks.push(i + this.width)
        } else if (this.wrapped) {
            neighborBlocks.push(i % this.width)
        }

        // find bottom right
        if (!lastRow && !lastColumn) {
            neighborBlocks.push(i + this.width + 1)
        } else if (this.wrapped) {
            if (lastRow && lastColumn) {
                neighborBlocks.push(0)
            } else if (lastRow) {
                neighborBlocks.push((i % this.width) + 1)
            } else if (lastColumn) {
                neighborBlocks.push(i + 1)
            }
        }
        this.spots[i].neighborBlocks = neighborBlocks
        return this.spots[i].neighborBlocks
    }

    public aliveNeighbors(i) {
        const neighbors = this.neighbors(i)
        let result = 0
        neighbors.forEach((neighbor) => {
            if (this.spots[neighbor].status === "alive") {
                result++
            }
        })
        return result
    }

    public takeStep() {
        const results = []
        this.spots.forEach((spot, index) => {
            const neighborCount = this.aliveNeighbors(index)
            if (neighborCount < 2 && spot.status === "alive") {
                results.push("dyingunder")
            } else if (neighborCount > 3 && spot.status === "alive") {
                results.push("dyingover")
            } else if ((spot.status === "alive" && neighborCount === 2) || neighborCount === 3) {
                results.push("alive")
            } else if (spot.status.indexOf("dying") !== -1) {
                results.push("dead")
            } else {
                results.push(spot.status)
            }
        })
        results.forEach((result, index) => {
            this.spots[index].status = result
        })
    }

    public generatePattern(pattern) {
        this.spots.forEach((spot) => {
            spot.status = "empty"
        })

        const height = Math.min(pattern.length, this.height)
        const width = Math.min(pattern[0].length, this.width)

        const widthStart = Math.floor((this.width / 2) - (width / 2))
        const heightStart = Math.floor((this.height / 2) - (height / 2))

        for (let j = 0; j < height; j++) {
            const row = heightStart + j;
            for (let i = 0; i < width; i++) {
                const column = widthStart + i
                const index = row * this.width + column
                this.spots[index].status = pattern[j][i]
            }
        }
    }

    public getPattern() {
        const spots = this.spots
        const height = this.height
        const width = this.width
        const results = []
        for (let i = 0; i < height; i++) {
            const current = []
            results.push(current)
            for (let j = 0; j < width; j++) {
                const index = i * width + j;
                current.push(spots[index].status)
            }
        }
        return results
    }
}

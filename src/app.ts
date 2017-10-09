import { Board } from './board'

declare const d3: any;

const squareSize = 5;

// let windowWidth = window.innerWidth - 500
// windowWidth -= windowWidth % squareSize
// const width = windowWidth / squareSize

// let windowHeight = window.innerHeight - 200
// windowHeight -= windowHeight % squareSize
// const height = windowHeight / squareSize

const height = 120
const width = 120

const board = new Board(width, height)

function drawBoard() {
    const data = board.data()
    const boardEl = d3.select("#board")
    boardEl.attr("height", height * squareSize)
    boardEl.attr("width", width * squareSize)

    let rects = boardEl.selectAll('rect').data(data)

    if (!rects.size()) {
        rects = rects.enter().append("rect")
    }
    rects.attr("x", (d) => d.xIndex * squareSize)
        .attr("y", (d) => d.yIndex * squareSize)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("rx", squareSize / 2)
        .attr("ry", squareSize / 2)
        .attr("fill", (d) => d.color)
}
drawBoard()

const randomButton = document.getElementById("random")
randomButton.addEventListener("click", () => {
    board.randomize()
    drawBoard()
})

const stepButton = document.getElementById("step")
stepButton.addEventListener("click", () => {
    board.takeStep()
    drawBoard()
})

const autoButton = document.getElementById("auto")
let autoInterval
autoButton.addEventListener("click", () => {
    if (autoInterval) {
        clearInterval(autoInterval)
        autoInterval = null
    } else {
        autoInterval = setInterval(() => {
            board.takeStep()
            drawBoard()
        }, 500)
    }
})

const selectPattern = document.getElementById("pattern")
const generateButton = document.getElementById("generate")
generateButton.addEventListener("click", () => {
    board.generatePattern(patterns[(selectPattern as any).value])
    drawBoard()
})

const patterns = {
    block: [
        ["alive", "alive"],
        ["alive", "alive"]
    ],
    beehive: [
        ["empty", "alive", "alive", "empty"],
        ["alive", "empty", "empty", "alive"],
        ["empty", "alive", "alive", "empty"]
    ],
    loaf: [
        ["empty", "alive", "alive", "empty"],
        ["alive", "empty", "empty", "alive"],
        ["empty", "alive", "empty", "alive"],
        ["empty", "empty", "alive", "empty"]
    ],
    boat: [
        ["alive", "alive", "empty"],
        ["alive", "empty", "alive"],
        ["empty", "alive", "empty"]
    ],
    tub: [
        ["empty", "alive", "empty"],
        ["alive", "empty", "alive"],
        ["empty", "alive", "empty"]
    ],

    blinker: [
        ["alive", "alive", "alive"]
    ],
    toad: [
        ["empty", "alive", "alive", "alive"],
        ["alive", "alive", "alive", "empty"]
    ],
    beacon: [
        ["alive", "alive", "empty", "empty"],
        ["alive", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "alive"],
        ["empty", "empty", "alive", "alive"]
    ],
    pulsar: [
        ["empty", "empty", "alive", "alive", "empty", "empty", "empty", "empty", "empty", "alive", "alive", "empty", "empty"],
        ["empty", "empty", "empty", "alive", "alive", "empty", "empty", "empty", "alive", "alive", "empty", "empty", "empty"],
        ["alive", "empty", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "empty", "alive"],
        ["alive", "alive", "alive", "empty", "alive", "alive", "empty", "alive", "alive", "empty", "alive", "alive", "alive"],
        ["empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty"],
        ["empty", "empty", "alive", "alive", "alive", "empty", "empty", "empty", "alive", "alive", "alive", "empty", "empty"],

        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],

        ["empty", "empty", "alive", "alive", "alive", "empty", "empty", "empty", "alive", "alive", "alive", "empty", "empty"],
        ["empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty"],
        ["alive", "alive", "alive", "empty", "alive", "alive", "empty", "alive", "alive", "empty", "alive", "alive", "alive"],
        ["alive", "empty", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "alive", "empty", "empty", "alive"],
        ["empty", "empty", "empty", "alive", "alive", "empty", "empty", "empty", "alive", "alive", "empty", "empty", "empty"],
        ["empty", "empty", "alive", "alive", "empty", "empty", "empty", "empty", "empty", "alive", "alive", "empty", "empty"],
    ],
    pentadecathlon: [
        ["alive", "alive", "alive"],
        ["empty", "alive", "empty"],
        ["empty", "alive", "empty"],
        ["alive", "alive", "alive"],

        ["empty", "empty", "empty"],

        ["alive", "alive", "alive"],
        ["alive", "alive", "alive"],

        ["empty", "empty", "empty"],

        ["alive", "alive", "alive"],
        ["empty", "alive", "empty"],
        ["empty", "alive", "empty"],
        ["alive", "alive", "alive"],
    ],

    glider: [
        ["empty", "alive", "empty"],
        ["empty", "empty", "alive"],
        ["alive", "alive", "alive"],
    ],
    lightweightSpaceship: [
        ["alive", "empty", "empty", "alive", "empty"],
        ["empty", "empty", "empty", "empty", "alive"],
        ["alive", "empty", "empty", "empty", "alive"],
        ["empty", "alive", "alive", "alive", "alive"]
    ],
    rPentomino: [
        ["empty", "alive", "alive"],
        ["alive", "alive", "empty"],
        ["empty", "alive", "empty"]
    ],
    diehard: [
        ["empty", "empty", "empty", "empty", "empty", "empty", "alive", "empty"],
        ["alive", "alive", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "alive", "empty", "empty", "empty", "alive", "alive", "alive"]
    ],
    acorn: [
        ["empty", "alive", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "alive", "empty", "empty", "empty"],
        ["alive", "alive", "empty", "empty", "alive", "alive", "alive"]
    ]
}
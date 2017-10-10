import { Board } from './board'
import { patterns } from './patterns'

declare const d3: any;

let sideLengthEl, sideLength, squareSize, height, width, board;
const boardEl = d3.select("#board")

setUpSizes()

function drawBoard() {
    const data = board.data()

    boardEl.selectAll('rect').data(data).enter().append("rect")
    boardEl.selectAll('rect').data(data).exit().remove()

    const rects = boardEl.selectAll('rect').data(data)
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


function setUpSizes() {
    let pattern
    if (board) {
        pattern = board.getPattern()
    }
    let windowWidth = window.innerWidth - 200
    let windowHeight = window.innerHeight - 200
    sideLengthEl = document.getElementById("size");
    sideLength = parseInt(sideLengthEl.value);

    squareSize = Math.floor(Math.min(windowWidth, windowHeight) / sideLength)
    height = sideLength;
    width = sideLength;

    board = new Board(width, height)

    boardEl.attr("height", height * squareSize)
    boardEl.attr("width", width * squareSize)
    if (pattern) {
        board.generatePattern(pattern)
    }
}


const resizeButton = document.getElementById("resize")
resizeButton.addEventListener("click", () => {
    setUpSizes()
    drawBoard()
})

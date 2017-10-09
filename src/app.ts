import { Board } from './board'

declare const d3: any;

const squareSize = 30;

let windowWidth = window.innerWidth - 500
windowWidth -= windowWidth % squareSize
// const width = windowWidth / squareSize

let windowHeight = window.innerHeight - 200
windowHeight -= windowHeight % squareSize
// const height = windowHeight / squareSize

const height = 10
const width = 10


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
    console.log("step")
})
import { Board } from './board'

declare const d3: any;

const squareSize = 15;

let windowWidth = window.innerWidth - 500
windowWidth -= windowWidth % squareSize
const width = windowWidth / squareSize

let windowHeight = window.innerHeight - 100
windowHeight -= windowHeight % squareSize
const height = windowHeight / squareSize

console.log(width, height)

const board = new Board(width, height)
const spots = board.spots


const boardEl = d3.select("#board")
boardEl.attr("height", height * squareSize)
boardEl.attr("width", width * squareSize)
const rects = boardEl.selectAll('rect')
    .data(spots)
    .enter().append("rect")
    .attr("x", (d) => d.xIndex(width) * squareSize)
    .attr("y", (d) => d.yIndex(width) * squareSize)
    .attr("width", squareSize)
    .attr("height", squareSize)
    .attr("rx", squareSize / 2)
    .attr("ry", squareSize / 2)

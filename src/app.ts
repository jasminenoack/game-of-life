declare const d3: any;

const testData = [
    {},
    {},
    {},
    {},

    {},
    {},
    {},
    {},

    {},
    {},
    {},
    {},

    {},
    {},
    {},
    {},
]

const board = d3.select("#board")
board.attr("height", 10 * 4)
board.attr("width", 10 * 4)
const rects = board.selectAll('rect')
    .data(testData)
    .enter().append("rect")
    .attr("x", (d, i) => i % 4 * 10)
    .attr("y", (d, i) => Math.floor(i / 4) * 10)
    .attr("width", 10)
    .attr("height", 10)
    .attr("rx", 5)
    .attr("ry", 5)

console.log(board)


    // < rect x= "10" y= "10" width= "100" height= "100" />
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = __webpack_require__(1);
var squareSize = 30;
var windowWidth = window.innerWidth - 500;
windowWidth -= windowWidth % squareSize;
// const width = windowWidth / squareSize
var windowHeight = window.innerHeight - 200;
windowHeight -= windowHeight % squareSize;
// const height = windowHeight / squareSize
var height = 10;
var width = 10;
var board = new board_1.Board(width, height);
function drawBoard() {
    var data = board.data();
    var boardEl = d3.select("#board");
    boardEl.attr("height", height * squareSize);
    boardEl.attr("width", width * squareSize);
    var rects = boardEl.selectAll('rect');
    rects.data(data)
        .enter().append("rect")
        .attr("x", function (d) { return d.xIndex * squareSize; })
        .attr("y", function (d) { return d.yIndex * squareSize; })
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("rx", squareSize / 2)
        .attr("ry", squareSize / 2)
        .attr("fill", function (d) { return d.color; });
    rects.exit().remove();
}
drawBoard();
var randomButton = document.getElementById("random");
randomButton.addEventListener("click", function () {
    board.randomize();
    console.log(board);
    drawBoard();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spot_1 = __webpack_require__(2);
var Board = /** @class */ (function () {
    function Board(width, height) {
        this.width = width;
        this.height = height;
        this.spots = [];
        for (var i = 0; i < width * height; i++) {
            this.spots.push(new spot_1.Spot(i));
        }
    }
    Board.prototype.randomize = function () {
        this.spots.forEach(function (spot) {
            spot.randomize();
        });
    };
    Board.prototype.data = function () {
        var _this = this;
        var result = [];
        this.spots.forEach(function (spot) {
            result.push({
                xIndex: spot.xIndex(_this.width),
                yIndex: spot.yIndex(_this.width),
                color: spot.spotColor()
            });
        });
        return result;
    };
    return Board;
}());
exports.Board = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var statusMapping = {
    empty: "aliceblue",
    dead: "midnightblue",
    dying: "maroon",
    alive: "tomato"
};
var statuses = Object.keys(statusMapping);
var Spot = /** @class */ (function () {
    function Spot(index, status) {
        if (index === void 0) { index = 0; }
        if (status === void 0) { status = "empty"; }
        this.index = index;
        this.status = status;
    }
    Spot.prototype.xIndex = function (width) {
        return this.index % width;
    };
    Spot.prototype.yIndex = function (width) {
        return Math.floor(this.index / width);
    };
    Spot.prototype.randomize = function () {
        this.status = statuses[Math.floor(Math.random() * statuses.length)];
    };
    Spot.prototype.spotColor = function () {
        return statusMapping[this.status];
    };
    return Spot;
}());
exports.Spot = Spot;


/***/ })
/******/ ]);
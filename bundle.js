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
var squareSize = 50;
var windowWidth = window.innerWidth - 500;
windowWidth -= windowWidth % squareSize;
// const width = windowWidth / squareSize
var windowHeight = window.innerHeight - 200;
windowHeight -= windowHeight % squareSize;
// const height = windowHeight / squareSize
var height = 3;
var width = 3;
var board = new board_1.Board(width, height);
function drawBoard() {
    var data = board.data();
    var boardEl = d3.select("#board");
    boardEl.attr("height", height * squareSize);
    boardEl.attr("width", width * squareSize);
    var rects = boardEl.selectAll('rect').data(data);
    if (!rects.size()) {
        rects = rects.enter().append("rect");
    }
    rects.attr("x", function (d) { return d.xIndex * squareSize; })
        .attr("y", function (d) { return d.yIndex * squareSize; })
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("rx", squareSize / 2)
        .attr("ry", squareSize / 2)
        .attr("fill", function (d) { return d.color; });
}
drawBoard();
var randomButton = document.getElementById("random");
randomButton.addEventListener("click", function () {
    board.randomize();
    drawBoard();
});
var stepButton = document.getElementById("step");
stepButton.addEventListener("click", function () {
    board.takeStep();
    drawBoard();
});
var autoButton = document.getElementById("auto");
var autoInterval;
autoButton.addEventListener("click", function () {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
    else {
        autoInterval = setInterval(function () {
            board.takeStep();
            drawBoard();
        }, 250);
    }
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
    Board.prototype.firstColumn = function (i) {
        return i % this.width == 0;
    };
    Board.prototype.firstRow = function (i) {
        return i < this.width;
    };
    Board.prototype.lastRow = function (i) {
        return i > this.width * this.height - (this.width + 1);
    };
    Board.prototype.lastColumn = function (i) {
        return (i + 1) % this.width == 0;
    };
    Board.prototype.neighbors = function (i) {
        var firstRow = this.firstRow(i);
        var lastRow = this.lastRow(i);
        var firstColumn = this.firstColumn(i);
        var lastColumn = this.lastColumn(i);
        if (this.spots[i].neighborBlocks) {
            return this.spots[i].neighborBlocks;
        }
        var neighborBlocks = [];
        if (!firstRow && !firstColumn) {
            neighborBlocks.push(i - this.width - 1);
        }
        if (!firstRow) {
            neighborBlocks.push(i - this.width);
        }
        if (!firstRow && !lastColumn) {
            neighborBlocks.push(i - this.width + 1);
        }
        if (!firstColumn) {
            neighborBlocks.push(i - 1);
        }
        if (!lastColumn) {
            neighborBlocks.push(i + 1);
        }
        if (!lastRow && !firstColumn) {
            neighborBlocks.push(i + this.width - 1);
        }
        if (!lastRow) {
            neighborBlocks.push(i + this.width);
        }
        if (!lastRow && !lastColumn) {
            neighborBlocks.push(i + this.width + 1);
        }
        this.spots[i].neighborBlocks = neighborBlocks;
        return this.spots[i].neighborBlocks;
    };
    Board.prototype.aliveNeighbors = function (i) {
        var _this = this;
        var neighbors = this.neighbors(i);
        var result = 0;
        neighbors.forEach(function (neighbor) {
            if (_this.spots[neighbor].status === "alive") {
                result++;
            }
        });
        return result;
    };
    Board.prototype.takeStep = function () {
        var _this = this;
        var results = [];
        this.spots.forEach(function (spot, index) {
            var neighborCount = _this.aliveNeighbors(index);
            if (neighborCount < 2 && spot.status === "alive") {
                results.push("dyingunder");
            }
            else if (neighborCount > 3 && spot.status === "alive") {
                results.push("dyingover");
            }
            else if (neighborCount === 2 || neighborCount === 3) {
                results.push("alive");
            }
            else if (spot.status.indexOf("dying") !== -1) {
                results.push("dead");
            }
            else {
                results.push(spot.status);
            }
        });
        results.forEach(function (result, index) {
            _this.spots[index].status = result;
        });
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
    dyingover: "maroon",
    alive: "tomato",
    dyingunder: "mistyrose"
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
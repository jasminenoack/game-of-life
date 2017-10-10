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
var patterns_1 = __webpack_require__(3);
var sideLengthEl, sideLength, squareSize, height, width, board;
var boardEl = d3.select("#board");
setUpSizes();
function drawBoard() {
    var data = board.data();
    boardEl.selectAll('rect').data(data).enter().append("rect");
    boardEl.selectAll('rect').data(data).exit().remove();
    var rects = boardEl.selectAll('rect').data(data);
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
        }, 500);
    }
});
var selectPattern = document.getElementById("pattern");
var generateButton = document.getElementById("generate");
generateButton.addEventListener("click", function () {
    board.generatePattern(patterns_1.patterns[selectPattern.value]);
    drawBoard();
});
function setUpSizes() {
    var pattern;
    if (board) {
        pattern = board.getPattern();
    }
    var windowWidth = window.innerWidth - 200;
    var windowHeight = window.innerHeight - 200;
    sideLengthEl = document.getElementById("size");
    sideLength = parseInt(sideLengthEl.value);
    squareSize = Math.floor(Math.min(windowWidth, windowHeight) / sideLength);
    height = sideLength;
    width = sideLength;
    board = new board_1.Board(width, height);
    boardEl.attr("height", height * squareSize);
    boardEl.attr("width", width * squareSize);
    if (pattern) {
        board.generatePattern(pattern);
    }
}
var resizeButton = document.getElementById("resize");
resizeButton.addEventListener("click", function () {
    setUpSizes();
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
        this.wrapped = false;
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
        // 0 1 2 
        // 3 4 5
        // 6 7 8
        var neighborBlocks = [];
        // find the left top
        if (!firstRow && !firstColumn) {
            neighborBlocks.push(i - this.width - 1);
        }
        else if (this.wrapped) {
            if (firstRow && firstColumn) {
                neighborBlocks.push(this.height * this.width - 1);
            }
            else if (firstRow) {
                neighborBlocks.push(this.height * this.width - this.width + i - 1);
            }
            else if (firstColumn) {
                neighborBlocks.push(i - 1);
            }
        }
        // find top middle 
        if (!firstRow) {
            neighborBlocks.push(i - this.width);
        }
        else if (this.wrapped) {
            neighborBlocks.push(this.height * this.width - this.width + i);
        }
        // find top right 
        if (!firstRow && !lastColumn) {
            neighborBlocks.push(i - this.width + 1);
        }
        else if (this.wrapped) {
            if (firstRow && lastColumn) {
                neighborBlocks.push(this.height * this.width - this.width);
            }
            else if (firstRow) {
                neighborBlocks.push(this.height * this.width - this.width + i + 1);
            }
            else if (lastColumn) {
                neighborBlocks.push(i + 1 - this.width * 2);
            }
        }
        // find left
        if (!firstColumn) {
            neighborBlocks.push(i - 1);
        }
        else if (this.wrapped) {
            neighborBlocks.push(i - 1 + this.width);
        }
        // find right
        if (!lastColumn) {
            neighborBlocks.push(i + 1);
        }
        else if (this.wrapped) {
            neighborBlocks.push(i + 1 - this.width);
        }
        // find bottom left
        if (!lastRow && !firstColumn) {
            neighborBlocks.push(i + this.width - 1);
        }
        else if (this.wrapped) {
            if (lastRow && firstColumn) {
                neighborBlocks.push(this.width - 1);
            }
            else if (lastRow) {
                neighborBlocks.push((i % this.width) - 1);
            }
            else if (firstColumn) {
                neighborBlocks.push(i - 1 + this.width * 2);
            }
        }
        // find bottom middle
        if (!lastRow) {
            neighborBlocks.push(i + this.width);
        }
        else if (this.wrapped) {
            neighborBlocks.push(i % this.width);
        }
        // find bottom right
        if (!lastRow && !lastColumn) {
            neighborBlocks.push(i + this.width + 1);
        }
        else if (this.wrapped) {
            if (lastRow && lastColumn) {
                neighborBlocks.push(0);
            }
            else if (lastRow) {
                neighborBlocks.push((i % this.width) + 1);
            }
            else if (lastColumn) {
                neighborBlocks.push(i + 1);
            }
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
            else if ((spot.status === "alive" && neighborCount === 2) || neighborCount === 3) {
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
    Board.prototype.generatePattern = function (pattern) {
        this.spots.forEach(function (spot) {
            spot.status = "empty";
        });
        var height = Math.min(pattern.length, this.height);
        var width = Math.min(pattern[0].length, this.width);
        var widthStart = Math.floor((this.width / 2) - (width / 2));
        var heightStart = Math.floor((this.height / 2) - (height / 2));
        for (var j = 0; j < height; j++) {
            var row = heightStart + j;
            for (var i = 0; i < width; i++) {
                var column = widthStart + i;
                var index = row * this.width + column;
                this.spots[index].status = pattern[j][i];
            }
        }
    };
    Board.prototype.getPattern = function () {
        var spots = this.spots;
        var height = this.height;
        var width = this.width;
        var results = [];
        for (var i = 0; i < height; i++) {
            var current = [];
            results.push(current);
            for (var j = 0; j < width; j++) {
                var index = i * width + j;
                current.push(spots[index].status);
            }
        }
        return results;
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
    empty: "rgba(240,248,255, 1)",
    dead: "rgba(25,25,112, 0.8)",
    dyingover: "rgba(128,0,0,0.8)",
    alive: "rgba(255,99,71, 1)",
    dyingunder: "rgba(255,105,180, 0.8)"
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
        var newStatus = statuses[Math.floor(Math.random() * statuses.length)] === "alive" ? "alive" : "empty";
        this.status = newStatus;
    };
    Spot.prototype.spotColor = function () {
        return statusMapping[this.status];
    };
    return Spot;
}());
exports.Spot = Spot;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.patterns = {
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
};


/***/ })
/******/ ]);
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
var squareSize = 15;
var windowWidth = window.innerWidth - 500;
windowWidth -= windowWidth % squareSize;
var width = windowWidth / squareSize;
var windowHeight = window.innerHeight - 100;
windowHeight -= windowHeight % squareSize;
var height = windowHeight / squareSize;
console.log(width, height);
var board = new board_1.Board(width, height);
var spots = board.spots;
var boardEl = d3.select("#board");
boardEl.attr("height", height * squareSize);
boardEl.attr("width", width * squareSize);
var rects = boardEl.selectAll('rect')
    .data(spots)
    .enter().append("rect")
    .attr("x", function (d) { return d.xIndex(width) * squareSize; })
    .attr("y", function (d) { return d.yIndex(width) * squareSize; })
    .attr("width", squareSize)
    .attr("height", squareSize)
    .attr("rx", squareSize / 2)
    .attr("ry", squareSize / 2);


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
    return Board;
}());
exports.Board = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Spot = /** @class */ (function () {
    function Spot(index) {
        if (index === void 0) { index = 0; }
        this.index = index;
    }
    Spot.prototype.xIndex = function (width) {
        return this.index % width;
    };
    Spot.prototype.yIndex = function (width) {
        return Math.floor(this.index / width);
    };
    return Spot;
}());
exports.Spot = Spot;


/***/ })
/******/ ]);
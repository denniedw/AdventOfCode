"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var XmasFinderOne = function () {
    var twoDimArray = createTwoDimArray(GetData());
    var totalXmasFound = 0;
    twoDimArray.forEach(function (element) {
        totalXmasFound += checkLeftToRightXmas(twoDimArray, element);
        totalXmasFound += checkRightToLeftXmas(twoDimArray, element);
        totalXmasFound += checkTopToBottomXmas(twoDimArray, element);
        totalXmasFound += checkBottomToTopXmas(twoDimArray, element);
        totalXmasFound += checkLeftTopToRightBottomXmas(twoDimArray, element);
        totalXmasFound += checkRightTopToLeftBottomXmas(twoDimArray, element);
        totalXmasFound += checkLeftBottomToRightTopXmas(twoDimArray, element);
        totalXmasFound += checkRightBottomToLeftTopXmas(twoDimArray, element);
    });
    console.log(totalXmasFound);
};
var XmasFinderTwo = function () {
    var twoDimArray = createTwoDimArray(GetData());
    var totalXmasFound = 0;
    twoDimArray.forEach(function (element) {
        var firstCheck = checkLeftTopToRightBottomMas(twoDimArray, element);
        if (firstCheck) {
            var newElementOne = twoDimArray.find(function (c) { return c.x === element.x + 2 && c.y === element.y; });
            if (newElementOne) {
                var foundOne = checkRightTopToLeftBottomMas(twoDimArray, newElementOne);
                totalXmasFound += foundOne ? 1 : 0;
            }
            var newElementTwo = twoDimArray.find(function (c) { return c.x === element.x && c.y === element.y + 2; });
            if (newElementTwo) {
                var foundTwo = checkLeftBottomToRightTopMas(twoDimArray, newElementTwo);
                totalXmasFound += foundTwo ? 1 : 0;
            }
        }
        var fourthCheck = checkRightBottomToLeftTopMas(twoDimArray, element);
        if (fourthCheck) {
            var newElementOne = twoDimArray.find(function (c) { return c.x === element.x - 2 && c.y === element.y; });
            if (newElementOne) {
                var foundOne = checkLeftBottomToRightTopMas(twoDimArray, newElementOne);
                totalXmasFound += foundOne ? 1 : 0;
            }
            var newElementTwo = twoDimArray.find(function (c) { return c.x === element.x && c.y === element.y - 2; });
            if (newElementTwo) {
                var foundTwo = checkRightTopToLeftBottomMas(twoDimArray, newElementTwo);
                totalXmasFound += foundTwo ? 1 : 0;
            }
        }
    });
    console.log(totalXmasFound);
};
var createTwoDimArray = function (lines) {
    var coordinateArray = [];
    var currentRow = 0;
    lines.forEach(function (element) {
        for (var index = 0; index < element.length; index++) {
            var coordinate = { x: index, y: currentRow, character: element[index] };
            coordinateArray.push(coordinate);
        }
        currentRow++;
    });
    return coordinateArray;
};
var checkLeftToRightXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x + 1 && c.y === toCheck.y; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x + 2 && c.y === toCheck.y; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x + 3 && c.y === toCheck.y; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkRightToLeftXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x - 1 && c.y === toCheck.y; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x - 2 && c.y === toCheck.y; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x - 3 && c.y === toCheck.y; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkTopToBottomXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x && c.y === toCheck.y + 1; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x && c.y === toCheck.y + 2; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x && c.y === toCheck.y + 3; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkBottomToTopXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x && c.y === toCheck.y - 1; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x && c.y === toCheck.y - 2; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x && c.y === toCheck.y - 3; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkLeftTopToRightBottomXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x + 1 && c.y === toCheck.y + 1; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x + 2 && c.y === toCheck.y + 2; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x + 3 && c.y === toCheck.y + 3; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkRightTopToLeftBottomXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x - 1 && c.y === toCheck.y + 1; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x - 2 && c.y === toCheck.y + 2; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x - 3 && c.y === toCheck.y + 3; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkLeftBottomToRightTopXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x + 1 && c.y === toCheck.y - 1; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x + 2 && c.y === toCheck.y - 2; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x + 3 && c.y === toCheck.y - 3; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkRightBottomToLeftTopXmas = function (twoDimArray, toCheck) {
    var _a, _b, _c;
    var xmasword = '';
    if (toCheck.character !== "X") {
        return 0;
    }
    xmasword = toCheck.character +
        ((_a = twoDimArray.find(function (c) { return c.x === toCheck.x - 1 && c.y === toCheck.y - 1; })) === null || _a === void 0 ? void 0 : _a.character) +
        ((_b = twoDimArray.find(function (c) { return c.x === toCheck.x - 2 && c.y === toCheck.y - 2; })) === null || _b === void 0 ? void 0 : _b.character) +
        ((_c = twoDimArray.find(function (c) { return c.x === toCheck.x - 3 && c.y === toCheck.y - 3; })) === null || _c === void 0 ? void 0 : _c.character);
    if (xmasword === "XMAS") {
        return 1;
    }
    return 0;
};
var checkLeftTopToRightBottomMas = function (twoDimArray, toCheck) {
    var xmasword = '';
    if (toCheck.character !== "M") {
        return false;
    }
    var cOne = twoDimArray.find(function (c) { return c.x === toCheck.x + 1 && c.y === toCheck.y + 1; });
    var cTwo = twoDimArray.find(function (c) { return c.x === toCheck.x + 2 && c.y === toCheck.y + 2; });
    xmasword = toCheck.character + (cOne === null || cOne === void 0 ? void 0 : cOne.character) + (cTwo === null || cTwo === void 0 ? void 0 : cTwo.character);
    if (xmasword === "MAS") {
        return true;
    }
    return false;
};
var checkRightTopToLeftBottomMas = function (twoDimArray, toCheck) {
    var xmasword = '';
    if (toCheck.character !== "M") {
        return false;
    }
    var cOne = twoDimArray.find(function (c) { return c.x === toCheck.x - 1 && c.y === toCheck.y + 1; });
    var cTwo = twoDimArray.find(function (c) { return c.x === toCheck.x - 2 && c.y === toCheck.y + 2; });
    xmasword = toCheck.character + (cOne === null || cOne === void 0 ? void 0 : cOne.character) + (cTwo === null || cTwo === void 0 ? void 0 : cTwo.character);
    if (xmasword === "MAS") {
        return true;
    }
    return false;
};
var checkLeftBottomToRightTopMas = function (twoDimArray, toCheck) {
    var xmasword = '';
    if (toCheck.character !== "M") {
        return false;
    }
    var cOne = twoDimArray.find(function (c) { return c.x === toCheck.x + 1 && c.y === toCheck.y - 1; });
    var cTwo = twoDimArray.find(function (c) { return c.x === toCheck.x + 2 && c.y === toCheck.y - 2; });
    xmasword = toCheck.character + (cOne === null || cOne === void 0 ? void 0 : cOne.character) + (cTwo === null || cTwo === void 0 ? void 0 : cTwo.character);
    if (xmasword === "MAS") {
        return true;
    }
    return false;
};
var checkRightBottomToLeftTopMas = function (twoDimArray, toCheck) {
    var xmasword = '';
    if (toCheck.character !== "M") {
        return false;
    }
    var cOne = twoDimArray.find(function (c) { return c.x === toCheck.x - 1 && c.y === toCheck.y - 1; });
    var cTwo = twoDimArray.find(function (c) { return c.x === toCheck.x - 2 && c.y === toCheck.y - 2; });
    xmasword = toCheck.character + (cOne === null || cOne === void 0 ? void 0 : cOne.character) + (cTwo === null || cTwo === void 0 ? void 0 : cTwo.character);
    if (xmasword === "MAS") {
        return true;
    }
    return false;
};
var GetData = function () {
    var data = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        data.push(line);
    });
    return data;
};
XmasFinderOne();
XmasFinderTwo();

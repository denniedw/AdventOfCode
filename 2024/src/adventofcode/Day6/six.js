"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var movingOutOfMaze = function (mazeData, startingCoordinate) {
    var stillWalking = true;
    var startingPoint = __assign({}, startingCoordinate);
    var visitedCoordinates = [];
    visitedCoordinates.push(startingPoint);
    while (stillWalking) {
        var result = undefined;
        if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === "^") {
            result = handleMovingUp(mazeData, startingPoint);
        }
        else if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === "v") {
            result = handleMovingDown(mazeData, startingPoint);
        }
        else if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === "<") {
            result = handleMovingLeft(mazeData, startingPoint);
        }
        else if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === ">") {
            result = handleMovingRight(mazeData, startingPoint);
        }
        if (result) {
            startingPoint = result.coordinate;
            var index = visitedCoordinates.findIndex(function (c) { return c.x === startingPoint.x && c.y === startingPoint.y; });
            if (index === -1) {
                visitedCoordinates.push(startingPoint);
            }
        }
        else {
            stillWalking = false;
        }
    }
    console.log(visitedCoordinates.length);
};
var movingInLoop = function (mazeData, startingCoordinate, notAllowedCoordinate) {
    var stillWalking = true;
    var startingPoint = __assign({}, startingCoordinate);
    var upZeroFound = false;
    var downZeroFound = false;
    var leftZeroFound = false;
    var rightZeroFound = false;
    var looped = false;
    var steps = 0;
    while (stillWalking && steps < 20000) {
        var result = undefined;
        if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === "^") {
            result = handleMovingUp(mazeData, startingPoint, notAllowedCoordinate);
            if (result) {
                if (result.zeroHit) {
                    if (upZeroFound) {
                        stillWalking = false;
                        looped = true;
                    }
                    else {
                        upZeroFound = true;
                    }
                }
            }
        }
        else if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === "v") {
            result = handleMovingDown(mazeData, startingPoint, notAllowedCoordinate);
            if (result) {
                if (result.zeroHit) {
                    if (downZeroFound) {
                        stillWalking = false;
                        looped = true;
                    }
                    else {
                        downZeroFound = true;
                    }
                }
            }
        }
        else if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === "<") {
            result = handleMovingLeft(mazeData, startingPoint, notAllowedCoordinate);
            if (result) {
                if (result.zeroHit) {
                    if (leftZeroFound) {
                        stillWalking = false;
                        looped = true;
                    }
                    else {
                        leftZeroFound = true;
                    }
                }
            }
        }
        else if ((startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.character) === ">") {
            result = handleMovingRight(mazeData, startingPoint, notAllowedCoordinate);
            if (result) {
                if (result.zeroHit) {
                    if (rightZeroFound) {
                        stillWalking = false;
                        looped = true;
                    }
                    else {
                        rightZeroFound = true;
                    }
                }
            }
        }
        if (result) {
            startingPoint = result.coordinate;
            steps++;
        }
        else {
            stillWalking = false;
        }
    }
    if (steps === 20000) {
        console.log("-----------------------------------------------------------------------------------------------------------------");
        return true;
    }
    return looped;
};
var handleMovingUp = function (mazeData, currentCoordinate, notAllowedCoordinate) {
    var yData = mazeData.find(function (c) { return c.y === currentCoordinate.y - 1; });
    if (!yData) {
        return undefined;
    }
    var xData = yData === null || yData === void 0 ? void 0 : yData.row[currentCoordinate.x];
    if (!xData) {
        return undefined;
    }
    var nextCoordinate = { x: currentCoordinate.x, y: yData === null || yData === void 0 ? void 0 : yData.y, character: xData };
    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y) {
        currentCoordinate.character = ">";
        console.log("hit");
        return { coordinate: currentCoordinate, zeroHit: true };
    }
    else if ((nextCoordinate === null || nextCoordinate === void 0 ? void 0 : nextCoordinate.character) === "#") {
        currentCoordinate.character = ">";
        return { coordinate: currentCoordinate, zeroHit: false };
    }
    else {
        nextCoordinate.character = "^";
        return { coordinate: nextCoordinate, zeroHit: false };
    }
};
var handleMovingDown = function (mazeData, currentCoordinate, notAllowedCoordinate) {
    var yData = mazeData.find(function (c) { return c.y === currentCoordinate.y + 1; });
    if (!yData) {
        return undefined;
    }
    var xData = yData === null || yData === void 0 ? void 0 : yData.row[currentCoordinate.x];
    if (!xData) {
        return undefined;
    }
    var nextCoordinate = { x: currentCoordinate.x, y: yData === null || yData === void 0 ? void 0 : yData.y, character: xData };
    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y) {
        currentCoordinate.character = "<";
        console.log("hit");
        return { coordinate: currentCoordinate, zeroHit: true };
    }
    else if ((nextCoordinate === null || nextCoordinate === void 0 ? void 0 : nextCoordinate.character) === "#") {
        currentCoordinate.character = "<";
        return { coordinate: currentCoordinate, zeroHit: false };
    }
    else {
        nextCoordinate.character = "v";
        return { coordinate: nextCoordinate, zeroHit: false };
    }
};
var handleMovingLeft = function (mazeData, currentCoordinate, notAllowedCoordinate) {
    var yData = mazeData.find(function (c) { return c.y === currentCoordinate.y; });
    if (!yData) {
        return undefined;
    }
    var xData = yData === null || yData === void 0 ? void 0 : yData.row[currentCoordinate.x - 1];
    if (!xData) {
        return undefined;
    }
    var nextCoordinate = { x: currentCoordinate.x - 1, y: yData === null || yData === void 0 ? void 0 : yData.y, character: xData };
    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y) {
        currentCoordinate.character = "^";
        console.log("hit");
        return { coordinate: currentCoordinate, zeroHit: true };
    }
    else if ((nextCoordinate === null || nextCoordinate === void 0 ? void 0 : nextCoordinate.character) === "#") {
        currentCoordinate.character = "^";
        return { coordinate: currentCoordinate, zeroHit: false };
    }
    else {
        nextCoordinate.character = "<";
        return { coordinate: nextCoordinate, zeroHit: false };
    }
};
var handleMovingRight = function (mazeData, currentCoordinate, notAllowedCoordinate) {
    var yData = mazeData.find(function (c) { return c.y === currentCoordinate.y; });
    if (!yData) {
        return undefined;
    }
    var xData = yData === null || yData === void 0 ? void 0 : yData.row[currentCoordinate.x + 1];
    if (!xData) {
        return undefined;
    }
    var nextCoordinate = { x: currentCoordinate.x + 1, y: yData.y, character: xData };
    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y) {
        currentCoordinate.character = "v";
        console.log("hit");
        return { coordinate: currentCoordinate, zeroHit: true };
    }
    else if ((nextCoordinate === null || nextCoordinate === void 0 ? void 0 : nextCoordinate.character) === "#") {
        currentCoordinate.character = "v";
        return { coordinate: currentCoordinate, zeroHit: false };
    }
    else {
        nextCoordinate.character = ">";
        return { coordinate: nextCoordinate, zeroHit: false };
    }
};
var GetData = function () {
    var tempData = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        tempData.push(line);
    });
    var mazeData = [];
    tempData.forEach(function (element, index) {
        var row = "";
        if (element.includes("\r")) {
            row = element.split("\r")[0];
        }
        else {
            row = element;
        }
        mazeData.push({ row: row, y: index });
    });
    return mazeData;
};
var data = GetData();
var startingPoint = { x: 96, y: 41, character: "^" }; //input file
// let startingPoint: Coordinate = {x: 4, y: 6, character: "^"}; //test fle
// movingOutOfMaze(data, startingPoint);
var x = 0;
var y = 0;
var maxX = 130; //10 test file, 130 input file
var maxY = 130; //10 test file, 130 input file
var maxIndex = 16900; //100 test file, 16900 input file
var total = 0;
for (var index = 0; index < maxIndex; index++) {
    console.log("index", index);
    var cr = { x: x, y: y, character: "" };
    //skip starting point
    if (cr.x === (startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.x) && cr.y === (startingPoint === null || startingPoint === void 0 ? void 0 : startingPoint.y)) {
        cr.x++;
    }
    var looped = movingInLoop(data, startingPoint, cr);
    if (looped) {
        total++;
    }
    x++;
    if (x === maxX) {
        x = 0;
        y++;
    }
    if (y === maxY) {
        console.log("max y", y, index);
        break;
    }
}
console.log(total);

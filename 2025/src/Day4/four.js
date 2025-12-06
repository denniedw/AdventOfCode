"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PartOne = function (data) {
    var removedObjects = 0;
    data.forEach(function (coord) {
        if (coord.value !== '@') {
            return;
        }
        var surroundingObjects = 0;
        surroundingObjects += DoesCoordOnTopHaveObject(coord, data);
        surroundingObjects += DoesCoordOnBottomHaveObject(coord, data);
        surroundingObjects += DoesCoordOnRightHaveObject(coord, data);
        surroundingObjects += DoesCoordOnLeftHaveObject(coord, data);
        surroundingObjects += DoesCoordOnLeftTopHaveObject(coord, data);
        surroundingObjects += DoesCoordOnRightTopHaveObject(coord, data);
        surroundingObjects += DoesCoordOnLeftBottomHaveObject(coord, data);
        surroundingObjects += DoesCoordOnRightBottomHaveObject(coord, data);
        if (surroundingObjects < 4) {
            coord.value = 'X';
            removedObjects++;
        }
    });
    console.log(removedObjects);
};
var PartTwo = function (data) {
    var removedObjects = 0;
    var continueRemoving = true;
    var _loop_1 = function () {
        continueRemoving = false;
        var removedThisRound = 0;
        data.forEach(function (coord) {
            if (coord.value !== '@') {
                return;
            }
            var surroundingObjects = 0;
            surroundingObjects += DoesCoordOnTopHaveObject(coord, data);
            surroundingObjects += DoesCoordOnBottomHaveObject(coord, data);
            surroundingObjects += DoesCoordOnRightHaveObject(coord, data);
            surroundingObjects += DoesCoordOnLeftHaveObject(coord, data);
            surroundingObjects += DoesCoordOnLeftTopHaveObject(coord, data);
            surroundingObjects += DoesCoordOnRightTopHaveObject(coord, data);
            surroundingObjects += DoesCoordOnLeftBottomHaveObject(coord, data);
            surroundingObjects += DoesCoordOnRightBottomHaveObject(coord, data);
            if (surroundingObjects < 4) {
                coord.willBeRemovedAfterRound = true;
                removedThisRound++;
            }
        });
        if (data.find(function (d) { return d.willBeRemovedAfterRound; })) {
            continueRemoving = true;
            data.forEach(function (d) {
                if (d.willBeRemovedAfterRound) {
                    d.value = '.';
                    d.willBeRemovedAfterRound = false;
                }
            });
        }
        ;
        console.log('Removed this round: ' + removedThisRound);
        removedObjects += removedThisRound;
    };
    while (continueRemoving) {
        _loop_1();
    }
    console.log("Total removed: " + removedObjects);
};
var DoesCoordOnTopHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x && c.y === coord.y - 1; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnBottomHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x && c.y === coord.y + 1; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnRightHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x + 1 && c.y === coord.y; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnLeftHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x - 1 && c.y === coord.y; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnLeftTopHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x - 1 && c.y === coord.y - 1; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnRightTopHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x + 1 && c.y === coord.y - 1; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnLeftBottomHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x - 1 && c.y === coord.y + 1; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var DoesCoordOnRightBottomHaveObject = function (coord, data) {
    var c = data.find(function (c) { return c.x === coord.x + 1 && c.y === coord.y + 1; });
    if (c && (c.value === '@' || c.value === 'X')) {
        return 1;
    }
    return 0;
};
var GetData = function () {
    var data = [];
    var coords = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        data.push(line.trim());
    });
    data.forEach(function (line) {
        var chars = line.split('');
        chars.forEach(function (c, i) {
            coords.push({ x: i, y: data.indexOf(line), value: c, willBeRemovedAfterRound: false });
        });
    });
    return coords;
};
PartOne(GetData());
PartTwo(GetData());

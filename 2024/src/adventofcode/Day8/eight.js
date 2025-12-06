"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var GetData = function () {
    var y = -1;
    var coordinates = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        y++;
        for (var index = 0; index < line.length; index++) {
            var character = line[index];
            if (character !== "\r") {
                coordinates.push({ y: y, x: index, character: character });
            }
        }
    });
    return coordinates;
};
var findAllDifferentCharacters = function (coordinates) {
    var chars = [];
    var characters = coordinates.map(function (c) { return c.character; });
    characters.forEach(function (c) {
        if (chars.findIndex(function (x) { return x === c; }) === -1 && c !== ".") {
            chars.push(c);
        }
    });
    return chars;
};
var findAllCoordinatesPerCharacter = function (coordinates, character) {
    var characterLocations = [];
    character.forEach(function (c) {
        var coords = coordinates.filter(function (x) { return x.character === c; });
        characterLocations.push({ char: c, coordinates: coords });
    });
    return characterLocations;
};
var findCoordinatesWithSignalsPartOne = function (characterLocations) {
    var signals = [];
    var lowest = 0;
    var highest = 49;
    characterLocations.forEach(function (c) {
        c.coordinates.forEach(function (coord) {
            var otherCoords = c.coordinates.filter(function (x) { return x !== coord; });
            otherCoords.forEach(function (otherCoord) {
                var differenceInX = Math.abs(coord.x - otherCoord.x);
                var differenceInY = Math.abs(coord.y - otherCoord.y);
                var coordinateOne = createSignalLocation(coord, otherCoord, differenceInX, differenceInY);
                if (coordinateOne.x >= lowest && coordinateOne.x <= highest && coordinateOne.y >= lowest && coordinateOne.y <= highest) {
                    if (signals.findIndex(function (x) { return x.x === coordinateOne.x && x.y === coordinateOne.y; }) === -1) {
                        signals.push(coordinateOne);
                    }
                }
                var coordinateTwo = createSignalLocation(otherCoord, coord, differenceInX, differenceInY);
                if (coordinateTwo.x >= lowest && coordinateTwo.x <= highest && coordinateTwo.y >= lowest && coordinateTwo.y <= highest) {
                    if (signals.findIndex(function (x) { return x.x === coordinateTwo.x && x.y === coordinateTwo.y; }) === -1) {
                        signals.push(coordinateTwo);
                    }
                }
            });
        });
    });
    return signals;
};
var findCoordinatesWithSignalsPartTwo = function (characterLocations) {
    var signals = [];
    characterLocations.forEach(function (c) {
        c.coordinates.forEach(function (coord) {
            var otherCoords = c.coordinates.filter(function (x) { return x !== coord; });
            //location of antenna becomes a signal as well
            if (otherCoords.length > 0) {
                if (signals.findIndex(function (x) { return x.x === coord.x && x.y === coord.y; }) === -1) {
                    signals.push(coord);
                }
            }
            otherCoords.forEach(function (otherCoord) {
                var differenceInX = Math.abs(coord.x - otherCoord.x);
                var differenceInY = Math.abs(coord.y - otherCoord.y);
                loopSignalLocationsUntilOutOfBounds(signals, differenceInX, differenceInY, coord, otherCoord);
                loopSignalLocationsUntilOutOfBounds(signals, differenceInX, differenceInY, otherCoord, coord);
            });
        });
    });
    return signals;
};
var loopSignalLocationsUntilOutOfBounds = function (signals, differenceInX, differenceInY, coordOne, coordTwo) {
    var lowest = 0;
    var highest = 49;
    var newCoordinate = createSignalLocation(coordOne, coordTwo, differenceInX, differenceInY);
    if (newCoordinate.x >= lowest && newCoordinate.x <= highest && newCoordinate.y >= lowest && newCoordinate.y <= highest) {
        if (signals.findIndex(function (x) { return x.x === newCoordinate.x && x.y === newCoordinate.y; }) === -1) {
            signals.push(newCoordinate);
        }
        loopSignalLocationsUntilOutOfBounds(signals, differenceInX, differenceInY, newCoordinate, coordTwo);
    }
};
var createSignalLocation = function (towerLocationOne, towerLocationTwo, differenceInX, differenceInY) {
    var coord = { x: 0, y: 0, character: towerLocationOne.character };
    if (towerLocationOne.x > towerLocationTwo.x) {
        coord.x = towerLocationOne.x + differenceInX;
    }
    else {
        coord.x = towerLocationOne.x - differenceInX;
    }
    if (towerLocationOne.y > towerLocationTwo.y) {
        coord.y = towerLocationOne.y + differenceInY;
    }
    else {
        coord.y = towerLocationOne.y - differenceInY;
    }
    return coord;
};
var data = GetData();
var characters = findAllDifferentCharacters(data);
var characterLocations = findAllCoordinatesPerCharacter(data, characters);
// let signalLocations = findCoordinatesWithSignalsPartOne(characterLocations).sort((a, b) => a.x - b.x);
// console.log(signalLocations);
// console.log(signalLocations.length);
var signalLocations2 = findCoordinatesWithSignalsPartTwo(characterLocations).sort(function (a, b) { return a.x - b.x; });
console.log(signalLocations2);
console.log(signalLocations2.length);

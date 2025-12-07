"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PartOne = function (data) {
    var higestX = Math.max.apply(Math, data.map(function (d) { return d.x; }));
    var highestY = Math.max.apply(Math, data.map(function (d) { return d.y; }));
    var splits = 0;
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
            var coord = data.find(function (d) { return d.x === j && d.y === i; });
            var coordAboveCoord = data.find(function (d) { return d.x === j && d.y === i - 1; });
            var coordLeftOfCoord = data.find(function (d) { return d.x === j - 1 && d.y === i; });
            var coordRightOfCoord = data.find(function (d) { return d.x === j + 1 && d.y === i; });
            if (coordAboveCoord) {
                if (coordAboveCoord.value === 'S') {
                    coord.value = '|';
                }
                else if (coordAboveCoord.value === '|') {
                    if (coord.value === '.') {
                        coord.value = '|';
                    }
                    else if (coord.value === '^') {
                        splits++;
                        if (coordLeftOfCoord && coordLeftOfCoord.value === '.') {
                            coordLeftOfCoord.value = '|';
                        }
                        if (coordRightOfCoord && coordRightOfCoord.value === '.') {
                            coordRightOfCoord.value = '|';
                        }
                    }
                }
            }
        };
        for (var j = 0; j < higestX; j++) {
            _loop_2(j);
        }
        console.log(data.filter(function (d) { return d.y === i; }).map(function (d) { return d.value; }).join(''));
    };
    for (var i = 0; i < highestY; i++) {
        _loop_1(i);
    }
    console.log(splits);
};
var PartTwo = function (data) {
    var higestX = Math.max.apply(Math, data.map(function (d) { return d.x; }));
    var highestY = Math.max.apply(Math, data.map(function (d) { return d.y; }));
    var total = 0;
    var _loop_3 = function (i) {
        var _loop_4 = function (j) {
            var coord = data.find(function (d) { return d.x === j && d.y === i; });
            var coordAboveCoord = data.find(function (d) { return d.x === j && d.y === i - 1; });
            var coordLeftOfCoord = data.find(function (d) { return d.x === j - 1 && d.y === i; });
            var coordRightOfCoord = data.find(function (d) { return d.x === j + 1 && d.y === i; });
            if (coordAboveCoord) {
                if (coordAboveCoord.value === 'S') {
                    coord.value = '1';
                }
                else if (coordAboveCoord.value === '^' || coordAboveCoord.value === '.') {
                    // do nothing
                }
                else {
                    // coord above must be a number now
                    if (coord.value === '.') {
                        coord.value = coordAboveCoord.value;
                    }
                    else if (coord.value === '^') {
                        if (coordLeftOfCoord) {
                            coordLeftOfCoord.value = coordLeftOfCoord.value === '.' ? coordAboveCoord.value : (parseInt(coordLeftOfCoord.value) + parseInt(coordAboveCoord.value)).toString();
                        }
                        if (coordRightOfCoord) {
                            coordRightOfCoord.value = coordRightOfCoord.value === '.' ? coordAboveCoord.value : (parseInt(coordRightOfCoord.value) + parseInt(coordAboveCoord.value)).toString();
                        }
                    }
                    else {
                        if (coordLeftOfCoord && coordLeftOfCoord.value === '^' && coordRightOfCoord && coordRightOfCoord.value === '^') {
                            if (coordAboveCoord.value !== '.' && coordAboveCoord.value !== '^') {
                                coord.value = (parseInt(coord.value) + parseInt(coordAboveCoord.value)).toString();
                            }
                        }
                        else if (coordLeftOfCoord && coordLeftOfCoord.value === '^') {
                            if (coordAboveCoord.value !== '.' && coordAboveCoord.value !== '^') {
                                coord.value = (parseInt(coord.value) + parseInt(coordAboveCoord.value)).toString();
                            }
                        }
                        else if (coordRightOfCoord && coordRightOfCoord.value === '^') {
                            if (coordAboveCoord.value !== '.' && coordAboveCoord.value !== '^') {
                                coord.value = (parseInt(coord.value) + parseInt(coordAboveCoord.value)).toString();
                            }
                        }
                    }
                }
            }
        };
        for (var j = 0; j < higestX; j++) {
            _loop_4(j);
        }
    };
    for (var i = 0; i < highestY; i++) {
        _loop_3(i);
    }
    data.filter(function (d) { return d.y === highestY - 1; }).forEach(function (d) {
        if (d.value !== '.' && d.value !== '^') {
            total += parseInt(d.value);
        }
    });
    console.log(total);
};
var GetData = function () {
    var data = [];
    var coords = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        data.push(line.trim());
    });
    data.forEach(function (line, index) {
        var chars = line.split('');
        chars.forEach(function (c, i) {
            coords.push({ x: i, y: index, value: c });
        });
    });
    return coords;
};
PartOne(GetData());
PartTwo(GetData());

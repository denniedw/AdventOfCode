"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CheckRoutesOne = function () {
    var data = GetData();
    var safeRouteCount = 0;
    data.numbers.forEach(function (element) {
        var safeRoute = CheckRouteSafety(element);
        if (safeRoute) {
            safeRouteCount++;
        }
    });
    console.log(safeRouteCount);
};
var CheckRoutesTwo = function () {
    var data = GetData();
    var safeRouteCount = 0;
    data.numbers.forEach(function (element) {
        var safeRoute = CheckRouteSafety(element);
        if (!safeRoute) {
            for (var index = 0; index < element.length; index++) {
                if (!safeRoute) {
                    var copy = element.toSpliced(index, 1);
                    safeRoute = CheckRouteSafety(copy);
                }
            }
        }
        if (safeRoute) {
            safeRouteCount++;
        }
    });
    console.log(safeRouteCount);
};
var CheckRouteSafety = function (element) {
    var allowedRange = [-3, -2, -1, 1, 2, 3];
    var increasing = false;
    var decreasing = false;
    var safeRoute = true;
    for (var index = 0; index < element.length - 1; index++) {
        if (safeRoute) {
            var first = element[index];
            var second = element[index + 1];
            var difference = second - first;
            if (difference === 0) {
                safeRoute = false;
            }
            ;
            if (difference > 0) {
                decreasing = true;
                if (increasing) {
                    safeRoute = false;
                }
            }
            else if (difference < 0) {
                increasing = true;
                if (decreasing) {
                    safeRoute = false;
                }
            }
            if (!allowedRange.includes(difference)) {
                safeRoute = false;
            }
        }
    }
    return safeRoute;
};
var GetData = function () {
    var data = { numbers: [] };
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        var numberArray = [];
        var stringArray = line.split(" ");
        stringArray.forEach(function (n) {
            numberArray.push(+n);
        });
        data.numbers.push(numberArray);
    });
    return data;
};
GetData();
CheckRoutesOne();
CheckRoutesTwo();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CalcDistances = function () {
    var difference = 0;
    var data = GetData();
    data.leftNumbers.sort(function (a, b) { return a - b; });
    data.rightNumbers.sort(function (a, b) { return a - b; });
    for (var index = 0; index < data.leftNumbers.length; index++) {
        var diff = data.leftNumbers[index] - data.rightNumbers[index];
        console.log(data.leftNumbers[index], "-", data.rightNumbers[index]);
        if (diff < 0) {
            diff = diff * -1;
        }
        difference += diff;
    }
    console.log('difference', difference);
};
var CalcDistancesTwo = function () {
    var total = 0;
    var data = GetData();
    data.leftNumbers.sort(function (a, b) { return a - b; });
    data.rightNumbers.sort(function (a, b) { return a - b; });
    data.leftNumbers.forEach(function (n) {
        var times = data.rightNumbers.filter(function (m) { return m === n; }).length;
        if (times > 0) {
            var result = n * times;
            total += result;
        }
    });
    console.log(total);
};
var GetData = function () {
    var data = { leftNumbers: [], rightNumbers: [] };
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        var stringArray = line.split("   ");
        data.leftNumbers.push(+stringArray[0]);
        data.rightNumbers.push(+stringArray[1]);
    });
    console.log(data);
    return data;
};
CalcDistances();
CalcDistancesTwo();

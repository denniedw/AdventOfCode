"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PartOne = function (data) {
    var joltAmount = 0;
    data.forEach(function (line) {
        var firstFoundHighestNumber = 0;
        var firstFoundHighestNumberIndex = 0;
        var secondFoundHighestNumber = 0;
        // first number cannot be the last number in the line, since cant grab a second number then
        for (var i = 0; i < line.length - 1; i++) {
            var currentNumber = +line.charAt(i);
            if (currentNumber > firstFoundHighestNumber) {
                firstFoundHighestNumber = currentNumber;
                firstFoundHighestNumberIndex = i;
            }
        }
        ;
        for (var i = firstFoundHighestNumberIndex + 1; i <= line.length; i++) {
            var currentNumber = +line.charAt(i);
            if (currentNumber > secondFoundHighestNumber) {
                secondFoundHighestNumber = currentNumber;
            }
        }
        var jolt = +"".concat(firstFoundHighestNumber).concat(secondFoundHighestNumber);
        joltAmount += jolt;
    });
    console.log(joltAmount);
};
var PartTwo = function (data) {
    var joltAmount = 0;
    data.forEach(function (line) {
        var jolts = '';
        var chars = line.split('').map(function (c) { return +c; });
        var _loop_1 = function (i) {
            var startIndex = 0;
            var searchIn = chars.slice(startIndex, chars.length - (11 - i));
            var highestNumber = Math.max.apply(Math, searchIn);
            var firstOccurence = chars.find(function (c) { return c === highestNumber; });
            jolts += firstOccurence.toString();
            chars = chars.slice(chars.indexOf(firstOccurence) + 1, chars.length);
        };
        for (var i = 0; i < 12; i++) {
            _loop_1(i);
        }
        joltAmount += +jolts;
        console.log(jolts);
    });
    console.log(joltAmount);
};
var GetData = function () {
    var data = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        data.push(line.trim());
    });
    return data;
};
//PartOne(GetData());
PartTwo(GetData());

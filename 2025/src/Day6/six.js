"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PartOne = function (data) {
    var total = 0;
    data.forEach(function (entry) {
        var sumTotal = 0;
        var numberOne = parseInt(entry.numberOne.trim());
        var numberTwo = parseInt(entry.numberTwo.trim());
        var numberThree = parseInt(entry.numberThree.trim());
        var numberFour = parseInt(entry.numberFour.trim());
        var symbol = entry.symbol.trim();
        if (symbol === '+') {
            sumTotal = (numberOne + numberTwo + numberThree + numberFour);
            total += sumTotal;
        }
        if (symbol === '*') {
            sumTotal = (numberOne * numberTwo * numberThree * numberFour);
            total += sumTotal;
        }
    });
    console.log(total);
};
var PartTwo = function (data) {
    var total = 0;
    data.forEach(function (entry) {
        var sumTotal = 0;
        var entryLength = entry.numberOne.length;
        var numbers = [];
        var symbol = entry.symbol.trim();
        for (var i = 0; i < entryLength; i++) {
            var joinedNumber = (entry.numberOne[i] + entry.numberTwo[i] + entry.numberThree[i] + entry.numberFour[i]).trim();
            numbers.push(+joinedNumber);
        }
        if (symbol === '+') {
            sumTotal = numbers.reduce(function (a, b) { return a + b; }, 0);
            total += sumTotal;
        }
        else {
            sumTotal = numbers.reduce(function (a, b) { return a * b; }, 1);
            total += sumTotal;
        }
    });
    console.log(total);
};
var GetData = function () {
    var lines = [];
    var sums = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        lines.push(line.replace(/\r/g, ''));
    });
    var lastIndex = lines[0].length - 1;
    var newSum = { numberOne: '', numberTwo: '', numberThree: '', numberFour: '', symbol: '' };
    for (var i = 0; i <= lastIndex; i++) {
        var entryOne = lines[0][i];
        var entryTwo = lines[1][i];
        var entryThree = lines[2][i];
        var entryFour = lines[3][i];
        var entryFive = lines[4][i];
        // all spaces
        if (entryOne === ' ' && entryTwo === ' ' && entryThree === ' ' && entryFour === ' ' && entryFive === ' ') {
            sums.push(newSum);
            newSum = { numberOne: '', numberTwo: '', numberThree: '', numberFour: '', symbol: '' };
        }
        else {
            newSum.numberOne += entryOne;
            newSum.numberTwo += entryTwo;
            newSum.numberThree += entryThree;
            newSum.numberFour += entryFour;
            newSum.symbol += entryFive;
        }
    }
    // after loop push last created object
    sums.push(newSum);
    return sums;
};
PartOne(GetData());
PartTwo(GetData());

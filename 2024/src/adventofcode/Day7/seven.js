"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var generateCombinations = function (chars, length) {
    var results = [];
    var generate = function (prefix, remainingLength) {
        if (remainingLength === 0) {
            results.push(prefix);
            return;
        }
        for (var i = 0; i < chars.length; i++) {
            generate(prefix + chars[i], remainingLength - 1);
        }
    };
    generate('', length);
    return results;
};
var calculateSums = function (sums, characters) {
    var matchedSums = [];
    sums.forEach(function (sum) {
        var possibleCombinations = generateCombinations(characters, sum.numbers.length - 1);
        var correctSumFound = false;
        possibleCombinations.forEach(function (combination) {
            if (!correctSumFound) {
                var tempResult = sum.numbers[0];
                var createdMathString = sum.numbers[0].toString();
                for (var index = 0; index < sum.numbers.length - 1; index++) {
                    var character = combination[index];
                    if (character === "|") {
                        tempResult = parseInt("".concat(tempResult).concat(sum.numbers[index + 1]));
                    }
                    else {
                        var mathString = tempResult + combination[index] + sum.numbers[index + 1];
                        createdMathString += combination[index] + sum.numbers[index + 1];
                        tempResult = eval(mathString);
                    }
                }
                if (tempResult === sum.answer) {
                    console.log("Match found");
                    matchedSums.push({ answer: sum.answer, sumString: createdMathString });
                    correctSumFound = true;
                }
            }
        });
    });
    return matchedSums;
};
var GetData = function () {
    var sums = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        var devisions = line.split(":");
        var answer = devisions[0];
        var numbers = devisions[1].split(" ");
        var sum = { answer: parseInt(answer), numbers: numbers.map(function (x) { return parseInt(x); }) };
        sum.numbers = sum.numbers.slice(1);
        sums.push(sum);
    });
    return sums;
};
var sums = GetData();
var PartOne = function () {
    var matchedSums = calculateSums(sums, "+*");
    var total = 0;
    matchedSums.forEach(function (sum) {
        console.log(sum.answer, sum.sumString);
        total += sum.answer;
    });
    console.log(total);
    //12553187650171
};
var PartTwo = function () {
    var matchedSums = calculateSums(sums, "+*|");
    var total = 0;
    matchedSums.forEach(function (sum) {
        console.log(sum.answer, sum.sumString);
        total += sum.answer;
    });
    console.log(total);
};
PartTwo();

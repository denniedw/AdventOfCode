"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PartOne = function (data) {
    var endedAtZero = 0;
    var currentNumber = 50;
    data.dialTurns.forEach(function (turn) {
        var direction = turn.charAt(0);
        var goingLeft = direction === 'L' ? true : false;
        var amount = +turn.slice(1);
        var remainder = amount % 100;
        if (goingLeft) {
            currentNumber -= remainder;
            if (currentNumber < 0) {
                currentNumber = currentNumber + 100;
            }
        }
        else {
            currentNumber += remainder;
            if (currentNumber > 99) {
                currentNumber = currentNumber - 100;
            }
        }
        if (currentNumber === 0) {
            endedAtZero++;
        }
    });
    console.log(endedAtZero);
};
var PartTwo = function (data) {
    var passedOrEndedAtZero = 0;
    var currentNumber = 50;
    data.dialTurns.forEach(function (turn) {
        var direction = turn.charAt(0);
        var goingLeft = direction === 'L' ? true : false;
        var amount = +turn.slice(1);
        var fullRoundTimes = Math.floor(amount / 100);
        var remainder = amount % 100;
        // if(currentNumber === 0 && fullRoundTimes > 0){ 
        //     // started and ended at 0, so passed zero 1 less time
        //     fullRoundTimes--;
        // }
        if (goingLeft) {
            currentNumber -= remainder;
            if (currentNumber < 0) {
                currentNumber = currentNumber + 100;
                if (currentNumber !== 0 && currentNumber + remainder !== 100) {
                    passedOrEndedAtZero++;
                }
            }
        }
        else {
            currentNumber += remainder;
            if (currentNumber > 99) {
                currentNumber = currentNumber - 100;
                if (currentNumber !== 0 && currentNumber - remainder !== 0) {
                    passedOrEndedAtZero++;
                }
            }
        }
        if (currentNumber === 0) {
            passedOrEndedAtZero++;
        }
        passedOrEndedAtZero += fullRoundTimes;
    });
    console.log(passedOrEndedAtZero);
};
var GetData = function () {
    var data = { dialTurns: [] };
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        data.dialTurns.push(line);
    });
    return data;
};
PartOne(GetData());
PartTwo(GetData());
//6638

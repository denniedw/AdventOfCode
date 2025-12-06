"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CalculateRegexesOne = function () {
    var data = GetData();
    var regex = /(mul\((\d+)(,)(\d+)\))/g;
    var mulsStrings = data.match(regex);
    calculateResult(mulsStrings);
};
var CalculateRegexesTwo = function () {
    var data = GetData();
    var regexForCalc = /(mul\((\d+)(,)(\d+)\))/g;
    var regexForRemove = /don't\(\)(.*?)do\(\)/g;
    var trimmedString = data.replace(regexForRemove, "");
    var mulsStrings = trimmedString.match(regexForCalc);
    calculateResult(mulsStrings);
};
var calculateResult = function (mulsStrings) {
    var result = 0;
    console.log(mulsStrings);
    mulsStrings.forEach(function (element) {
        var numbers = element.match(/(\d+)/g);
        if (numbers) {
            var first = +numbers[0];
            var second = +numbers[1];
            var r = first * second;
            result += r;
        }
    });
    console.log(result);
};
var GetData = function () {
    var data = fs.readFileSync('input.txt').toString();
    return data;
};
CalculateRegexesOne();
CalculateRegexesTwo();

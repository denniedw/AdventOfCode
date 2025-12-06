"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var PartOne = function (data) {
    var invalidProductIds = [];
    data.forEach(function (range) {
        for (var i = range.leftProductId; i <= range.rightProductId; i++) {
            var length_1 = i.toString().length;
            // even amount of characters in number
            if (length_1 % 2 === 0) {
                var leftSide = +i.toString().slice(0, length_1 / 2);
                var rightSide = +i.toString().slice(length_1 / 2, length_1);
                // both sides are the same -> invalid product id
                if (leftSide === rightSide) {
                    invalidProductIds.push(i);
                }
            }
        }
    });
    var sum = invalidProductIds.reduce(function (a, b) { return a + b; }, 0);
    console.log(sum);
};
var PartTwo = function (data) {
    var productIds = [];
    var invalidProductIds = [];
    data.forEach(function (range) {
        for (var i = range.leftProductId; i <= range.rightProductId; i++) {
            productIds.push(i);
        }
    });
    productIds.forEach(function (id) {
        var length = id.toString().length;
        var _loop_1 = function (i) {
            var characterSet = id.toString().slice(0, i);
            var subsets = id.toString().split(characterSet);
            if (subsets.length > 1) {
                var lengthOfFirstSubset_1 = subsets[0].length;
                if (subsets.every(function (subset) { return subset.length === lengthOfFirstSubset_1; })) {
                    invalidProductIds.push(id);
                    return "break";
                }
            }
        };
        for (var i = 1; i < length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
    });
    var sum = invalidProductIds.reduce(function (a, b) { return a + b; }, 0);
    console.log(sum);
};
var GetData = function () {
    var data = [];
    fs.readFileSync('input.txt', 'utf-8').split(',').map(function (line) {
        var leftInput = line.split('-')[0];
        var rightInput = line.split('-')[1];
        data.push({
            leftProductId: +leftInput,
            rightProductId: +rightInput
        });
    });
    return data;
};
PartOne(GetData());
PartTwo(GetData());

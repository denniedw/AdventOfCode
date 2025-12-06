"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FindCorrectOrdersReturnIncorrectOnes = function () {
    var data = GetData();
    var incorrectOrders = [];
    var middleNumberOfCorrectOrders = [];
    var total = 0;
    data.orders.forEach(function (order) {
        var correctOrder = checkOrderCorrectness(order, data.rules);
        if (correctOrder) {
            middleNumberOfCorrectOrders.push(order[(order.length - 1) / 2]);
            total += order[(order.length - 1) / 2];
        }
        else {
            incorrectOrders.push(order);
        }
    });
    //answer 1
    console.log(total);
    return incorrectOrders;
};
var checkOrderCorrectness = function (order, rules) {
    var correctOrder = true;
    for (var index = 0; index < order.length; index++) {
        correctOrder = checkSingleIndexOfOrderCorrectness(correctOrder, order, index, rules);
    }
    return correctOrder;
};
var checkSingleIndexOfOrderCorrectness = function (currentCorrectState, order, index, rules) {
    var appliedLeftRules = rules.filter(function (r) { return r.left === order[index]; });
    appliedLeftRules.forEach(function (r) {
        var rightIndex = order.findIndex(function (n) { return n === r.right; });
        if (rightIndex !== -1 && rightIndex < index) {
            currentCorrectState = false;
        }
    });
    var appliedRightRules = rules.filter(function (n) { return n.right === order[index]; });
    appliedRightRules.forEach(function (r) {
        var leftIndex = order.findIndex(function (n) { return n === r.left; });
        if (leftIndex !== -1 && leftIndex > index) {
            currentCorrectState = false;
        }
    });
    return currentCorrectState;
};
var checkHowManyAfterCurrentNumber = function (order, num, rules) {
    var otherNumbers = order.filter(function (n) { return n !== num; });
    var appliedLeftRules = rules.filter(function (r) { return r.left === num; });
    var leftOverRules = appliedLeftRules.filter(function (r) { return otherNumbers.includes(r.right); });
    return leftOverRules.length;
};
var fixSingleOrder = function (order, rules) {
    var newOrder = [];
    order.forEach(function (n) {
        var amount = checkHowManyAfterCurrentNumber(order, n, rules);
        var index = order.length - 1 - amount;
        newOrder[index] = n;
    });
    return newOrder;
};
var fixIncorrectOrdersAndCalcMiddle = function (incorrectOrders, rules) {
    var total = 0;
    incorrectOrders.forEach(function (order) {
        var fixedOrder = fixSingleOrder(order, rules);
        total += fixedOrder[(fixedOrder.length - 1) / 2];
    });
    console.log(total);
};
var GetData = function () {
    var rules = [];
    var pageOrders = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(function (line) {
        if (line.includes("|")) {
            var split = line.split("|");
            var rule = { left: +split[0], right: +split[1] };
            rules.push(rule);
        }
        else if (line.includes(",")) {
            pageOrders.push(line.split(",").map(function (n) { return +n; }));
        }
    });
    var data = { rules: rules, orders: pageOrders };
    return data;
};
var incorrectOrders = FindCorrectOrdersReturnIncorrectOnes();
fixIncorrectOrdersAndCalcMiddle(incorrectOrders, GetData().rules);

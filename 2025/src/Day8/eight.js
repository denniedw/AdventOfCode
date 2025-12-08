"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CalcDistance = function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
};
var GetDistances = function (data) {
    var distances = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = i + 1; j < data.length; j++) {
            if (i === j)
                continue;
            distances.push({ distance: CalcDistance(data[i], data[j]), idOne: data[i].id, idTwo: data[j].id });
        }
    }
    console.log('finished calculating distances', distances.length);
    return distances.sort(function (a, b) { return a.distance - b.distance; });
};
var AddDistanceToCircuits = function (circuits, distance) {
    var index = circuits.findIndex(function (circuit) { return circuit.includes(distance.idOne) || circuit.includes(distance.idTwo); });
    // numbers are not connected to any circuit yet, create a circuit
    if (index === -1) {
        circuits.push([distance.idOne, distance.idTwo]);
    }
    else {
        // add both numbers to the found circuit if not already present
        if (!circuits[index].includes(distance.idOne)) {
            circuits[index].push(distance.idOne);
        }
        if (!circuits[index].includes(distance.idTwo)) {
            circuits[index].push(distance.idTwo);
        }
    }
    return circuits;
};
var CombineCircuits = function (circuits) {
    var continueGrouping = true;
    var combinedCircuits = [];
    while (continueGrouping) {
        continueGrouping = false;
        circuits.forEach(function (circuit) {
            // check if combination of ids exist, in which 1 id of the circuit is present
            var combined = combinedCircuits.findIndex(function (cc) { return cc.some(function (id) { return circuit.includes(id); }); });
            //non existing, new circuit
            if (combined === -1) {
                combinedCircuits.push(circuit);
            }
            else {
                // existing circuit, add all ids which are not already there in circuit
                circuit.forEach(function (id) {
                    if (!combinedCircuits[combined].includes(id)) {
                        combinedCircuits[combined].push(id);
                        continueGrouping = true; // need a new iteration to check newly created combinations after adding ids
                    }
                });
            }
        });
    }
    ;
    return combinedCircuits;
};
var PartOne = function (data, amountOfDistancesToCheck) {
    var distances = GetDistances(data);
    var circuits = [];
    for (var i = 0; i < amountOfDistancesToCheck; i++) {
        AddDistanceToCircuits(circuits, distances[i]);
    }
    var combinedCircuits = CombineCircuits(circuits).sort(function (a, b) { return b.length - a.length; });
    console.log(combinedCircuits[0].length * combinedCircuits[1].length * combinedCircuits[2].length);
};
var PartTwo = function (data, amountOfDistancesToCheck) {
    var distances = GetDistances(data);
    var circuits = [];
    for (var i = 0; i < amountOfDistancesToCheck; i++) {
        AddDistanceToCircuits(circuits, distances[i]);
    }
    var currentIndex = amountOfDistancesToCheck;
    var repeat = true;
    var repeatLoop = function () {
        AddDistanceToCircuits(circuits, distances[currentIndex]);
        currentIndex++;
        repeat = true;
    };
    while (repeat) {
        repeat = false;
        var combinedCircuits = CombineCircuits(circuits);
        if (combinedCircuits.length !== 1) {
            repeatLoop();
        }
        else {
            // check if all ids exist in the circuits
            var allExist = true;
            for (var i = 0; i < data.length; i++) {
                if (!combinedCircuits[0].includes(data[i].id)) {
                    allExist = false;
                    break;
                }
            }
            if (!allExist) {
                repeatLoop();
            }
        }
    }
    // one was added on the last loop, bu tthat index is not added to the circuit
    currentIndex--;
    console.log('last added distance', distances[currentIndex], currentIndex);
    console.log(data[distances[currentIndex].idOne].x * data[distances[currentIndex].idTwo].x);
};
var GetData = function (file) {
    var data = [];
    var positions = [];
    fs.readFileSync(file, 'utf-8').split('\n').map(function (line) {
        data.push(line.trim());
    });
    data.forEach(function (line, index) {
        var chars = line.split(',');
        positions.push({ id: index, x: parseInt(chars[0]), y: parseInt(chars[1]), z: parseInt(chars[2]) });
    });
    return positions;
};
PartOne(GetData('test.txt'), 10);
PartOne(GetData('input.txt'), 1000);
PartTwo(GetData('test.txt'), 10);
PartTwo(GetData('input.txt'), 1000);

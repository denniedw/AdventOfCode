import * as fs from 'fs';

interface Position {
    id: number;
    x: number;
    y: number;
    z: number;
}

interface Distance {
    idOne: number;
    idTwo: number;
    distance: number;
}

const CalcDistance = (a: Position, b: Position): number => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
}

const GetDistances = (data: Position[]): Distance[] => {
    let distances: Distance[] = []

    for(let i = 0; i < data.length; i++){
        for(let j = i + 1; j < data.length; j++){
            if(i === j) continue;
            distances.push({ distance: CalcDistance(data[i], data[j]), idOne: data[i].id, idTwo: data[j].id } );
        }
    }

    console.log('finished calculating distances', distances.length);

    return distances.sort((a, b) => a.distance - b.distance);
}

const AddDistanceToCircuits = (circuits: number[][], distance: Distance): number[][] => {
    const index = circuits.findIndex(circuit => circuit.includes(distance.idOne) || circuit.includes(distance.idTwo));

    // numbers are not connected to any circuit yet, create a circuit
    if(index === -1){
        circuits.push([distance.idOne, distance.idTwo]);
    } else {
        // add both numbers to the found circuit if not already present
        if(!circuits[index].includes(distance.idOne)){
            circuits[index].push(distance.idOne);
        }
        if(!circuits[index].includes(distance.idTwo)){
            circuits[index].push(distance.idTwo);
        }
    }

    return circuits;
}

const CombineCircuits = (circuits: number[][]): number[][] => {
    let continueGrouping = true;
    let combinedCircuits: number[][] = [];

    while(continueGrouping){
        continueGrouping = false;
        
        circuits.forEach(circuit => {
            // check if combination of ids exist, in which 1 id of the circuit is present
            let combined = combinedCircuits.findIndex((cc) => cc.some(id => circuit.includes(id)));

            //non existing, new circuit
            if(combined === -1){
                combinedCircuits.push(circuit);
            } else {
                // existing circuit, add all ids which are not already there in circuit
                circuit.forEach(id => {
                    if(!combinedCircuits[combined].includes(id)){
                        combinedCircuits[combined].push(id);
                        continueGrouping = true; // need a new iteration to check newly created combinations after adding ids
                    }
                })

                
            }
        });
    };

    return combinedCircuits;
}

const PartOne = (data: Position[], amountOfDistancesToCheck: number) => {
    let distances = GetDistances(data);
    let circuits: number[][] = [];

    for(let i = 0; i < amountOfDistancesToCheck; i++){
        AddDistanceToCircuits(circuits, distances[i]);
    }

    let combinedCircuits: number[][] = CombineCircuits(circuits).sort((a, b) => b.length - a.length);

    console.log(combinedCircuits[0].length * combinedCircuits[1].length * combinedCircuits[2].length);
}

const PartTwo = (data: Position[], amountOfDistancesToCheck: number) => {
    let distances = GetDistances(data);
    let circuits: number[][] = [];

    for(let i = 0; i < amountOfDistancesToCheck; i++){
        AddDistanceToCircuits(circuits, distances[i]);
    }

    let currentIndex = amountOfDistancesToCheck;
    let repeat = true;

    const repeatLoop = () => {
        AddDistanceToCircuits(circuits, distances[currentIndex]);
        currentIndex++;

        repeat = true
    }

    while(repeat){
        repeat = false;
       
        let combinedCircuits: number[][] = CombineCircuits(circuits);

        if(combinedCircuits.length !== 1){
            repeatLoop();
        } else {
            // check if all ids exist in the circuits
            let allExist = true;
            for(let i = 0; i < data.length; i++){
                if(!combinedCircuits[0].includes(data[i].id)){
                    allExist = false;
                    break;
                }
            }

            if(!allExist){
                repeatLoop();
            }
        }
    }
    // one was added on the last loop, bu tthat index is not added to the circuit
    currentIndex--; 

    console.log('last added distance', distances[currentIndex], currentIndex);
    console.log(data[distances[currentIndex].idOne].x * data[distances[currentIndex].idTwo].x);
}

const GetData = (file: string): Position[] => {
    let data: string[] = [];
    let positions: Position[] = [];

    fs.readFileSync(file, 'utf-8').split('\n').map(line => {
        data.push(line.trim());
    });

    data.forEach((line, index) => {
        let chars = line.split(',');
        positions.push({id: index, x: parseInt(chars[0]), y: parseInt(chars[1]), z: parseInt(chars[2])});
    })

    return positions;
}

PartOne(GetData('test.txt'), 10);
PartOne(GetData('input.txt'), 1000);
PartTwo(GetData('test.txt'), 10);
PartTwo(GetData('input.txt'), 1000);
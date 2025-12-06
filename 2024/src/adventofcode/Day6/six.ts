import * as fs from 'fs';

interface Coordinate {
    x: number;
    y: number;
    character: string;
}

interface MazeData {
    row: string;
    y: number;
}

interface CoordinateWithZeroCheck {
    coordinate: Coordinate;
    zeroHit: boolean;
}

const movingOutOfMaze = (mazeData: MazeData[], startingCoordinate: Coordinate) => {
    let stillWalking = true;
    let startingPoint = { ...startingCoordinate };
    let visitedCoordinates: Coordinate[] = [];

    visitedCoordinates.push(startingPoint);

    while(stillWalking){

        let result: CoordinateWithZeroCheck | undefined = undefined;

        if(startingPoint?.character === "^"){
            result = handleMovingUp(mazeData, startingPoint);

        } else if (startingPoint?.character === "v"){
            result = handleMovingDown(mazeData, startingPoint);
            
        } else if (startingPoint?.character === "<"){
            result = handleMovingLeft(mazeData, startingPoint);
            
        } else if (startingPoint?.character === ">"){
            result = handleMovingRight(mazeData, startingPoint);
        }

        if(result) {
            startingPoint = result.coordinate;

            let index = visitedCoordinates.findIndex(c => c.x === startingPoint.x && c.y === startingPoint.y);
            if(index === -1){
                visitedCoordinates.push(startingPoint);
            }
        } else {
            stillWalking = false;
        }
    }

    console.log(visitedCoordinates.length);
}

const movingInLoop = (mazeData: MazeData[], startingCoordinate: Coordinate, notAllowedCoordinate: Coordinate) => {
    let stillWalking = true;
    let startingPoint = { ...startingCoordinate };

    let upZeroFound = false;
    let downZeroFound = false;
    let leftZeroFound = false;
    let rightZeroFound = false;

    let looped = false;
    let steps = 0

    while(stillWalking && steps < 20000){
        let result: CoordinateWithZeroCheck | undefined = undefined;
        
        if(startingPoint?.character === "^"){
            result = handleMovingUp(mazeData, startingPoint, notAllowedCoordinate);

            if(result){
                if(result.zeroHit){
                    if(upZeroFound){
                        stillWalking = false;
                        looped = true;
                    } else {
                        upZeroFound = true;
                    }
                    
                }
            }

        } else if (startingPoint?.character === "v"){
            result = handleMovingDown(mazeData, startingPoint, notAllowedCoordinate);

            if(result){
                if(result.zeroHit){
                    if(downZeroFound){
                        stillWalking = false;
                        looped = true;
                    } else {
                        downZeroFound = true;
                    }
                    
                }
            }
            
        } else if (startingPoint?.character === "<"){
            result = handleMovingLeft(mazeData, startingPoint, notAllowedCoordinate);
            if(result){
                if(result.zeroHit){
                    if(leftZeroFound){
                        stillWalking = false;
                        looped = true;
                    } else {
                        leftZeroFound = true;
                    }
                    
                }
            }
            
        } else if (startingPoint?.character === ">"){
            result = handleMovingRight(mazeData, startingPoint, notAllowedCoordinate);

            if(result){
                if(result.zeroHit){
                    if(rightZeroFound){
                        stillWalking = false;
                        looped = true;
                    } else {
                        rightZeroFound = true;
                    }
                    
                }
            }
        }

        if(result) {
            startingPoint = result.coordinate;
            steps++;
        } else {
            stillWalking = false;
        }
    }
    
    if(steps === 20000){
        console.log("-----------------------------------------------------------------------------------------------------------------");
        return true;
    }

    return looped;
}


const handleMovingUp = (mazeData: MazeData[], currentCoordinate: Coordinate, notAllowedCoordinate? : Coordinate): CoordinateWithZeroCheck | undefined => {
    const yData = mazeData.find(c => c.y === currentCoordinate.y - 1);

    if(!yData){
        return undefined;
    }
    
    const xData = yData?.row[currentCoordinate.x];

    if(!xData){
        return undefined;
    }

    let nextCoordinate: Coordinate = {x: currentCoordinate.x, y: yData?.y, character: xData!};

    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y){
        currentCoordinate!.character = ">";

        console.log("hit");

        return { coordinate: currentCoordinate, zeroHit: true };
    } 

    else if(nextCoordinate?.character === "#"){
        currentCoordinate!.character = ">";

        return { coordinate: currentCoordinate, zeroHit: false };
    } 
    
    else {
        nextCoordinate.character = "^";

        return { coordinate: nextCoordinate, zeroHit: false };
    }
}

const handleMovingDown = (mazeData: MazeData[], currentCoordinate: Coordinate, notAllowedCoordinate? : Coordinate): CoordinateWithZeroCheck | undefined => {
    const yData = mazeData.find(c => c.y === currentCoordinate.y + 1);

    if(!yData){
        return undefined;
    }

    const xData = yData?.row[currentCoordinate.x];

    if(!xData){
        return undefined;
    }

    let nextCoordinate: Coordinate = {x: currentCoordinate.x, y: yData?.y, character: xData!};

    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y){
        currentCoordinate!.character = "<";
       
        console.log("hit");

        return { coordinate: currentCoordinate, zeroHit: true };
    } 

    else if(nextCoordinate?.character === "#" ){
        currentCoordinate!.character = "<";

        return { coordinate: currentCoordinate, zeroHit: false };
    } 
    
    else {
        nextCoordinate.character = "v";
        return { coordinate: nextCoordinate, zeroHit: false };
    }

}

const handleMovingLeft = (mazeData: MazeData[], currentCoordinate: Coordinate, notAllowedCoordinate? : Coordinate): CoordinateWithZeroCheck | undefined => {
    const yData = mazeData.find(c => c.y === currentCoordinate.y);

    if(!yData){
        return undefined;
    }

    const xData = yData?.row[currentCoordinate.x - 1];

    if(!xData){
        return undefined;
    }

    let nextCoordinate: Coordinate = {x: currentCoordinate.x - 1, y: yData?.y, character: xData!};

    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y){
        currentCoordinate!.character = "^";

        console.log("hit");
        
        return { coordinate: currentCoordinate, zeroHit: true };
    } 

    else if(nextCoordinate?.character === "#"){
        currentCoordinate!.character = "^";

        return { coordinate: currentCoordinate, zeroHit: false };
    } 
    
    else {
        nextCoordinate.character = "<";
        return { coordinate: nextCoordinate, zeroHit: false };
    }

}

const handleMovingRight = (mazeData: MazeData[], currentCoordinate: Coordinate, notAllowedCoordinate? : Coordinate): CoordinateWithZeroCheck | undefined => {
    const yData = mazeData.find(c => c.y === currentCoordinate.y);

    if(!yData){
        return undefined;
    }
    const xData = yData?.row[currentCoordinate.x + 1];

    if(!xData){
        return undefined;
    }

    let nextCoordinate: Coordinate = {x: currentCoordinate.x + 1, y: yData.y, character: xData};

    if (notAllowedCoordinate && nextCoordinate.x === notAllowedCoordinate.x && nextCoordinate.y === notAllowedCoordinate.y){
        currentCoordinate!.character = "v";

        console.log("hit");
        
        return { coordinate: currentCoordinate, zeroHit: true };
    } 

    else if(nextCoordinate?.character === "#"){
        currentCoordinate!.character = "v";

        return { coordinate: currentCoordinate, zeroHit: false };
    } 
    
    else {
        nextCoordinate.character = ">";
        return { coordinate: nextCoordinate, zeroHit: false };
    }

}

const GetData = (): MazeData[] => {

    const tempData: string[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        tempData.push(line);
    });

    let mazeData: MazeData[] = [];
    tempData.forEach((element, index) => {
        let row = "";

        if(element.includes("\r")){
            row = element.split("\r")[0];
        } else {
            row = element;
        }

        mazeData.push({row: row, y: index});
    })
  
    return mazeData;
}


let data = GetData();
let startingPoint: Coordinate = {x: 96, y: 41, character: "^"}; //input file
// let startingPoint: Coordinate = {x: 4, y: 6, character: "^"}; //test fle

// movingOutOfMaze(data, startingPoint);

let x = 0;
let y = 0;

let maxX = 130; //10 test file, 130 input file
let maxY = 130; //10 test file, 130 input file
let maxIndex = 16900; //100 test file, 16900 input file
let total = 0;

for (let index = 0; index < maxIndex; index++) {

    console.log("index", index);
    const cr: Coordinate = {x: x, y: y, character: ""};

    //skip starting point
    if(cr.x === startingPoint?.x && cr.y === startingPoint?.y){
        cr.x++;
    }

    const looped = movingInLoop(data, startingPoint, cr);

    if(looped){
        total++;
    }

    x++; 
    if(x === maxX){
        x = 0;
        y++;
    }

    if(y === maxY){
        console.log("max y", y, index);
        break;
    }
}

console.log(total);


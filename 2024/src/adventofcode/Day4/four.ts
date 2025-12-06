import * as fs from 'fs';

interface Coordinate {
    x: number;
    y: number;
    character: string;
}

const XmasFinderOne = () => {
    let twoDimArray = createTwoDimArray(GetData());
    let totalXmasFound = 0;

    twoDimArray.forEach(element => {
        totalXmasFound += checkLeftToRightXmas(twoDimArray, element);
        totalXmasFound += checkRightToLeftXmas(twoDimArray, element);
        totalXmasFound += checkTopToBottomXmas(twoDimArray, element);
        totalXmasFound += checkBottomToTopXmas(twoDimArray, element);
        totalXmasFound += checkLeftTopToRightBottomXmas(twoDimArray, element);
        totalXmasFound += checkRightTopToLeftBottomXmas(twoDimArray, element);
        totalXmasFound += checkLeftBottomToRightTopXmas(twoDimArray, element);
        totalXmasFound += checkRightBottomToLeftTopXmas(twoDimArray, element);
    });

    console.log(totalXmasFound);
}

const XmasFinderTwo = () => {
    let twoDimArray = createTwoDimArray(GetData());
    let totalXmasFound = 0;

    twoDimArray.forEach(element => {
        let firstCheck = checkLeftTopToRightBottomMas(twoDimArray, element);
        if(firstCheck){
            let newElementOne = twoDimArray.find(c => c.x === element.x + 2 && c.y === element.y);

            if(newElementOne){
                let foundOne = checkRightTopToLeftBottomMas(twoDimArray, newElementOne);
                totalXmasFound += foundOne ? 1 : 0;
            }

            let newElementTwo = twoDimArray.find(c => c.x === element.x && c.y === element.y + 2);

            if(newElementTwo){
                let foundTwo = checkLeftBottomToRightTopMas(twoDimArray, newElementTwo);
                totalXmasFound += foundTwo ? 1 : 0;
            }
        }

        let fourthCheck = checkRightBottomToLeftTopMas(twoDimArray, element);
        if(fourthCheck){
            let newElementOne = twoDimArray.find(c => c.x === element.x -2 && c.y === element.y);
            if(newElementOne){
                let foundOne = checkLeftBottomToRightTopMas(twoDimArray, newElementOne);
                totalXmasFound += foundOne ? 1 : 0;
            }

            let newElementTwo = twoDimArray.find(c => c.x === element.x && c.y === element.y - 2);
            if(newElementTwo){
                let foundTwo = checkRightTopToLeftBottomMas(twoDimArray, newElementTwo);
                totalXmasFound += foundTwo ? 1 : 0;
            }
        }
    });

    console.log(totalXmasFound);
}

const createTwoDimArray = (lines: string[]): Coordinate[] => {
    let coordinateArray: Coordinate[] = [];
    let currentRow = 0;
    lines.forEach(element => {
        for (let index = 0; index < element.length; index++) {
            let coordinate: Coordinate = {x: index, y: currentRow, character: element[index]};

            coordinateArray.push(coordinate);
        }

        currentRow++;
    })

    return coordinateArray;
}

const checkLeftToRightXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x + 1 && c.y === toCheck.y)?.character + 
        twoDimArray.find(c => c.x === toCheck.x + 2 && c.y === toCheck.y)?.character +
        twoDimArray.find(c => c.x === toCheck.x + 3 && c.y === toCheck.y)?.character;

    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkRightToLeftXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x - 1 && c.y === toCheck.y)?.character + 
        twoDimArray.find(c => c.x === toCheck.x - 2 && c.y === toCheck.y)?.character +
        twoDimArray.find(c => c.x === toCheck.x - 3 && c.y === toCheck.y)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkTopToBottomXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x && c.y === toCheck.y + 1)?.character + 
        twoDimArray.find(c => c.x === toCheck.x && c.y === toCheck.y + 2)?.character +
        twoDimArray.find(c => c.x === toCheck.x && c.y === toCheck.y + 3)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkBottomToTopXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x && c.y === toCheck.y - 1)?.character + 
        twoDimArray.find(c => c.x === toCheck.x && c.y === toCheck.y - 2)?.character +
        twoDimArray.find(c => c.x === toCheck.x && c.y === toCheck.y - 3)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}


const checkLeftTopToRightBottomXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x + 1 && c.y === toCheck.y + 1)?.character + 
        twoDimArray.find(c => c.x === toCheck.x + 2 && c.y === toCheck.y + 2)?.character +
        twoDimArray.find(c => c.x === toCheck.x + 3 && c.y === toCheck.y + 3)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkRightTopToLeftBottomXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x - 1 && c.y === toCheck.y + 1)?.character + 
        twoDimArray.find(c => c.x === toCheck.x - 2 && c.y === toCheck.y + 2)?.character +
        twoDimArray.find(c => c.x === toCheck.x - 3 && c.y === toCheck.y + 3)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkLeftBottomToRightTopXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x + 1 && c.y === toCheck.y - 1)?.character + 
        twoDimArray.find(c => c.x === toCheck.x + 2 && c.y === toCheck.y - 2)?.character +
        twoDimArray.find(c => c.x === toCheck.x + 3 && c.y === toCheck.y - 3)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkRightBottomToLeftTopXmas = (twoDimArray: Coordinate[], toCheck: Coordinate) : number => {
    let xmasword = '';

    if(toCheck.character !== "X"){
        return 0;
    }

    xmasword = toCheck.character + 
        twoDimArray.find(c => c.x === toCheck.x - 1 && c.y === toCheck.y - 1)?.character + 
        twoDimArray.find(c => c.x === toCheck.x - 2 && c.y === toCheck.y - 2)?.character +
        twoDimArray.find(c => c.x === toCheck.x - 3 && c.y === toCheck.y - 3)?.character;
    
    if(xmasword === "XMAS"){
        return 1;
    }

    return 0;
}

const checkLeftTopToRightBottomMas = (twoDimArray: Coordinate[], toCheck: Coordinate) : boolean => {
    let xmasword = '';
    if(toCheck.character !== "M"){
        return false;
    }

    let cOne = twoDimArray.find(c => c.x === toCheck.x + 1 && c.y === toCheck.y + 1);
    let cTwo = twoDimArray.find(c => c.x === toCheck.x + 2 && c.y === toCheck.y + 2);

    xmasword = toCheck.character + cOne?.character + cTwo?.character;
    
    if(xmasword === "MAS"){
        return true;
    }

    return false;
}

const checkRightTopToLeftBottomMas = (twoDimArray: Coordinate[], toCheck: Coordinate) : boolean => {
    let xmasword = '';

    if(toCheck.character !== "M"){
        return false;
    }

    let cOne = twoDimArray.find(c => c.x === toCheck.x - 1 && c.y === toCheck.y + 1);
    let cTwo = twoDimArray.find(c => c.x === toCheck.x - 2 && c.y === toCheck.y + 2);

    xmasword = toCheck.character + cOne?.character + cTwo?.character;

    if(xmasword === "MAS"){
        return true;
    }

    return false;
}

const checkLeftBottomToRightTopMas = (twoDimArray: Coordinate[], toCheck: Coordinate) : boolean => {
    let xmasword = '';

    
    if(toCheck.character !== "M"){
        return false;
    }

    let cOne = twoDimArray.find(c => c.x === toCheck.x + 1 && c.y === toCheck.y - 1);
    let cTwo = twoDimArray.find(c => c.x === toCheck.x + 2 && c.y === toCheck.y - 2);
        
    xmasword = toCheck.character + cOne?.character + cTwo?.character;
    
    if(xmasword === "MAS"){
        return true;
    }

    return false;
}

const checkRightBottomToLeftTopMas = (twoDimArray: Coordinate[], toCheck: Coordinate) : boolean => {
    let xmasword = '';

    if(toCheck.character !== "M"){
        return false;
    }

    let cOne = twoDimArray.find(c => c.x === toCheck.x - 1 && c.y === toCheck.y - 1);
    let cTwo = twoDimArray.find(c => c.x === toCheck.x - 2 && c.y === toCheck.y - 2);

    xmasword = toCheck.character + cOne?.character + cTwo?.character;
    
    if(xmasword === "MAS"){
        return true;
    }

    return false;
}

const GetData = (): string[] => {

    const data: string[] = [];
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        data.push(line);
    });
  
    return data;
}

XmasFinderOne();
XmasFinderTwo();






import * as fs from 'fs';

interface Coordinate {
    x: number;
    y: number;
    character: string;
}

interface CharacterLocation {
    char: string;
    coordinates: Coordinate[];
}

const GetData = (): Coordinate[] => {
    let y = -1;
    let coordinates: Coordinate[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        y++;

        for (let index = 0; index < line.length; index++) {
            const character = line[index];

            if(character !== "\r"){
                coordinates.push({y: y, x: index, character: character});
            }
        }
    });

    return coordinates;
}

const findAllDifferentCharacters = (coordinates: Coordinate[]): string[] => {
    let chars: string[] = [];
    let characters = coordinates.map(c => c.character);

    characters.forEach(c =>{
        if(chars.findIndex(x => x === c) === -1 && c !== "."){
            chars.push(c);
        }
    })
    
    return chars;
}

const findAllCoordinatesPerCharacter = (coordinates: Coordinate[], character: string[]): CharacterLocation[] => {
    let characterLocations: CharacterLocation[] = [];

    character.forEach(c => {
        let coords = coordinates.filter(x => x.character === c);

        characterLocations.push({char: c, coordinates: coords});
    });

    return characterLocations;
}

const findCoordinatesWithSignalsPartOne = (characterLocations: CharacterLocation[]): Coordinate[] => {
    let signals: Coordinate[] = [];
    let lowest = 0;
    let highest = 49;

    characterLocations.forEach(c => {

        c.coordinates.forEach(coord => {
            let otherCoords = c.coordinates.filter(x => x !== coord);

            otherCoords.forEach(otherCoord => {
                let differenceInX = Math.abs(coord.x - otherCoord.x);
                let differenceInY = Math.abs(coord.y - otherCoord.y);
                
                let coordinateOne = createSignalLocation(coord, otherCoord, differenceInX, differenceInY);

                if(coordinateOne.x >= lowest &&  coordinateOne.x <= highest && coordinateOne.y >= lowest && coordinateOne.y <= highest){
                    if(signals.findIndex(x => x.x === coordinateOne.x && x.y === coordinateOne.y) === -1){
                        signals.push(coordinateOne);
                    }
                } 

                let coordinateTwo = createSignalLocation(otherCoord, coord, differenceInX, differenceInY);

                if(coordinateTwo.x >= lowest &&  coordinateTwo.x <= highest && coordinateTwo.y >= lowest && coordinateTwo.y <= highest){
                    if(signals.findIndex(x => x.x === coordinateTwo.x && x.y === coordinateTwo.y) === -1){
                        signals.push(coordinateTwo);
                    }
                }
            });
        })
    });

    return signals;
}

const findCoordinatesWithSignalsPartTwo = (characterLocations: CharacterLocation[]): Coordinate[] => {
    let signals: Coordinate[] = [];
    

    characterLocations.forEach(c => {
        c.coordinates.forEach(coord => {
            let otherCoords = c.coordinates.filter(x => x !== coord);

            //location of antenna becomes a signal as well
            if(otherCoords.length > 0){
                if(signals.findIndex(x => x.x === coord.x && x.y === coord.y) === -1){
                    signals.push(coord);
                }
            }
            otherCoords.forEach(otherCoord => {
                let differenceInX = Math.abs(coord.x - otherCoord.x);
                let differenceInY = Math.abs(coord.y - otherCoord.y);
                
                loopSignalLocationsUntilOutOfBounds(signals, differenceInX, differenceInY, coord, otherCoord);
                loopSignalLocationsUntilOutOfBounds(signals, differenceInX, differenceInY, otherCoord, coord);
            });
        })
    });

    return signals;
}

const loopSignalLocationsUntilOutOfBounds = (signals: Coordinate[], differenceInX: number, differenceInY: number, coordOne: Coordinate, coordTwo: Coordinate) => {
    let lowest = 0;
    let highest = 49;

    let newCoordinate = createSignalLocation(coordOne, coordTwo, differenceInX, differenceInY);

    if(newCoordinate.x >= lowest && newCoordinate.x <= highest && newCoordinate.y >= lowest && newCoordinate.y <= highest){
        if(signals.findIndex(x => x.x === newCoordinate.x && x.y === newCoordinate.y) === -1){
            signals.push(newCoordinate);
        }

        loopSignalLocationsUntilOutOfBounds(signals, differenceInX, differenceInY, newCoordinate, coordTwo);
    } 
}

const createSignalLocation = (towerLocationOne: Coordinate, towerLocationTwo: Coordinate, differenceInX: number, differenceInY: number): Coordinate => {
    let coord: Coordinate = {x: 0, y: 0, character: towerLocationOne.character};

    if(towerLocationOne.x > towerLocationTwo.x){
        coord.x = towerLocationOne.x + differenceInX;
    } else {
        coord.x = towerLocationOne.x - differenceInX;
    }

    if(towerLocationOne.y > towerLocationTwo.y){
        coord.y = towerLocationOne.y + differenceInY;
    } else {
        coord.y = towerLocationOne.y - differenceInY;
    }

    return coord;
}

let data = GetData();
let characters = findAllDifferentCharacters(data);
let characterLocations = findAllCoordinatesPerCharacter(data, characters);

// let signalLocations = findCoordinatesWithSignalsPartOne(characterLocations).sort((a, b) => a.x - b.x);
// console.log(signalLocations);
// console.log(signalLocations.length);

let signalLocations2 = findCoordinatesWithSignalsPartTwo(characterLocations).sort((a, b) => a.x - b.x);
console.log(signalLocations2);
console.log(signalLocations2.length);



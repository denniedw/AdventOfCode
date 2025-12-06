import * as fs from 'fs';

interface Coord {
    x: number;
    y: number;
    value: string;
    willBeRemovedAfterRound: boolean;
}

const PartOne = (data: Coord[]) => {
    let removedObjects = 0;

    data.forEach(coord => {
        if(coord.value !== '@'){
            return;
        }

        let surroundingObjects = 0;

        surroundingObjects += DoesCoordOnTopHaveObject(coord, data);
        surroundingObjects += DoesCoordOnBottomHaveObject(coord, data);
        surroundingObjects += DoesCoordOnRightHaveObject(coord, data);
        surroundingObjects += DoesCoordOnLeftHaveObject(coord, data);
        surroundingObjects += DoesCoordOnLeftTopHaveObject(coord, data);
        surroundingObjects += DoesCoordOnRightTopHaveObject(coord, data);
        surroundingObjects += DoesCoordOnLeftBottomHaveObject(coord, data);
        surroundingObjects += DoesCoordOnRightBottomHaveObject(coord, data);

        if(surroundingObjects < 4){
            coord.value = 'X';
            removedObjects++;
        }
    });

    console.log(removedObjects);
}

const PartTwo = (data: Coord[]) => {
    let removedObjects = 0;
    let continueRemoving = true;

    while (continueRemoving){
        continueRemoving = false;
        let removedThisRound = 0;

        data.forEach(coord => {
            if(coord.value !== '@'){
                return;
            }

            let surroundingObjects = 0;
            

            surroundingObjects += DoesCoordOnTopHaveObject(coord, data);
            surroundingObjects += DoesCoordOnBottomHaveObject(coord, data);
            surroundingObjects += DoesCoordOnRightHaveObject(coord, data);
            surroundingObjects += DoesCoordOnLeftHaveObject(coord, data);
            surroundingObjects += DoesCoordOnLeftTopHaveObject(coord, data);
            surroundingObjects += DoesCoordOnRightTopHaveObject(coord, data);
            surroundingObjects += DoesCoordOnLeftBottomHaveObject(coord, data);
            surroundingObjects += DoesCoordOnRightBottomHaveObject(coord, data);

            if(surroundingObjects < 4){
                coord.willBeRemovedAfterRound = true;
                removedThisRound++;
            }
        });

        if(data.find(d => d.willBeRemovedAfterRound)){
            continueRemoving = true;

            data.forEach(d => {
                 if(d.willBeRemovedAfterRound){
                    d.value = '.';
                    d.willBeRemovedAfterRound = false;
                }
            });
        };

        console.log('Removed this round: ' + removedThisRound);
        removedObjects += removedThisRound;
    }

    console.log("Total removed: " + removedObjects);
}

const DoesCoordOnTopHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x && c.y === coord.y - 1);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }

    return 0;
}

const DoesCoordOnBottomHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x && c.y === coord.y + 1);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }
    
    return 0;
}

const DoesCoordOnRightHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x + 1 && c.y === coord.y);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }
    
    return 0;
}

const DoesCoordOnLeftHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x - 1 && c.y === coord.y);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }
    
    return 0;
}

const DoesCoordOnLeftTopHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x - 1 && c.y === coord.y - 1);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }

    return 0;
}

const DoesCoordOnRightTopHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x + 1 && c.y === coord.y - 1);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }
    
    return 0;
}

const DoesCoordOnLeftBottomHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x - 1 && c.y === coord.y + 1);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }
    
    return 0;
}

const DoesCoordOnRightBottomHaveObject = (coord: Coord, data: Coord[]): number => {
    const c = data.find(c => c.x === coord.x + 1 && c.y === coord.y + 1);
    if(c && (c.value === '@' || c.value === 'X')){
        return 1;
    }
    
    return 0;
}

const GetData = (): Coord[] => {
    let data: string[] = [];
    let coords: Coord[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        data.push(line.trim());
    });

    data.forEach(line => {
        let chars = line.split('');
        chars.forEach((c, i) => {
            coords.push({x: i, y: data.indexOf(line), value: c, willBeRemovedAfterRound: false});
        });
    })

    return coords;
}

PartOne(GetData());
PartTwo(GetData());
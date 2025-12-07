import * as fs from 'fs';

interface Coord {
    x: number;
    y: number;
    value: string;
}

const PartOne = (data: Coord[]) => {
    let higestX = Math.max(...data.map(d => d.x));
    let highestY = Math.max(...data.map(d => d.y));

    let splits = 0;
    for(let i = 0; i < highestY; i++){
        for(let j = 0; j < higestX; j++){
            let coord = data.find( d=> d.x === j && d.y === i)!;

            let coordAboveCoord = data.find( d=> d.x === j && d.y === i -1);
            let coordLeftOfCoord = data.find( d=> d.x === j - 1 && d.y === i);
            let coordRightOfCoord = data.find( d=> d.x === j + 1 && d.y === i);

            if(coordAboveCoord){
                if(coordAboveCoord.value === 'S'){
                    coord.value = '|';
                } else if (coordAboveCoord.value === '|') {
                    if(coord.value === '.'){
                        coord.value = '|';
                    } else if (coord.value === '^') {
                        splits++;
                        if(coordLeftOfCoord && coordLeftOfCoord.value === '.'){
                            coordLeftOfCoord.value = '|';
                        }
                        if(coordRightOfCoord && coordRightOfCoord.value === '.'){
                            coordRightOfCoord.value = '|';
                        }
                    }
                }
            }
        }
        console.log(data.filter(d => d.y === i).map(d => d.value).join(''));
    }

    console.log(splits);
}

// Had some help from reddit, since i could not figure out how to do this without recursion, which takes way to long
const PartTwo = (data: Coord[]) => {
    let higestX = Math.max(...data.map(d => d.x));
    let highestY = Math.max(...data.map(d => d.y));

    let total = 0;
    for(let i = 0; i < highestY; i++){
        for(let j = 0; j < higestX; j++){
            let coord = data.find( d=> d.x === j && d.y === i)!;

            let coordAboveCoord = data.find( d=> d.x === j && d.y === i -1);
            let coordLeftOfCoord = data.find( d=> d.x === j - 1 && d.y === i);
            let coordRightOfCoord = data.find( d=> d.x === j + 1 && d.y === i);

            if(coordAboveCoord){
                if(coordAboveCoord.value === 'S'){
                    coord.value = '1';
                }

                else if(coordAboveCoord.value === '^' || coordAboveCoord.value === '.'){
                    // do nothing
                }
                else {
                    // coord above must be a number now
                    if(coord.value === '.'){
                        coord.value = coordAboveCoord.value;
                    }

                    else if(coord.value === '^'){
                        if(coordLeftOfCoord){
                            coordLeftOfCoord.value = coordLeftOfCoord.value === '.' ? coordAboveCoord.value : (parseInt(coordLeftOfCoord.value) + parseInt(coordAboveCoord.value)).toString();
                        }
                        if(coordRightOfCoord){
                            coordRightOfCoord.value = coordRightOfCoord.value === '.' ? coordAboveCoord.value : (parseInt(coordRightOfCoord.value) + parseInt(coordAboveCoord.value)).toString();
                        }
                    }

                    else {

                        if(coordLeftOfCoord && coordLeftOfCoord.value === '^' && coordRightOfCoord && coordRightOfCoord.value === '^'){
                            if(coordAboveCoord.value !== '.' && coordAboveCoord.value !== '^'){
                                coord.value = (parseInt(coord.value) + parseInt(coordAboveCoord.value)).toString();
                            }
                        }
                        else if(coordLeftOfCoord && coordLeftOfCoord.value === '^'){
                            if(coordAboveCoord.value !== '.' && coordAboveCoord.value !== '^'){
                                coord.value = (parseInt(coord.value) + parseInt(coordAboveCoord.value)).toString();
                            }
                        }
                        else if(coordRightOfCoord && coordRightOfCoord.value === '^'){
                            if(coordAboveCoord.value !== '.' && coordAboveCoord.value !== '^'){
                                coord.value = (parseInt(coord.value) + parseInt(coordAboveCoord.value)).toString();
                            }
                        }
                    }
                }
            }
        }
    }

    data.filter(d => d.y === highestY - 1).forEach(d => {
        if(d.value !== '.' && d.value !== '^'){
            total += parseInt(d.value);
        }
    })

    console.log(total);
}

const GetData = (): Coord[] => {
    let data: string[] = [];
    let coords: Coord[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        data.push(line.trim());
    });

    data.forEach((line, index) => {
        let chars = line.split('');
        chars.forEach((c, i) => {
            coords.push({x: i, y: index, value: c});
        });
    })

    return coords;
}

PartOne(GetData());
PartTwo(GetData());
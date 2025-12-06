import * as fs from 'fs';

interface sum {
    numberOne: string;
    numberTwo: string;
    numberThree: string;
    numberFour: string;
    symbol: string;
}

const PartOne = (data: sum[]) => {
    let total = 0;

    data.forEach(entry => {
        let sumTotal = 0;
        const numberOne = parseInt(entry.numberOne.trim());
        const numberTwo = parseInt(entry.numberTwo.trim());
        const numberThree = parseInt(entry.numberThree.trim());
        const numberFour = parseInt(entry.numberFour.trim());
        const symbol = entry.symbol.trim();

        if(symbol === '+'){
            sumTotal = (numberOne + numberTwo + numberThree + numberFour);
            total += sumTotal;
        }   

        if(symbol === '*'){
            sumTotal = (numberOne * numberTwo * numberThree * numberFour);
            total += sumTotal;
        }
    });

    console.log(total);
}

const PartTwo = (data: sum[]) => {
    let total = 0;

    data.forEach(entry => {
        let sumTotal = 0;
        let entryLength = entry.numberOne.length;
        let numbers: number[] = [];
        let symbol = entry.symbol.trim();

        for(let i = 0; i < entryLength; i++){
            let joinedNumber = (entry.numberOne[i]+entry.numberTwo[i]+entry.numberThree[i]+entry.numberFour[i]).trim();
            numbers.push(+joinedNumber);
        }

        if(symbol === '+'){
            sumTotal = numbers.reduce((a, b) => a + b, 0);
            total += sumTotal;
        } else {
            sumTotal = numbers.reduce((a, b) => a * b, 1);
            total += sumTotal;
        }
    });

    console.log(total);
}

const GetData = (): sum[] => {
    let lines: string[] = [];
    let sums: sum[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        lines.push(line.replace(/\r/g, ''));
    });

    let lastIndex = lines[0].length - 1;

    let newSum: sum = { numberOne: '', numberTwo: '', numberThree: '', numberFour: '', symbol: ''};
    for(let i = 0; i <= lastIndex; i++){
        const entryOne = lines[0][i];
        const entryTwo = lines[1][i];
        const entryThree = lines[2][i];
        const entryFour = lines[3][i];        
        const entryFive = lines[4][i];

        // all spaces
        if(entryOne === ' ' && entryTwo === ' ' && entryThree === ' ' && entryFour === ' ' && entryFive === ' '){
            sums.push(newSum);
            newSum = { numberOne: '', numberTwo: '', numberThree: '', numberFour: '', symbol: ''};
        } else {
            newSum.numberOne += entryOne;
            newSum.numberTwo += entryTwo;
            newSum.numberThree += entryThree;
            newSum.numberFour += entryFour;
            newSum.symbol += entryFive;
        }
    }

    // after loop push last created object
    sums.push(newSum);

    return sums;
}

PartOne(GetData());
PartTwo(GetData());

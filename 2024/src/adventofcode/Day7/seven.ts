import * as fs from 'fs';

interface SumData {
    answer: number;
    numbers: number[];
}

interface MatchedSum {
    answer: number;
    sumString: string;
}

const generateCombinations = (chars: string, length: number): string[] => {
    const results: string[] = [];

    const generate = (prefix: string, remainingLength: number) => {
        if (remainingLength === 0) {
            results.push(prefix);

            return;
        }

        for (let i = 0; i < chars.length; i++) {
            generate(prefix + chars[i], remainingLength - 1);
        }
    };

    generate('', length);

    return results;
};

const calculateSums = (sums: SumData[], characters: string) : MatchedSum[] => {
    let matchedSums: MatchedSum[] = [];

    sums.forEach(sum => {
        let possibleCombinations = generateCombinations(characters, sum.numbers.length - 1);
        let correctSumFound = false;

        possibleCombinations.forEach(combination => {
            if(!correctSumFound){
                let tempResult = sum.numbers[0];
                let createdMathString = sum.numbers[0].toString();
    
                for (let index = 0; index < sum.numbers.length - 1; index++) {
                    let character = combination[index];

                    if(character === "|"){
                        tempResult = parseInt(`${tempResult}${sum.numbers[index + 1]}`);
                    } else {
                        let mathString = tempResult + combination[index] + sum.numbers[index + 1];
    
                        createdMathString += combination[index] + sum.numbers[index + 1];
                        tempResult = eval(mathString);
                    }
                    
                }
    
                if(tempResult === sum.answer){
                    console.log("Match found");
                    matchedSums.push({answer: sum.answer, sumString: createdMathString});
                    correctSumFound = true;
                }
            }
        })
    });

    return matchedSums;
}

const GetData = (): SumData[] => {

    let sums: SumData[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        let devisions = line.split(":");
        let answer = devisions[0];
        let numbers = devisions[1].split(" ");

        let sum: SumData = { answer: parseInt(answer), numbers: numbers.map(x => parseInt(x)) };

        sum.numbers = sum.numbers.slice(1);

        sums.push(sum);
    });

    return sums;
}

let sums = GetData();

const PartOne = () => {
    let matchedSums = calculateSums(sums, "+*");
    let total = 0;

    matchedSums.forEach(sum => {
        console.log(sum.answer , sum.sumString);
        total += sum.answer;
    });
    
    console.log(total);

    //12553187650171
}

const PartTwo = () => {
    let matchedSums = calculateSums(sums, "+*|");

    let total = 0;

    matchedSums.forEach(sum => {
        console.log(sum.answer , sum.sumString);
        total += sum.answer;
    });
    
    console.log(total);
}

PartTwo();








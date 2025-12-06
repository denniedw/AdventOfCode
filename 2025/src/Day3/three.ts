import * as fs from 'fs';

const PartOne = (data: string[]) => {
    let joltAmount = 0;

    data.forEach(line => {
        let firstFoundHighestNumber: number = 0;
        let firstFoundHighestNumberIndex: number = 0;

        let secondFoundHighestNumber: number = 0;
        // first number cannot be the last number in the line, since cant grab a second number then
        for(let i = 0; i < line.length - 1 ; i++){
            const currentNumber = +line.charAt(i);

            if(currentNumber > firstFoundHighestNumber){
                firstFoundHighestNumber = currentNumber;
                firstFoundHighestNumberIndex = i;
            }
        };

        for(let i = firstFoundHighestNumberIndex + 1; i <= line.length; i++){
            const currentNumber = +line.charAt(i);

            if(currentNumber > secondFoundHighestNumber){
                secondFoundHighestNumber = currentNumber;
            }
        }

        const jolt: number = +`${firstFoundHighestNumber}${secondFoundHighestNumber}`;

        joltAmount += jolt;
    });

    console.log(joltAmount);
}

const PartTwo = (data: string[]) => {
    let joltAmount = 0;

    data.forEach(line => {
        let jolts = '';
        let chars = line.split('').map(c => +c);

        for(let i = 0; i < 12; i++){
            let startIndex = 0;

            let searchIn = chars.slice(startIndex, chars.length - (11 - i));
            const highestNumber = Math.max(...searchIn);
            const firstOccurence = chars.find(c => c === highestNumber)!;
            jolts += firstOccurence.toString();

            chars = chars.slice(chars.indexOf(firstOccurence) + 1, chars.length);
        }

        joltAmount += +jolts;
        console.log(jolts);
    });

    console.log(joltAmount);
}



const GetData = (): string[] => {
    let data: string[] = [];

  fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
    data.push(line.trim());
  });

  return data;
}

//PartOne(GetData());
PartTwo(GetData());
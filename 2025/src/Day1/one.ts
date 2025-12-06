import * as fs from 'fs';

interface Data {
  dialTurns: string[];
}

const PartOne = (data: Data)=> {
    let endedAtZero = 0;
    let currentNumber = 50;

    data.dialTurns.forEach(turn => {
        const direction = turn.charAt(0);
        const goingLeft = direction === 'L' ? true : false;
        const amount = +turn.slice(1);
        const remainder = amount % 100;

        if(goingLeft){
            currentNumber -= remainder;
            if(currentNumber < 0) {
                currentNumber = currentNumber + 100;
            }
        }else {
            currentNumber += remainder;
            if(currentNumber > 99){
                currentNumber = currentNumber - 100;
            }
        }

        if(currentNumber === 0){
            endedAtZero++;
        }
    });

    console.log(endedAtZero);
}

const PartTwo = (data: Data) => {
    let passedOrEndedAtZero = 0;
    let currentNumber = 50;

    data.dialTurns.forEach(turn => {
        const direction = turn.charAt(0);
        const goingLeft = direction === 'L' ? true : false;
        const amount = +turn.slice(1);

        let fullRoundTimes = Math.floor(amount / 100);
        const remainder = amount % 100;
            
        if(goingLeft){
            currentNumber -= remainder;
            if(currentNumber < 0) {
                currentNumber = currentNumber + 100;
                // not passing it, only ending on it, is handled on line 74
                if(currentNumber !== 0 && currentNumber + remainder !== 100){
                    passedOrEndedAtZero++;
                }
            }
        }else {
            currentNumber += remainder;
            if(currentNumber > 99){
                currentNumber = currentNumber - 100;
                // not passing it, only ending on it, is handled on line 74
                if(currentNumber !== 0 && currentNumber - remainder !== 0){
                    passedOrEndedAtZero++;
                }
                
            }
        }

        if(currentNumber === 0){
            passedOrEndedAtZero++;
        }

        passedOrEndedAtZero += fullRoundTimes;
    });

    console.log(passedOrEndedAtZero);
}

const GetData = (): Data => {
  let data: Data = { dialTurns: [] };

  fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
    data.dialTurns.push(line);
  });

  return data;
}

PartOne(GetData());
PartTwo(GetData());
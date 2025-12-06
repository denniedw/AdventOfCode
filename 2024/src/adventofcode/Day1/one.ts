import * as fs from 'fs';

interface Data {
  leftNumbers: number[];
  rightNumbers: number[];
}

const CalcDistances = () => {
  let difference = 0;
  let data = GetData();
  data.leftNumbers.sort((a,b) => a-b);
  data.rightNumbers.sort((a,b) => a-b);

  for (let index = 0; index < data.leftNumbers.length; index++) {
    let diff = data.leftNumbers[index] - data.rightNumbers[index];
    console.log(data.leftNumbers[index] , "-", data.rightNumbers[index]);

    if(diff < 0) {
      diff = diff * -1;
    }

    difference += diff;
  }

  console.log('difference', difference);
}

const CalcDistancesTwo = () => {
  let total = 0;
  let data = GetData();
  data.leftNumbers.sort((a,b) => a-b);
  data.rightNumbers.sort((a,b) => a-b);

  data.leftNumbers.forEach(n => {
    let times = data.rightNumbers.filter(m => m === n).length;

    if(times > 0){
      let result = n * times;

      total += result;
    }
  });

  console.log(total);
}

const GetData = (): Data => {
  let data: Data = { leftNumbers: [], rightNumbers: [] };

  fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
    const stringArray = line.split("   ");
    data.leftNumbers.push(+stringArray[0]);
    data.rightNumbers.push(+stringArray[1]);
  });

  return data;
}

CalcDistances();
CalcDistancesTwo();

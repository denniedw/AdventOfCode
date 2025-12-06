import * as fs from 'fs';

const CalculateRegexesOne = () => {
  const data = GetData();
  const regex = /(mul\((\d+)(,)(\d+)\))/g;
    
  const mulsStrings = data.match(regex);

  calculateResult(mulsStrings!);
}

const CalculateRegexesTwo = () => {
  const data = GetData();
  const regexForCalc = /(mul\((\d+)(,)(\d+)\))/g;
  const regexForRemove = /don't\(\)(.*?)do\(\)/g;

  const trimmedString = data.replace(regexForRemove, "");
  const mulsStrings = trimmedString.match(regexForCalc);
  
  calculateResult(mulsStrings!);
}

const calculateResult = (mulsStrings: RegExpMatchArray) => {
  let result = 0;

  console.log(mulsStrings);
  mulsStrings!.forEach(element => {
    const numbers = element.match(/(\d+)/g);

    if(numbers){
        const first = +numbers[0];
        const second = +numbers[1];

        const r = first * second;

        result += r;
    }
  });

  console.log(result);
}

const GetData = (): string => {
  const data = fs.readFileSync('input.txt').toString();

  return data;
}

CalculateRegexesOne();
CalculateRegexesTwo();

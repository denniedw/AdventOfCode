import * as fs from 'fs';

interface Data {
    leftProductId: number;
    rightProductId: number;
}

const PartOne = (data: Data[])=> {
    let invalidProductIds: number[] = [];
    data.forEach(range => {
        for(let i = range.leftProductId; i <= range.rightProductId; i++){
            const length = i.toString().length;
            // even amount of characters in number
            if(length % 2 === 0){
                let leftSide = +i.toString().slice(0, length / 2);
                let rightSide = +i.toString().slice(length / 2, length);

                // both sides are the same -> invalid product id
                if(leftSide === rightSide){
                    invalidProductIds.push(i);
                }
            }
        }
    });

    const sum = invalidProductIds.reduce((a, b) => a + b, 0);

    console.log(sum);
}

const PartTwo = (data: Data[]) => {
    let productIds: number[] = [];
    let invalidProductIds: number[] = [];
    data.forEach(range => {
        for(let i = range.leftProductId; i <= range.rightProductId; i++){
            productIds.push(i);
        }
    });

    productIds.forEach(id => {
        const length = id.toString().length;

        // collect subsets of given length
        // looping through the string length, starting at 1 to split the char array
        for(let i = 1; i < length; i++){
            let characterSet = id.toString().slice(0, i);
            let subsets = id.toString().split(characterSet);

            // see if more then 1 subset is found
            if(subsets.length > 1){
                const lengthOfFirstSubset = subsets[0].length;

                // check if all subsets are the same length as the first one -> indicating its a repeating pattern
                if(subsets.every(subset => subset.length === lengthOfFirstSubset)){
                    invalidProductIds.push(id);
                    break;
                }
            }
        }
    });

    const sum = invalidProductIds.reduce((a, b) => a + b, 0);

    console.log(sum);
}
    

const GetData = (): Data[] => {
  let data: Data[] = [];

  fs.readFileSync('input.txt', 'utf-8').split(',').map(line => {
    const leftInput = line.split('-')[0];
    const rightInput = line.split('-')[1];

    data.push({
        leftProductId: +leftInput,
        rightProductId: +rightInput 
    });

  });

  return data;
}

PartOne(GetData());
PartTwo(GetData());
import * as fs from 'fs';

interface Range {
    left: number;
    right: number;
}

const PartOne = (rangeData: string[], ids: number[]) => {
    let freshIngredients: number[] = [];
    ids.forEach(id => {
        rangeData.forEach(range => {
            const leftLine = +range.split('-')[0];
            const rightLine = +range.split('-')[1];

            if(id >= leftLine && id <= rightLine){
                // if code is slow, this can be optimized
                if(freshIngredients.indexOf(id) === -1){
                    freshIngredients.push(id);
                }
            }
        });
    });

    console.log(freshIngredients.length);
}

const PartTwo = (rangeData: string[]) => {
    // remove ranges that fall between range of other range
    let needAnotherIteration = true;
    let freshIngredientsIds = 0;
    let ranges: Range[] = [];

    // create ranges
    rangeData.forEach(range => {
        const leftLine = +range.split('-')[0];
        const rightLine = +range.split('-')[1];

        ranges.push({ left: leftLine,  right: rightLine });
    });

    while(needAnotherIteration){
        needAnotherIteration = false;
        for(let i = 0; i < ranges.length; i++){
            for(let j = 0; j < ranges.length; j++){
                if(i === j) continue;
                // if left is smaller and right falls within scope of other range, adjust right to left of that range.
                if(ranges[j].left < ranges[i].left && ranges[j].right > ranges[i].left && ranges[j].right < ranges[i].right){
                    ranges[j].right = ranges[i].left -1;
                    needAnotherIteration = true;
                }

                // if left is larger then other left or equals, and right is smaller or equals other right, set range to 0
                if(ranges[j].left > ranges[i].left && ranges[j]. right <= ranges[i].right){
                    ranges[j].left = -1;
                    ranges[j].right = -1;
                    needAnotherIteration = true;
                    
                }

                if(ranges[j].left == ranges[i].left && ranges[j].right < ranges[i].right){
                    ranges[j].right = ranges[i].right;
                    needAnotherIteration = true;
                }

                if(ranges[j].right === ranges[i].left) {
                    ranges[j].right--;
                    needAnotherIteration = true;
                }

            }
        }

        console.log(needAnotherIteration);
    }

    // remove duplicates
    let uniqueRanges: Range[] = [];
    for(let i = 0; i < ranges.length; i++){
        const range = ranges.find(r => r.left === ranges[i].left && r.right === ranges[i].right);
        if(range){
            if(uniqueRanges.indexOf(range) === -1){
                uniqueRanges.push(range);
            }
        } else {
            uniqueRanges.push(ranges[i]);
        }
    }

    // remove below 0 ranges
    uniqueRanges = uniqueRanges.filter(r => !(r.left < 0 && r.right < 0));
    uniqueRanges.forEach(range => {
        freshIngredientsIds += (range.right - range.left) + 1;
    })

    console.log(uniqueRanges.sort((a, b) => a.left - b.left));
    console.log(freshIngredientsIds);
}

const GetData = () => {
    let rangeData: string[] = [];
    let ids: number[] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        if(line.split('').find(c => c === '-')){
            rangeData.push(line.trim());
        } else if (line.trim().length > 0){
            ids.push(parseInt(line.trim()));
        }
    });

    return { rangeData, ids};
}

const {rangeData, ids} = GetData();
PartOne(rangeData, ids);
PartTwo(rangeData);
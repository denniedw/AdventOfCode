import * as fs from 'fs';

interface Data {
    numbers: number[][];
}

const CheckRoutesOne = () => {
    let data = GetData();
    let safeRouteCount = 0;

    data.numbers.forEach(element => {
        
        let safeRoute = CheckRouteSafety(element);

        if(safeRoute) {
            safeRouteCount++;
        } 
    });

    console.log(safeRouteCount);
    
};

const CheckRoutesTwo = () => {
    let data = GetData();
    let safeRouteCount = 0 ;
    data.numbers.forEach(element => {
        
        let safeRoute = CheckRouteSafety(element);

        if(!safeRoute) {
            for (let index = 0; index < element.length; index++) {
                if(!safeRoute){
                        var copy = element.toSpliced(index, 1);
                        safeRoute = CheckRouteSafety(copy);
                }
            }
        } 

        if(safeRoute){
            safeRouteCount++;
        }
    });

    console.log(safeRouteCount);
}

const CheckRouteSafety= (element: number[]) : boolean => {
    const allowedRange = [-3, -2, -1, 1, 2, 3];

    let increasing = false;
    let decreasing = false;
    let safeRoute = true;

    for (let index = 0; index < element.length -1; index++) {
        if(safeRoute) {
            const first = element[index];
            const second = element[index + 1];

            let difference = second - first;

            if(difference === 0) {
                safeRoute = false;
            };


            if(difference > 0){
                decreasing = true;

                if(increasing) {
                    safeRoute = false;
                }
            } else if (difference < 0) {
                increasing = true;
                if(decreasing) {
                    safeRoute = false;
                }
            }

            if(!allowedRange.includes(difference)) {
                safeRoute = false;
            }
        }
    }

    return safeRoute;
}

const GetData = (): Data => {
    let data: Data = { numbers: [] };
  
    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
      const numberArray: number[] = [];
      const stringArray = line.split(" ");

      stringArray.forEach(n => {
        numberArray.push(+n);
      })

      data.numbers.push(numberArray);
    });
  
    return data;
}

CheckRoutesOne();
CheckRoutesTwo();

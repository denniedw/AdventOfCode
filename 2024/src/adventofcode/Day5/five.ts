import * as fs from 'fs';
interface Rule {
    left: number;
    right: number;
}

interface Book {
    rules: Rule[];
    orders: number[][];
}

const FindCorrectOrdersReturnIncorrectOnes = () => {
    const data = GetData();
    const incorrectOrders: number[][] = [];
    const middleNumberOfCorrectOrders: number[] = []
    let total = 0;

    data.orders.forEach(order => {
        let correctOrder = checkOrderCorrectness(order, data.rules);

        if(correctOrder){
            middleNumberOfCorrectOrders.push(order[(order.length -1) / 2]);
            total += order[(order.length -1) / 2];
        } else {
            incorrectOrders.push(order);
        }
    });

    //answer 1
    console.log(total);

    return incorrectOrders;

}

const checkOrderCorrectness = (order: number[], rules: Rule[]) => {
    let correctOrder = true;

    for (let index = 0; index < order.length; index++) {
        correctOrder = checkSingleIndexOfOrderCorrectness(correctOrder, order, index, rules);
    }

    return correctOrder;
}

const checkSingleIndexOfOrderCorrectness = (currentCorrectState: boolean, order: number[], index: number, rules: Rule[]): boolean => {
    const appliedLeftRules = rules.filter(r => r.left === order[index]);
    appliedLeftRules.forEach(r => {
        const rightIndex = order.findIndex(n => n === r.right);
        if(rightIndex !== -1 && rightIndex < index){
            currentCorrectState = false;
        }
    });

    const appliedRightRules = rules.filter(n => n.right === order[index]);

    appliedRightRules.forEach(r => {
        const leftIndex = order.findIndex(n => n === r.left);
        if(leftIndex !== -1 && leftIndex > index){
            currentCorrectState = false;
        }
    });

    return currentCorrectState
}

const checkHowManyAfterCurrentNumber = (order : number[], num: number, rules: Rule[]): number => {
    const otherNumbers = order.filter(n => n !== num);

    const appliedLeftRules = rules.filter(r => r.left === num);
    const leftOverRules = appliedLeftRules.filter(r => otherNumbers.includes(r.right));
    
    return leftOverRules.length;
}

const fixSingleOrder = (order: number[], rules: Rule[]): number[] => {
    const newOrder: number[] = [];

    order.forEach(n => {
        const amount = checkHowManyAfterCurrentNumber(order, n, rules);
        const index = order.length - 1 - amount;

        newOrder[index] = n;
    })

    return newOrder;
}

const fixIncorrectOrdersAndCalcMiddle = (incorrectOrders: number[][], rules: Rule[]) => {
    let total = 0;

    incorrectOrders.forEach(order => {
        const fixedOrder = fixSingleOrder(order, rules);
        total += fixedOrder[(fixedOrder.length - 1) / 2];
    });

    console.log(total);
}

const GetData = (): Book => {

    const rules: Rule[] = [];
    const pageOrders: number[][] = [];

    fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
        if(line.includes("|")){
            const split = line.split("|");

            let rule: Rule = { left: +split[0], right: +split[1]};
            rules.push(rule);
        } else if(line.includes(",")) {
            pageOrders.push(line.split(",").map(n => +n));
        }
    });
  
    const data: Book = { rules: rules, orders: pageOrders};

    return data;
}

const incorrectOrders = FindCorrectOrdersReturnIncorrectOnes();
fixIncorrectOrdersAndCalcMiddle(incorrectOrders, GetData().rules);

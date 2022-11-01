//Consecutive blocks with a uniformly random initial bit,
//always increasing one index so it will never overlap with previous block

let uniform = 0;
let nonuniform =0;


//Type 0: Uniformly random sequences – the probability of each bit being 0 or 1, independently of all other bits, is P(0) = P(1) = 0.5
//pick bits periodcally
/*const generateRandomStringOfLength = (strLength) => {
    let str = '';
    let new_str = '';
    let num;

    // keep generating and adding random binary string until desired string length reached
    while (strLength > str.length) {


        num = Math.random() > 0.5 ? 1 : 0;
        str = str + num;
        if (str.length % 5 === 0){
            new_str = new_str + num;
            //console.log("strLength", str.length);
        }

    }
    return new_str;
};*/

//Type 1: Uniformly random sequences – the probability of each bit being 0 or 1, independently of all other bits, is P(0) = P(1) = 0.5
  /*const generateRandomStringOfLength = (strLength) => {
        let str = '';
        let num;

        // keep generating and adding random binary string until desired string length reached
        while (strLength > str.length) {
            num = Math.random() > 0.6? 1 : 0;
            str = str + num;
        }
        return str;
    };*/



//Type 2:  Sequence with flip and repeat of bit P(flip) = 0.33 and P(repeat) = 0.66, P(first bit) = 0.5

/*const generateRandomStringOfLength = (strLength) => {
    let str = '';
    let num;
    let temp;
    let p= 0.33 //change value of p here
    num = Math.random() > 0.5 ? '1' : '0';
    str = num;
    while (strLength > str.length) {
        temp = Math.random();

        if(num ==='0')
            num = temp > p ? '0' : '1';
        else
            num = temp > (1-p) ? '0': '1';

        str = str + num;
        num = str.substring(str.length - 1);
    }
    return str;
};*/




//Type 3: Sequence with flip and repeat based on history of two bits, P(flip) = 0.33 and P(repeat) = 0.66
   /*const generateRandomStringOfLength = (strLength) => {
        let str = '';
        let num;
        let temp;
        let pr= 0.66;
        num = Math.random() > 0.5 ? '1' : '0';
        num = num + Math.random() > 0.5 ? '1' : '0';
        str = num;
        while (strLength > str.length) {
            temp = Math.random();
            switch (num) {
                case '00':
                    num = temp < pr ? '0' : '1';
                    break;

                case '01':
                    num = temp < 0.5 ? '0' : '1';
                    break;

                case '10':
                    num = temp < 0.5 ? '0': '1';
                    break;

                case '11':
                    num = temp < (1-pr) ? '0': '1';
                    break;

                default:
                    break;
            }
            str = str + num;
            num = str.substring(str.length - 2);
        }
        return str;
    };*/



//Type 4: Sequences with some number of initial (100) bits chosen uniformly randomly, and continuing periodically from that place on
    /*const generateRandomStringOfLength = (strLength) => {
    let str = '';
    let randstr = '';
    let num;

    // keep generating and adding random binary string until desired string length reached
    while (100 > randstr.length ) {
        num = Math.random() > 0.5 ? 1 : 0;
        randstr = randstr + num;
    }

    while (strLength > str.length) {
        str = str.concat(randstr);
    }
    return str;
    };*/


//Type 5:
 /*const generateRandomStringOfLength = (strLength) => {
        let str = '';
        let num;

        while (strLength > str.length) {

                num = '1';
                while (777 > num.length) {

                    num += Math.random() > 0.5 ? '1' : '0';

                }

                num += '0';
                while (1553 > num.length) {
                    num += Math.random() > 0.5 ? '1' : '0';

                }
                str = str + num;

        }
        return str;
    };*/

//read from file
/*const generateRandomStringOfLength = (strLength) => {
    let str = '';
    let hstr = '';
    const fs = require("fs");
    const buffer = fs.readFileSync("DBSeq20.txt");
    str = buffer.toString();

    //p represent the gap between sequence
    for(let p = 0; p < str.length; p+=1) {
            hstr += str.substr(p,1);
            hstr += Math.random() > 0.5 ? '1' : '0';
        }

    //console.log('Harvested Sequences', hstr);
    return hstr;
}*/


// concatenation of two DB sequences
const generateRandomStringOfLength = (strLength) => {
    let str = '';
    let hstr = '';
    const fs = require("fs");
    const buffer = fs.readFileSync("DBSeq20.txt");
    str = buffer.toString();

    hstr =str; //make copy

    str = str.concat(hstr.substr(0,100));
    str = str.concat(hstr.substr(101,str.length));

    return str;
};


const findCombinations = (binaryString, blockLength, randomBlockCount) => {
 let traverseIndex = -1;
 const foundCombinations = {};
 let fraction;
 let count = 1;
 while (traverseIndex < binaryString.length - blockLength - 1 && count <= randomBlockCount) {
     // console.log(`traverseIndex`, traverseIndex)

     //const blockIndex = traverseIndex + 5;
     const blockIndex = traverseIndex + Math.floor(Math.random()) + 1;


     //console.log(`blockIndex`, blockIndex)
     if (blockIndex + blockLength < binaryString.length) {
         const strBlock = binaryString.substr(blockIndex, blockLength);
         //console.log(`strBlock`, strBlock);
         foundCombinations[strBlock] = foundCombinations[strBlock] ? foundCombinations[strBlock] + 1 : 1;
     }
     traverseIndex = blockIndex; // + blockLength;
     count += 1;
 }

 let sum = 0;
 let matchedPair= 0;
 let temp=1;
 var keys = Object.keys(foundCombinations);
 for(var i = 0; i < Object.keys(foundCombinations).length;i++){


     temp= foundCombinations[keys[i]];
     sum = sum+temp;
     temp = (temp* (temp-1))/2;
     //console.log('temp: ', temp);
     matchedPair = matchedPair+ temp;
     //console.log('matchedPair: ', matchedPair);

 }
 // console.log('sum: ', sum);
 // console.log(`Combinations Found:`, foundCombinations);
 const numOfUniqueCombinations = Object.keys(foundCombinations).length;


 const numOfDuplicateCombinations = matchedPair;


 // console.log('Number of unique combinations:', numOfUniqueCombinations, '/', Math.pow(2, blockLength));
 // console.log('Number of duplicate pairs:', matchedPair);
 const TotalPair = (count * (count-1))/2;
 // console.log('Total number of pairs:', TotalPair);
 fraction = matchedPair / TotalPair;
 //console.log('Fraction of pairs: ', fraction );

 //console.log('opposite', TotalPair/matchedPair);

 if (fraction > threshold ) {
     nonuniform +=1;
     // console.log('Input string is not uniform');
 } else {
     uniform +=1;
     // console.log('Input string is uniform');
 }
 return numOfUniqueCombinations;
};

const n = 6; // works fast enough untill n=7
const STRING_LENGTH = Math.pow(10, n);
const l = 5;
const eps = 0.1;
const RANDOM_BLOCK_COUNT = Math.floor(Math.sqrt(Math.pow(2,l))/Math.pow(eps,4));
const threshold = (1 + 2 * Math.pow(eps,2) )/(Math.pow(2,l));
//const RANDOM_BLOCK_COUNT = Math.floor(Math.sqrt(l)/Math.pow(eps,4));
const randomString = generateRandomStringOfLength(STRING_LENGTH+l-1);
//console.log(`Random binary string:`, randomString); // do not print after n=7

for (let k = 0; k < 100; k++) {
 const randomString = generateRandomStringOfLength(STRING_LENGTH+l-1);
 findCombinations(randomString, l, RANDOM_BLOCK_COUNT);
}

console.log('Length of Input Sequence:', STRING_LENGTH);
console.log('Size of block:', l);
console.log('Number of Random blocks:', RANDOM_BLOCK_COUNT);
console.log('Error Parameter:', eps);
console.log('Threshold:', threshold);

console.log(`Random binary string:`, randomString); // do not print after n=7
//console.log('Harvested Sequences', hstr);
console.log('Uniform:', uniform);
console.log('Non-Uniform:', nonuniform);
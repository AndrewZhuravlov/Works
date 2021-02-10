const isBigger = (a, b) => a < b;
const isEquals = (a, b) => a === b;
const numberToString = someValue => someValue.toString();
const storeNames = (...args) => args;
const getDivision = (a, b) => {
    let res = 0;

    if (isBigger(a, b)) {
        res = b / a;
    } else {
        res = a / b;
    }

    return res > 0 && res !== Infinity ? res : 'I return nothing';
}
const negativeCount = (arr) => {
    const negativeValue = arr.filter(item => item < 0);

    return negativeValue.length;
}
const letterCount = (word, letter) => {
    const letterArray = word.split('').filter(item => item === letter);

    return letterArray.length;
}
const countPoints = (arr) => {
    const three = 3;
    let points = 0;
    const modifiedArray = arr.map(el => el.split(':').map(item => Number(item)));
    modifiedArray.forEach(([a, b]) => {
        
        if (isEquals(a, b)) {
            points += 1;
        }else if(!isBigger(a, b) && !isEquals(a, b)) {
            points += three;
        }

    });
    
    return points;
}

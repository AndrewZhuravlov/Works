const nine = 9;
//=============================================1
function convert(...data) {
    let myArr = [];
    for (let i = 0; i < data.length; i++) {
        if (typeof data[i] === 'string') {
            myArr[i] = parseInt(data[i]);
        } else if (typeof data[i] === 'number') {
            myArr[i] = '' + data[i];
        }
    }
    return myArr;
}
//==============================================2
function executeforEach(arr, fun) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = fun(arr[i]);
    }
}
//===============================================3
function mapArray(array, fun) {
    executeforEach(array, fun);
    return array;
}
//================================================4
function filterArray(array, fun) {
    const mutableArray = [...array];
    const passed = [];
    console.log(mutableArray);
    executeforEach(mutableArray, fun);
    console.log(mutableArray);
    for (let i = 0; i < mutableArray.length; i++) {
        if (mutableArray[i]) {
            passed.push(array[i]);
        }
    }
    return passed;
}
filterArray([1, 2, 3, 4], el => el%2===1)
//=================================================5
function getValuePosition(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return ++i;
        }
    }
    return false;
}
//=================================================6
function flipOver(str) {
    let revSrt = '';
    for (let i = str.length - 1; i >= 0; i--) {
        revSrt += str[i];
    }
    return revSrt;
}
//=================================================7
function makeListFromRange( [start, end] ) {
    const myArr = [];
    if (start <= end) {
        for (let i = start; i <= end; i++) {
            myArr.push(i);
        }
    } else if (start >= end) {
        for (let i = start; i >= end; i--) {
            myArr.push(i);
        }
    return myArr;
}
//=================================================8
function getArrayOfKeys(arr, name) {
    const newArr = []
    executeforEach(arr, el => newArr.push(el[name]))
    return newArr;
}
//=================================================9
function getTotalWeight(arr) {
    let totalWeight = 0;
    executeforEach(arr, el => {
        totalWeight += el.weight
    })
    return totalWeight;
}
//=================================================10
function getPastDay(date, days) {
    let copy = new Date(date);
    copy.setDate(date.getDate() - days);
    return copy.getDate();
}
//=================================================11
function formatDate(date) {
    const d = date.getDate(),
          m = date.getMonth() + 1,
          y = date.getFullYear(),
          h = date.getHours(),
          min = date.getMinutes();
    return `${y}/${m <= nine ? '0' + m :
             m}/${d <= nine ? '0' + d : 
             d} ${h <= nine ? '0' + h : 
             h}:${min<=nine?'0'+min:min}`;
}

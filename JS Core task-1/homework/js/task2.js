const word = prompt('input your word'), two = 2;
charactersFinder(word.trim());
function charactersFinder(word) {
    const finalArr = [];
    const arr = word.split(' ');
    arr.forEach( item => {
    if (item === '') {
        finalArr.push('Invalid value');
    } else if (item.length % two === 0) {
        let idx = item.length / two - 1;
        const twoMidSymb = item.slice(idx, idx + two);
        if (twoMidSymb[0] === twoMidSymb[1]) {
            finalArr.push('Middle characters are the same'); 
        } else {
            finalArr.push(twoMidSymb);
        }
    } else if (item.length % two === 1) {
        let idx = Math.floor(item.length / two);
        finalArr.push(item.slice(idx, idx + 1));
    }
})
    alert(finalArr.join(', '))
}



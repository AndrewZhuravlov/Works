const dozen = 100, two = 2; 
const arrOfValues = [+prompt('Please, input amount of batteries'),
                     +prompt('Please, input percentage of defective batteries')];
const checkedValues = arrOfValues.filter(element => Math.sign(element) === 1 ? element :
                                        alert(`invalid value`));                                       
checkedValues[1] <= dozen ? calculateDisplayData(checkedValues) :
                          null;
function calculateDisplayData([batteries, percentOfDefectiveBat]) {
    const working = batteries * percentOfDefectiveBat / dozen,
        defective = batteries - working;
    alert(`
            Amount of batteries: ${batteries};
            Defective rate: ${percentOfDefectiveBat}%;
            Amount of defective batteries: ${working.toFixed(two)};
            Amount of working batteries: ${defective.toFixed(two)} 
                                    `)
}                                                                            
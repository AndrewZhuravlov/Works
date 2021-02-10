const maxElement = array => Math.max(...array);
const copyArray = array => [...array];
const addUniqueId = obj => {
   const id = Symbol.for('id');
   const myObj = Object.assign({}, obj);
   myObj[id] = Math.floor(Math.random() * 100 + 1);
   
   return myObj;
}

const regroupObject = obj => {
    const {name, details: {id, age, university} } = obj;

    return {
        university,
        user: {
            firstName: name,
            id,
            age
        }
    };
}

const findUniqueElement = array => new Set(array);
const hideNumber = number => number.slice(6).padStart(10, '*');
const add =(a = required(), b = required()) => a + b ;
const required= () => {
     throw Error('Missing property');
}; 
const functionWhichCallsSomeAPI = () => {
    new Promise(resolve => {
        resolve(fetch('https://jsonplaceholder.typicode.com/users'));
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            console.log(element.name);
        });
    });
}

const functionWhichCallsSomeAPI2 = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    data.forEach(item => {
        console.log(item.name);
    });
}
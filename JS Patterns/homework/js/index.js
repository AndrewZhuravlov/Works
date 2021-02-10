const data = getData();
data.then(myData => {
   const data = myData.map(item => new Employee(item));
   const warning = new Warning();
   const warningList = warning.lowPerformance(data);
   const allUnits = new AllUnits('All', data);

   allUnits.printUnit('#content2');
   warningList.forEach(item => {
       item.print(document.querySelector('#content3'));
   })

   return data;
}).then(myData => {
    let composite = [];

    for (let i = 0; i < myData.length; i++) {
        const isManager = myData[i]; 
        const myEmployees = myData.filter(item => item.rm_id === isManager.id) || null;

        if(myEmployees.length) {
            isManager.manager = true;
            composite.push(isManager, myEmployees);
        }
    }

    return composite;    
}).then(composite => {
    const group = new EmployeesGroup('All employees and managers', composite);
    group.print(document.querySelector('#content1'))
});

class Employee {
    constructor({id, rm_id, name, performance, last_vacation_date, salary}) {
        this.name = name;
        this.performance = performance;
        this.last_vacation_date = last_vacation_date;
        this.salary = salary;
        this.id = id;
        this.rm_id = rm_id;
    }

    print(place) {
        place.innerHTML += `<p class="${this.manager ? 'manager': 
        ''}">Name: ${this.name}. Performance: ${this.performance}</p>` 
    }
    printUnit(place) {
        place.innerHTML = `Name: ${this.name}. Performance ${this.performance}. Salary: ${this.salary}.
        Last vacation: ${this.last_vacation_date}`;
    }
}

class EmployeesGroup {
    constructor(name, composite = []) {
        console.log(name)
        this.name = name;
        this.composites = composite;
    }

    print(place) {
        this.composites.forEach(bot => {
            
            if(bot instanceof Employee) {
                bot.print(place);
            }else{
                bot.forEach(item => {
                    item.print(place);
                })
            }
        })
    }
}

class AllUnits {
    constructor(name, composite = []) {
        this.name = name;
        this.composites = composite
    }

    print(place) {
        this.composites.forEach(item => {
            item.printUnit(place);
        })
    }
}

class Warning {
    lowPerformance(array) {
        return array.filter(item => item.performance === 'low');
    }
}

async function getData() {
    const res = await fetch('./mock.json');
    return await res.json();
}
 

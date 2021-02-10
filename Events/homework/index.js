/* START TASK 1: Your code goes here */
const task1Container = document.querySelector('#task1');
task1Container.addEventListener('click', task1OnClick);

function task1OnClick(ev) {
    const element = ev.target;

    if (element.className === 'firstColumn') {
        element.parentNode.className = 'blue';
    } else if (element.textContent === 'Special Cell') {
        const tbody = element.closest('tbody');
        tbody.className = 'green';
    } else if (element.textContent === 'Cell' &&
        !element.classList.contains('firstColumn')) {
        element.className = 'yellow';
    }

}
/* END TASK 1 */
/* START TASK 2: Your code goes here */
const inp = document.querySelector('.inp-form');
const btn = document.querySelector('.inp-btn');

inp.addEventListener('input', checker);

function checker() {
    const regExp = /^\+380[0-9]{9}$/;
    const text = document.querySelector('.text');
    const title = document.querySelector('.title-form');
    btn.disabled = true;

    if (regExp.test(inp.value)) {
        title.style.visibility = 'hidden';
        btn.disabled = false;
        inp.style.outlineColor = 'black';
        text.innerHTML = 'Data was successful send';
        btn.onclick = () => {
            title.style.backgroundColor = 'green';
            title.classList.remove('wrong');
            title.style.visibility = 'visible';
            inp.value = '';
        }
    } else {
        text.innerHTML = 'Type number does not follow format +380*********';
        btn.disabled = true;
        inp.style.outlineColor = 'red';
        title.style.visibility = 'visible';
        title.style.backgroundColor = 'red'
    }

}
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const myEvent = new CustomEvent('showScore', {
    detail: {
        teams : [
            {name : 'Dirty Racoons', score: 0 },
            {name : 'Smelly Socks', score: 0 }
        ] 
    },
    bubbles: true,
    cancelable: false
});

let flag = null;
const team1 = document.querySelector('.team1');
const goal = document.querySelector('.goal');
const team2 = document.querySelector('.team2');
const ball = document.querySelector('.ball');
const court = document.querySelector('.field-wrap');
const { teams } = myEvent.detail;
const defaultCoordinates = {
    top : '130px',
    left : '280px'
};

displayResults();
function displayResults() {
    team1.innerHTML = `${teams[0].name}: ${teams[0].score}`;
    team2.innerHTML = `${teams[1].name}: ${teams[1].score}`;
}

goal.style.opacity = 0;

court.addEventListener('click', ev => {
    const element = ev.target;
    const two = 2;

    if(element.className === 'basket1') {
        ball.style.top = defaultCoordinates.top;
        ball.style.left = defaultCoordinates.left;
        myEvent.detail.teams[0].score += 1;
        displayResults();
        flag = 'basket1';
        court.dispatchEvent(myEvent);
    }else if(element.className === 'ball') {
        return;
    }else if(element.className === 'basket2') {
        ball.style.top = defaultCoordinates.top;
        ball.style.left = defaultCoordinates.left;
        myEvent.detail.teams[1].score += 1;
        displayResults();
        flag = 'basket2';
        court.dispatchEvent(myEvent);
    } else{
        ball.style.top = ev.offsetY - ball.clientWidth / two + 'px';
        ball.style.left = ev.offsetX - ball.clientHeight / two + 'px';
    }

});
court.addEventListener('showScore', ev => {
    const [Racoons, Socks] = ev.detail.teams;
    const threeTh = 3000;
    if(flag === 'basket1') {
        goal.innerHTML = `${Racoons.name} scored<br>goal ${Racoons.score}!!!!`;
    }else if(flag === 'basket2') {
        goal.innerHTML = `${Socks.name} scored<br>goal ${Socks.score}!!!!`;
    }

    goal.style.opacity = 1;
    setTimeout(() => {
        goal.style.opacity = 0;
        goal.innerHTML = '';
    }, threeTh);
})
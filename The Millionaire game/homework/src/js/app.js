let myQuestions = JSON.parse(localStorage.getItem('myQ'));
const start = document.querySelector('#start-btn'),
      answerContainer = document.querySelector('#answerContainer'),
      btnContainer = document.querySelector('.btns-wrap'),
      million = 1000000,
      two = 2,
      seventyFour = 74,
      dozen = 100;
let questionCounter = 74,
    currentQuestionPrize = 100,
    totalPrize = 0,
    correctAnswer = null;

btnContainer.addEventListener('click', manage);
function manage(ev) {
    if(ev.target.id === 'new-game-btn') {
        reset();
        showHideElement('pr', 'hide', 'show');
        showHideElement('skip-btn', 'show','hide');
        showHideElement('q-s', 'show','hide');
        displayData(
            getQuestionAndClear(
            randomQuestionGenerator(questionCounter, 0), myQuestions));
    }else if(ev.target.id === 'skip-btn'){
        showHideElement('skip-btn', 'hide', 'show');
        displayData(
            getQuestionAndClear(
            randomQuestionGenerator(questionCounter, 0), myQuestions));
    }
}
start.addEventListener('click', startNewGame);
function startNewGame() {
    showHideElement('start-page', 'hide');
    showHideElement('game', 'show');
    displayData(
        getQuestionAndClear(
        randomQuestionGenerator(questionCounter, 0), myQuestions));
}
function showHideElement(element, addClassSelector, removeClass) {
    const item = document.querySelector(`#${element}`);
    item.classList.remove(removeClass);
    item.classList.add(addClassSelector);
}
function randomQuestionGenerator(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getQuestionAndClear(randomNumberFunc, arr) {
    const q = arr[randomNumberFunc];
    arr.splice(randomNumberFunc, 1);
    questionCounter--;
    return q;
}
function displayData({ question, content, correct }) {
    document.querySelector(`#question`).innerHTML = question;
    content.forEach((item, i) => {
        document.querySelector(`#answer-${i}`).innerHTML = item;
    });
    document.querySelector(`#total`).innerHTML = `Total Prize: ${totalPrize}`
    document.querySelector(`#question-prise`).innerHTML = `Prize on current round: ${currentQuestionPrize}` ;
    correctAnswer = correct;
}
answerContainer.addEventListener('click', answerChecker);
function answerChecker(ev) {
    const numEl = parseInt(ev.target.id.match(/\d+/));
    if(+correctAnswer === numEl) {
        totalPrize += currentQuestionPrize;
        currentQuestionPrize *= two;
        if (totalPrize > million) {
            showHideElement('q-s', 'hide');
            showHideElement('pr', 'show');
            showHideElement('skip-btn', 'hide');
            reset('Congratulations! You won 1000000!');
        }else{
            displayData(
                getQuestionAndClear(
                randomQuestionGenerator(questionCounter, 0), myQuestions));
        }      
    }else{
        showHideElement('q-s', 'hide', 'show');
        showHideElement('pr', 'show');
        showHideElement('skip-btn', 'hide', 'show');
        reset(`Game over. Your prize is: ${totalPrize}`);
    }    
}
function reset(str) {
    questionCounter = seventyFour;
    currentQuestionPrize = dozen;
    totalPrize = 0;
    correctAnswer = null;
    myQuestions = JSON.parse(localStorage.getItem('myQ'));
    document.querySelector('#quiz-p').innerHTML = str;
}

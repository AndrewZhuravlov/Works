import '../scss/style.scss';
import '../index.html';
import displayAiWin from './displayAiWin.js';
import displayPlayerWin from './displayPlayerWin.js';
import getValue from './getValue';
import reset from './reset';
import roundResult from './roundResult';
import aiValue from './aivalue';
import draw from './draw'

const info = document.querySelector('.info-table');
const options = document.querySelector('.options');
const status = {
    rounds : [],
    playerWins: 0,
    aiWins: 0,
    counter: 0
}

options.addEventListener('click', playerValue);

function game(player, ai) {
    const [playerObj] = player;
    const [aiObj] = ai;

    if (aiObj.number === playerObj.number) {
        draw(info);

        return false;
    }

    if (playerObj.number === 1 && aiObj.number === 3 ||
        playerObj.number === 2 && aiObj.number === 1 ||
        playerObj.number === 3 && aiObj.number === 2) {
        status.playerWins++;
        displayPlayerWin(playerObj, aiObj, info, status);
    } else {
        status.aiWins++;
        displayAiWin(playerObj, aiObj, info, status);
    }
}

function playerValue(ev) {

    if(ev.target.id === 'reset') {
        reset(status, info);

        return false;
    }

    if (ev.target.dataset.number) {
        let num = ev.target.dataset.number;
        status.counter++;

        if (status.counter < 3) {
            game(getValue(Number(num)), aiValue());
        } else {
            game(getValue(Number(num)), aiValue());
            roundResult(status, info);
        }

    };

    return false;
}

export default function roundResult(status, info) {

    if(status.aiWins === status.playerWins) {
        info.innerHTML = '';
        info.innerHTML = `<h3>Draw!!!</h3>`;
    }   

    if(status.aiWins > status.playerWins) {
        info.innerHTML = '';
        info.innerHTML = `<h3>Your friend wins round!!!</h3>`;
        status.rounds.push({
            round: status.rounds.length+1,
            winner: 'ai'
        }) 
    }else{
        info.innerHTML = '';
        info.innerHTML = `<h3>You won round!!!</h3>`;
        status.rounds.push({
            round: status.rounds.length+1,
            winner: 'player'
        })
    }
    
    status.aiWins = 0;
    status.playerWins = 0;
    status.counter = 0;
}
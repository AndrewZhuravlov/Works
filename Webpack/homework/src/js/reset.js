export default function reset(status, info) {
    status.rounds = [];
    info.innerHTML = '';
    status.aiWins = 0;
    status.playerWins = 0;
}

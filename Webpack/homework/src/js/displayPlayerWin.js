export default function displayPlayerWin(player, ai, info, status) {
    info.innerHTML = '';
    info.innerHTML = `<h3>Round: ${status.counter}, ${player.name} vs ${ai.name}! You have won!</h3>`;
}
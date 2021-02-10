export default function getValue(n) {
    const array = [
        { number: 1, name: 'rock' },
        { number: 2, name: 'paper' },
        { number: 3, name: 'scissors' }
    ]

    return array.filter(item => item.number === n);
}
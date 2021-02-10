import getValue from './getValue';

export default function aiValue() {
    const random = Math.floor(1 + Math.random() * (3 + 1 - 1));

    return getValue(random);
}
// Генерує випадкове число в діапазоні від min до max
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Повертає випадковий елемент з масиву
export function getRandomElement(array) {
    return array[getRandomNumber(0, array.length - 1)];
}

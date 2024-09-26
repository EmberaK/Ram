import { publicsArray, feedbackMessages, userNames, likeRange, commentRange, avatarRange, userIdRange } from './constants.js';
import { getRandomNumber, getRandomElement } from './utils.js';

// Генерує коментар
function createComment() {
    return {
        id: getRandomNumber(userIdRange.min, userIdRange.max),
        name: getRandomElement(userNames),
        avatar: `img/avatar-${getRandomNumber(avatarRange.min, avatarRange.max)}.svg`,
        message: getRandomElement(feedbackMessages),
    };
}

// Генерує масив випадкових коментарів
function createCommentsArray() {
    const quantityComments = getRandomNumber(commentRange.min, commentRange.max);
    return Array.from({ length: quantityComments }, createComment);
}

// Оновлюємо масив фотографій, додаючи властивості до кожного об'єкта
const updatedPublicsArray = publicsArray.map((_, index) => ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: `опис фотографії ${index + 1}`,
    likes: getRandomNumber(likeRange.min, likeRange.max),
    comments: createCommentsArray(),
}));

// Лог для перевірки отриманого масиву фотографій з коментарями
console.log(updatedPublicsArray);

import { publicsArray, feedbackMessages, userNames, likeRange, commentRange, avatarRange, userIdRange } from './constants.js';
import { getRandomNumber, getRandomElement } from './utils.js';
import { createThumbnail } from './thumbnail.js';

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
const updatedPublicsArray = publicsArray.map(function (_, index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: `photo description ${index + 1}`,
    likes: getRandomNumber(likeRange.min, likeRange.max),
    comments: createCommentsArray(),
  };
});

console.log(updatedPublicsArray);

// Функція для рендерингу мініатюр
function renderThumbnails(photoArray) {
  const thumbnailFragment = document.createDocumentFragment();

  photoArray.forEach(function(photoObject) {
    const thumbnailElement = createThumbnail(photoObject);
    thumbnailFragment.appendChild(thumbnailElement);
  });

  const galleryContainer = document.querySelector('.pictures');
  galleryContainer.appendChild(thumbnailFragment);
}

renderThumbnails(updatedPublicsArray);
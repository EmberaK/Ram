import { publicsArray, feedbackMessages, randomWords, userNames, likeRange, commentRange, avatarRange, userIdRange } from './constants.js';
import { getRandomNumber, getRandomElement } from './utils.js';
import { createThumbnail } from './thumbnail.js';
import { showBigPicture } from './full-screen-size.js'; 

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

// Генерує масив випадкових описів
function getRandomDescription(wordsArray, count = 4) {
  const shuffled = wordsArray.sort(() => 0.5 - Math.random());
  const selectedWords = shuffled.slice(0, count);

  return selectedWords.join(' ');
}

//збираємо мініатюру(1)
const updatedPublicsArray = publicsArray.map(function (_, index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomDescription(randomWords),
    likes: getRandomNumber(likeRange.min, likeRange.max),
    comments: createCommentsArray(),
  };
});


// Функція для рендерингу мініатюр
function renderThumbnails(photoArray) {
  const thumbnailFragment = document.createDocumentFragment();
  photoArray.forEach(function (photoObject) {
    const thumbnailElement = createThumbnail(photoObject);
    thumbnailFragment.appendChild(thumbnailElement);
  });
  const galleryContainer = document.querySelector('.pictures');
  galleryContainer.appendChild(thumbnailFragment);
}

// Обробник для відкриття великого зображення
document.querySelector('.pictures').addEventListener('click', (event) => {
  const thumbnail = event.target.closest('.picture'); 
  if (thumbnail) {
    const index = Array.from(document.querySelectorAll('.picture')).indexOf(thumbnail); 
    showBigPicture(updatedPublicsArray[index]); 
    event.preventDefault(); 
  }
});

// Рендерім мініатюри
renderThumbnails(updatedPublicsArray);
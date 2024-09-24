const photoCollection = []; // Массив для хранения фотографий

// Генерация фотографий
for (let i = 1; i <= 25; i++) {
  photoCollection.push({
    id: i,
    url: `../img/photos/${i}.jpg`, // Путь к фотографиям
    description: `Опис фотографії ${i}`, // Описание фотографии
    likes: Math.floor(Math.random() * (200 - 15 + 1)) + 15, // Случайное количество лайков
    comments: [] // Изначально пустой массив для комментариев
  });
}

// Список случайных имен
const userNames = ['Артем', 'Марія', 'Олексій', 'Вікторія', 'Дмитро', 'Олена', 'Максим', 'Наталя'];

// Список случайных комментариев
const commentMessages = [
  'Все відмінно!',
  'Загалом все непогано. Але не всі.',
  'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
  'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
  'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
  'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
];

// Функция для генерации случайного числа в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации комментариев
function createComments() {
  const numberOfComments = getRandomInt(1, 5); // Случайное количество комментариев
  const generatedComments = [];

  for (let i = 0; i < numberOfComments; i++) {
    generatedComments.push({
      id: getRandomInt(100, 999), // Уникальный id комментария
      avatar: `../img/avatar-${getRandomInt(1, 6)}.svg`, // Случайный номер аватара от 1 до 6
      message: commentMessages[getRandomInt(0, commentMessages.length - 1)], // Случайное сообщение
      name: userNames[getRandomInt(0, userNames.length - 1)] // Случайное имя
    });
  }

  return generatedComments;
}

// Добавляем комментарии к фотографиям
for (let i = 0; i < photoCollection.length; i++) {
  photoCollection[i].comments = createComments(); // Генерация и добавление комментариев
}

console.log(photoCollection); // Выводим массив фотографий с комментариями в консоль

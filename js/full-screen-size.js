// Функція для відображення великої фотографії
export function showBigPicture(photo) {
    const bigPictureSection = document.querySelector('.big-picture');
    const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
    const socialCaption = bigPictureSection.querySelector('.social__caption');
    const socialLikes = bigPictureSection.querySelector('.likes-count');
    const commentCount = bigPictureSection.querySelector('.comments-count');

    bigPictureImg.src = photo.url;
    socialCaption.textContent = photo.description;
    socialLikes.textContent = photo.likes;
    commentCount.textContent = `${photo.comments.length} ${photo.comments.length === 1 ? 'коментар' : 'коментарів'}`;

    const commentsList = bigPictureSection.querySelector('.social__comments');
    commentsList.innerHTML = '';

    const commentsToShow = photo.comments.slice(0, 5);
    commentsToShow.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });

    const loaderButton = bigPictureSection.querySelector('.comments-loader');
    if (photo.comments.length > 5) {
        loaderButton.classList.remove('hidden');
        loaderButton.onclick = () => loadAllComments(photo.comments, commentsList, loaderButton);
    } else {
        loaderButton.classList.add('hidden');
    }

    bigPictureSection.classList.remove('hidden');
}

// Функція для створення елемента коментаря
function createCommentElement(comment) {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = `Аватар коментатора: ${comment.name}`;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentText);
    return commentElement;
}

// Функція для завантаження всіх коментарів
function loadAllComments(allComments, commentsList, loaderButton) {
    commentsList.innerHTML = '';
    allComments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });
    loaderButton.classList.add('hidden');
}

// Закриття великого зображення
function closeBigPicture() {
    const bigPictureSection = document.querySelector('.big-picture');
    bigPictureSection.classList.add('hidden');
}

// Обробник для закриття зображення
document.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);

// Обробник натискання клавіші Escape для закриття
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeBigPicture();
    }
});

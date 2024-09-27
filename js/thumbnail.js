export function createThumbnail(photoDetails) {
    const thumbnailTemplate = document.querySelector('#picture').content.cloneNode(true);  

    const imageElement = thumbnailTemplate.querySelector('.picture__img');
    const likesElement = thumbnailTemplate.querySelector('.picture__likes');
    const commentsElement = thumbnailTemplate.querySelector('.picture__comments');

    imageElement.src = photoDetails.url;
    imageElement.alt = photoDetails.description;
    likesElement.textContent = photoDetails.likes;
    commentsElement.textContent = photoDetails.comments.length;

    return thumbnailTemplate;
}
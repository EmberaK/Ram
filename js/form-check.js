const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
export const imgUploadForm = imgUpload.querySelector('.img-upload__form');
export const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
export const commentsInput = imgUploadOverlay.querySelector('.text__description');
export const fileInput = document.querySelector('#upload-file');
export const imgUploadCancel = document.querySelector('.img-upload__cancel');
const specialCharacters = /[!@$%^&*(),.?":{}|<>]/;



export function showImgForm() {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

export function closeImgForm() {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cleanForm();
}

function cleanForm() {
    imgUploadForm.reset();
}

function doValidationHashtags(e) {
    const regexHashtags = new RegExp(/^(#[А-ЩЬЮЯІЇЄа-щьюяіїєA-Za-z0-9]{1,19})$/);
    const hashtagsValue = hashtagsInput.value.trim();

    if (hashtagsValue.length > 0) {
        const hashtagsArray = hashtagsValue.split(' ');
        const uniqueHashtags = [];
        hashtagsArray.forEach((hashtag) => {
            const normalizedHashtag = hashtag.toLowerCase();

            if (!hashtag.startsWith('#')) {
                hashtagsInput.setCustomValidity('Хеш-тег повинен починатися із символу #');
                e.preventDefault();
                return;
            } else if (hashtag === '#') {
                hashtagsInput.setCustomValidity('Хеш-тег не може складатися тільки із символу #');
                e.preventDefault();
                return;
            } else if (hashtag.length > 20) {
                hashtagsInput.setCustomValidity('Хеш-тег не може перевищувати 20 символів.');
                e.preventDefault();
                return;
            } else if (!regexHashtags.test(hashtag)) {
                hashtagsInput.setCustomValidity('Хештег має починатися з # і містити лише літери (українською або латиницею) або цифри без пробілів чи спецсимволів.');
                e.preventDefault();
                return;
            } else if (uniqueHashtags.includes(normalizedHashtag)) {
                hashtagsInput.setCustomValidity('Один і той же хеш-тег не може бути використаний двічі (незалежно від регістру)');
                e.preventDefault();
                return;
            } else if (!hashtag.slice(1).length) {
                hashtagsInput.setCustomValidity('Хеш-тег не може бути порожнім.');
                e.preventDefault();
                return;
            } else if (specialCharacters.test(hashtag)) {
                hashtagsInput.setCustomValidity('Хеш-теги не можуть містити спеціальні символи.');
                e.preventDefault();
                return;
            } else {
                uniqueHashtags.push(normalizedHashtag);
            }
        });

        if (uniqueHashtags.length > 5) {
            hashtagsInput.setCustomValidity('Не можна вказати більше п\'яти хеш-тегів');
            e.preventDefault();
        }
    }
}


function doValidationComments(e) {
    const commentsValue = commentsInput.value.trim();

    if (commentsValue.length === 0) {
        commentsInput.setCustomValidity('Коментар не може бути порожнім.');
        e.preventDefault();
    } else if (commentsValue.length > 140) {
        commentsInput.setCustomValidity('Максимальна кількість символів 140');
        e.preventDefault();
    }
}


export function doAllValidation(e) {
    doValidationHashtags(e);
    doValidationComments(e);
}

export const clearErrorMessages = (inputElement) => {
    inputElement.addEventListener('input', () => {
        inputElement.setCustomValidity('');
    });
};
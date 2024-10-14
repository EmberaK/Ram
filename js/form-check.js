import { updateImageStyle } from "./image-scale.js";
import { defaultSize } from "./constants.js";
import { resetSlider } from "./image-effect.js"; 

const imgUpload = document.querySelector('.img-upload');
export const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
export const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
export const commentsInput = imgUploadOverlay.querySelector('.text__description');
export const fileInput = document.querySelector('#upload-file');
export const imgUploadCancel = document.querySelector('.img-upload__cancel');
const controlValue = document.querySelector(".scale__control--value");

export function showImgForm() {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

export function closeImgForm() {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cleanForm();
}

export function cleanForm() {
    imgUploadForm.reset();
    controlValue.value = `${defaultSize}%`;
    updateImageStyle(defaultSize); 
    resetSlider();
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
            }
            if (hashtag === '#') {
                hashtagsInput.setCustomValidity('Хеш-тег не може складатися тільки із символу #');
                e.preventDefault();
                return;
            }
            if (hashtag.length > 20) {
                hashtagsInput.setCustomValidity('Хеш-тег не може перевищувати 20 символів.');
                e.preventDefault();
                return;
            }
            if (!regexHashtags.test(hashtag)) {
                hashtagsInput.setCustomValidity('Хештег має починатися з # і містити лише літери (українською або латиницею) або цифри без пробілів чи спецсимволів.');
                e.preventDefault();
                return;
            }
            if (uniqueHashtags.includes(normalizedHashtag)) {
                hashtagsInput.setCustomValidity('Один і той же хеш-тег не може бути використаний двічі (незалежно від регістру)');
                e.preventDefault();
                return;
            }
            if (!hashtag.slice(1).length) {
                hashtagsInput.setCustomValidity('Хеш-тег не може бути порожнім.');
                e.preventDefault();
                return;
            }

            const specialCharacters = /[!@$%^&*(),.?":{}|<>]/;
            if (specialCharacters.test(hashtag)) {
                hashtagsInput.setCustomValidity('Хеш-теги не можуть містити спеціальні символи.');
                e.preventDefault();
                return;
            }

            uniqueHashtags.push(normalizedHashtag);
        });

        if (uniqueHashtags.length > 5) {
            hashtagsInput.setCustomValidity('Не можна вказати більше п\'яти хеш-тегів');
            e.preventDefault();
        }
    }
}

function doValidationComments(event) {
    const commentsInput = document.querySelector('.text__description');
    const commentsValue = commentsInput.value.trim();

    if (commentsValue.length > 140) {
        commentsInput.setCustomValidity('Комментарий не должен превышать 140 символов.');
        event.preventDefault();
    }
}


export function doAllValidation(e) {
    doValidationHashtags(e);
    doValidationComments(e);
}

// Очищення повідомлень про помилки при введенні
export const clearErrorMessages = (inputElement) => {
  inputElement.addEventListener('input', () => {
    inputElement.setCustomValidity('');
  });
};
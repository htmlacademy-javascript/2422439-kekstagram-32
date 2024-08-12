import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {sendData} from './api-client.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const SUPPORTED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_HASHTAG: 'Неправильный хэштег',
};

const submitState = {
  DEFAULT: 'Опубликовать',
  SUBMITTING: 'Опубликоваю...',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const imagePreview = document.querySelector('.img-upload__preview > img');
const previewThumbnails = document.querySelectorAll('.effects__preview');

let isMessageShown = false;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const setPreview = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = SUPPORTED_FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const objectUrl = URL.createObjectURL(file);
    imagePreview.src = objectUrl;

    previewThumbnails.forEach((thumbnail) => {
      thumbnail.style.backgroundImage = `url(${objectUrl})`;
    });
  }
};

const toggleSubmitButton = (isDisabled) => {
  if (!submitButton) {
    return;
  }

  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? submitState.SUBMITTING
    : submitState.DEFAULT;
};

const showModal = (file) => {
  toggleSubmitButton(false);
  setPreview(file);

  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body. classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isMessageShown) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const files = fileField.files;
  if (files.length > 0) {
    showModal(files[0]);
  }
};

const showMessage = (dialogOverlay, dialog, closeButton) => {
  isMessageShown = true;
  closeButton.addEventListener('click', () => {
    isMessageShown = false;
    dialogOverlay.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      isMessageShown = false;
      dialogOverlay.remove();
    }
  }, { once: true });

  dialogOverlay.addEventListener('click', (evt) => {
    if(!dialog.contains(evt.target)) {
      isMessageShown = false;
      dialogOverlay.remove();
    }
  });

  document.body.insertBefore(dialogOverlay, document.body.lastChild);
};

const showError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const closeButton = errorMessage.querySelector('.error__button');
  const dialog = errorMessage.querySelector('.error__inner');

  showMessage(errorMessage, dialog, closeButton);
};

const showSuccess = () => {
  const successMessage = successTemplate.cloneNode(true);
  const closeButton = successMessage.querySelector('.success__button');
  const dialog = successMessage.querySelector('.success__inner');

  showMessage(successMessage, dialog, closeButton);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(evt.target).then(() => {
      toggleSubmitButton(true);
      showSuccess();
      hideModal();
    }).catch(() => {
      showError();
    });
  }
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorText.INVALID_HASHTAG,
  1,
  true
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

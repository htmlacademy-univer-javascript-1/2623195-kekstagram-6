import { isEscapeKey, toggleClass } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { uploadData } from './fetch.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const uploadSubmit = uploadForm.querySelector('#upload-submit');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const effectNoneRadio = uploadForm.querySelector('#effect-none');

let isFormOpen = false;
let pristine;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const validateHashtags = (value) => {
  const inputText = value.trim();

  if (!inputText) {
    return true;
  }

  const hashtags = inputText.toLowerCase().split(/\s+/).filter((tag) => tag);

  const rules = [
    {
      check: hashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: hashtags.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: hashtags.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: hashtags.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`
    },
    {
      check: hashtags.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
    },
    {
      check: hashtags.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы'
    },
  ];

  return rules.every((rule) => !rule.check);
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const updateSubmitButtonState = (isDisabled = false) => {
  uploadSubmit.disabled = isDisabled;

  if (!pristine) {
    return;
  }

  const isHashtagsValid = pristine.validate(hashtagInput);
  const isCommentValid = pristine.validate(commentInput);

  const isValid = isHashtagsValid && isCommentValid;

  if (!isDisabled) {
    uploadSubmit.disabled = !isValid;
  }
};

const closeUploadForm = () => {
  if (isFormOpen) {
    resetFormToDefault();
    toggleUploadModal();
  }
};

const onUploadEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput ||
        document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeUploadForm();
  }
};

function toggleUploadModal() {
  toggleClass(uploadOverlay, 'hidden');
  toggleClass(document.body, 'modal-open');
  isFormOpen = !isFormOpen;

  if (isFormOpen) {
    document.addEventListener('keydown', onUploadEscKeyDown);
  } else {
    document.removeEventListener('keydown', onUploadEscKeyDown);
  }
}

const openUploadForm = () => {
  if (!isFormOpen) {
    toggleUploadModal();
  }
};

function resetFormToDefault() {
  uploadFileInput.value = '';
  uploadForm.reset();
  scaleInput.value = 100;
  effectLevelInput.value = 100;
  effectNoneRadio.checked = true;
  hashtagInput.value = '';
  commentInput.value = '';

  imagePreview.src = '';
  imagePreview.style.filter = 'none';
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  resetScale();
  resetEffects();

  if (pristine) {
    pristine.reset();
  }
  updateSubmitButtonState(false);
}

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onCloseUploadClick = () => {
  closeUploadForm();
};

const loadImage = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (!matches) {
    return false;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imagePreview.src = reader.result;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.readAsDataURL(file);
  return true;
};

const onFileInputChange = () => {
  const file = uploadFileInput.files[0];

  if (file && loadImage(file)) {
    openUploadForm();
  }
};

const onHashtagInput = () => {
  if (pristine) {
    pristine.validate(hashtagInput);
    updateSubmitButtonState();
  }
};

const onCommentInput = () => {
  if (pristine) {
    pristine.validate(commentInput);
    updateSubmitButtonState();
  }
};

const onUploadSuccess = () => {
  showSuccessMessage();
  closeUploadForm();
  updateSubmitButtonState(false);
};

const onUploadError = () => {
  showErrorMessage();
  updateSubmitButtonState(false);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine ? pristine.validate() : true;

  if (!isValid) {
    return;
  }

  if (!uploadFileInput.files || uploadFileInput.files.length === 0) {
    return;
  }

  updateSubmitButtonState(true);

  const formData = new FormData(evt.target);

  uploadData(
    onUploadSuccess,
    onUploadError,
    'POST',
    formData
  );
};

const initUploadForm = () => {
  if (window.Pristine) {
    pristine = new window.Pristine(uploadForm, {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'img-upload__item--invalid',
      successClass: 'img-upload__item--valid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__error-text'
    });

    pristine.addValidator(
      hashtagInput,
      validateHashtags,
      (value) => {
        const hashtags = value.trim().toLowerCase().split(/\s+/).filter((tag) => tag);

        if (!value.trim()) {
          return '';
        }

        if (hashtags.some((item) => item.indexOf('#', 1) >= 1)) {
          return 'Хэш-теги разделяются пробелами';
        }
        if (hashtags.some((item) => item[0] !== '#')) {
          return 'Хэш-тег должен начинаться с символа #';
        }
        if (hashtags.some((item, num, arr) => arr.includes(item, num + 1))) {
          return 'Хэш-теги не должны повторяться';
        }
        if (hashtags.some((item) => item.length > MAX_SYMBOLS)) {
          return `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`;
        }
        if (hashtags.length > MAX_HASHTAGS) {
          return `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`;
        }
        if (hashtags.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item))) {
          return 'Хэш-тег содержит недопустимые символы';
        }

        return '';
      },
      2,
      false
    );

    pristine.addValidator(
      commentInput,
      validateComment,
      `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`,
      1,
      false
    );
  }

  uploadFileInput.addEventListener('change', onFileInputChange);
  uploadCancel.addEventListener('click', onCloseUploadClick);

  hashtagInput.addEventListener('keydown', onFieldKeydown);
  commentInput.addEventListener('keydown', onFieldKeydown);

  hashtagInput.addEventListener('input', onHashtagInput);
  commentInput.addEventListener('input', onCommentInput);

  uploadForm.addEventListener('submit', onFormSubmit);

  updateSubmitButtonState(false);
  initScale();
  initEffects();
};

export { initUploadForm, closeUploadForm };

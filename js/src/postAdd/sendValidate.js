import {closeEditor} from './addPostForm';
import displayMessage from './displayMessage';

const uploadImageForm = document.querySelector('.img-upload__form');
const submitButton = uploadImageForm.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const modal = document.querySelector('.img-upload__overlay');
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const ERROR_MESSAGE_FOR_COMMENTS = 'Длина комментария больше 140 символов.';

const hashtags = uploadImageForm.querySelector('.text__hashtags');
const descriptions = uploadImageForm.querySelector('.text__description');

let errorMessage = '';


const error = () => errorMessage;

const isHashtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Введён невалидный хэштег'
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять из одной решетки'
    },
    {
      check: inputArray.length > MAX_HASHTAG_COUNT,
      error: 'Превышено количество хэштегов'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item.toLowerCase(), num + 1)),
      error: 'Хэштеги повторяются'
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_LENGTH),
      error: 'Максимальная длина одного хэштега 20 символов, включая решётку'
    },
    {
      check: inputArray.some((item) => !/^#[\wа-яё]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы'
    },
    {
      check: inputArray.some((item) => /[^\wа-яё#]/.test(item)),
      error: 'Хэштег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д.'
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;
let pristineConfig = null;

export const destroyPristine = () => {
  if (pristineConfig) {
    pristineConfig.reset();
    pristineConfig.destroy();
    pristineConfig = null;
  }
};
export const createPristine = (form) => {
  if (!pristineConfig){

    pristineConfig = new Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'img-upload__field-wrapper--error',
      errorTextTag: 'div',
    });

    pristineConfig.addValidator(hashtags, isHashtagsValid, error);
    pristineConfig.addValidator(descriptions, isCommentValid, ERROR_MESSAGE_FOR_COMMENTS);
  } else{
    destroyPristine();
  }
};

const sendImage = async (post) => {
  if (post.checkValidity()) {
    submitButton.disabled = true;
    displayMessage(successTemplate);
    post.reset();
    modal.classList.remove('show');
    closeEditor(true);
    submitButton.disabled = false;
  }
};

const formSubmit = async (event) => {
  event.preventDefault();

  const isValid = pristineConfig.validate();

  if (isValid) {
    await sendImage(event.target);
  } else {
    displayMessage(errorTemplate);
  }
};

export default formSubmit;
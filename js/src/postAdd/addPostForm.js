import { createPristine, destroyPristine, setupFormSubmitHandler } from './sendValidate';
import { destroySlider, effectChangeHandler, initEffectSlider } from './effects';
import { destroyScaleController, initScaleController } from './scale';
import { sendData } from '../api/api';


const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const textInputs = [uploadForm.querySelector('.text__hashtags'), uploadForm.querySelector('.text__description')];
const effectPreview = photoEditorForm.querySelectorAll('.effects__preview');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');
const effectItems = photoEditorForm.querySelectorAll('.effects__radio');
const effectLevel = photoEditorForm.querySelector('.effect-level');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const modal = document.querySelector('.img-upload__overlay');
let messageElement = null;
let messageButton = null;
let inner = null;

const onMessageButtonClick = () => {
  if (messageElement) {
    messageElement.remove();
    messageButton.removeEventListener('click', onMessageButtonClick);
    document.removeEventListener('click', handleOutsideClick);
  }
};

function handleOutsideClick (event) {
  if (!inner.contains(event.target)) {
    messageElement.remove();
    document.removeEventListener('click', handleOutsideClick);
  }
}

const displayMessage = (type) => {
  const messageTemplate = document.querySelector(`#${type}`).content.cloneNode(true);
  messageElement = messageTemplate.querySelector(`.${type}`);
  messageButton = messageTemplate.querySelector(`.${type}__button`);
  inner = messageElement.querySelector(`.${type}__inner`);

  document.body.appendChild(messageElement);

  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleDocumentKeydown);
};

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    const isFocusedOnTextInput = textInputs.some((input) => input === document.activeElement);

    if (messageElement) {
      messageButton.removeEventListener('click', onMessageButtonClick);
      document.removeEventListener('click', handleOutsideClick);
      messageElement.remove();
      messageElement = null;
    } else {
      if (isFocusedOnTextInput) {
        event.stopPropagation();
      } else {
        closeEditor();
      }
    }
  }
}

const onPhotoEditorResetBtnClick = () => {
  closeEditor();
};

const uploadImage = () => {
  const onFileChange = () => {
    photoEditorForm.classList.remove('hidden');
    body.classList.add('modal-open');

    createPristine(uploadForm);

    previewImage.src = URL.createObjectURL(uploadFileControl.files[0]);
    effectPreview.forEach((preview) => (preview.style.backgroundImage = `url(${previewImage.src})`));

    initEffectSlider();
    initScaleController();

    effectLevel.classList.add('hidden');
    effectItems.forEach((item) => {
      item.addEventListener('change', effectChangeHandler);
    });

    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', handleDocumentKeydown);
  };

  const onFormSubmit = async (event) => {
    event.effect = document.querySelector('input[name="effect"]:checked').value;
    event.effectLevel = effectLevel.value;
    event.scale = photoEditorForm.querySelector('.scale__control--value').value;
    event.preventDefault();
    await setupFormSubmitHandler(event);
  };

  uploadFileControl.addEventListener('change', onFileChange);
  uploadForm.addEventListener('submit', onFormSubmit);
};

const sendImage = async (post) => {
  if (post.checkValidity()) {
    submitButton.disabled = true;
    try {
      await sendData(new FormData(post));
      displayMessage('success');
      modal.classList.remove('show');
      post.reset();
    } catch (err) {
      displayMessage('error');
    } finally {
      submitButton.disabled = false;
    }
  }
};

function closeEditor() {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', setupFormSubmitHandler);

  destroyScaleController();
  destroySlider();

  effectItems.forEach((item) => {
    item.checked = item.value === 'none';
  });

  previewImage.style.filter = '';
  previewImage.className = '';
  previewImage.classList.add('effects__preview--none');
  effectLevel.classList.add('hidden');
  effectItems.forEach((item) => item.removeEventListener('change', effectChangeHandler));

  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  textInputs.forEach((input) => (input.value = ''));
  document.removeEventListener('keydown', handleDocumentKeydown); // Удаляем обработчик при закрытии формы
  uploadForm.reset();

  destroyPristine();
}

export { uploadImage, sendImage, closeEditor};

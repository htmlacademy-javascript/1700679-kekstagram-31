import { createPristine, destroyPristine, setupFormSubmitHandler } from './sendValidate';
import { destroySlider, effectChangeHandler, initEffectSlider } from './effects';
import { destroyScaleController, initScaleController } from './scale';
import { sendData } from '../api/api';
import displayMessage from '../api/displayMessage';

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

const onPhotoEditorResetBtnClick = () => {
  closeEditor().then();
};

const handleDocumentKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    const isFocusedOnTextInput = textInputs.some((input) => input === document.activeElement);

    if (isFocusedOnTextInput) {
      event.stopPropagation();
    } else {
      closeEditor().then();
    }
  }
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
    document.removeEventListener('keydown', handleDocumentKeydown);
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
  let closed = false;
  document.removeEventListener('keydown', handleDocumentKeydown);
  if (post.checkValidity()) {
    submitButton.disabled = true;
    try {
      await sendData(new FormData(post));
      closed = await displayMessage('success');
      modal.classList.remove('show');
      post.reset();
    } catch (err) {
      closed = await displayMessage('internet-error');
    } finally {
      submitButton.disabled = false;
    }
  }
  if (closed) {
    document.addEventListener('keydown', handleDocumentKeydown);
  }
};

async function closeEditor() {
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
  document.removeEventListener('keydown', handleDocumentKeydown);
  uploadForm.reset();

  destroyPristine();
}

export { uploadImage, sendImage, closeEditor };

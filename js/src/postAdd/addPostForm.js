import {createPristine, destroyPristine, setupFormSubmitHandler} from './sendValidate';
import {destroySlider, effectChangeHandler, initEffectSlider} from './effects';
import { destroyScaleController, initScaleController } from './scale';

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


const handleDocumentKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    const isFocusedOnTextInput = textInputs.some((input) => input === document.activeElement);

    if (isFocusedOnTextInput) {
      event.stopPropagation();
    } else{
      closeEditor();
    }
  }
};

export const uploadImage = () => {
  uploadFileControl.addEventListener('change', () => {
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

  });

  uploadForm.addEventListener('submit', async (event) => {
    event.effect = document.querySelector('input[name="effect"]:checked').value;
    event.effectLevel = effectLevel.value;
    event.scale = photoEditorForm.querySelector('.scale__control--value').value;
    event.preventDefault();
    await setupFormSubmitHandler(event);
  });
};

export const onSuccessfulSubmit = () => {
  document.addEventListener('keydown', handleDocumentKeydown);
};

export const removeDocumentKeydownHandler = ()=> {
  document.removeEventListener('keydown', handleDocumentKeydown);
};

export function closeEditor() {
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

function onPhotoEditorResetBtnClick() {
  closeEditor();
}

import formSubmit, {createPristine, destroyPristine} from './sendValidate';
import { initEffectSlider, effectChangeHandler } from './effects';
import { handleScaleControlSmallerClick, handleScaleControlBiggerClick } from './scale';

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
const effectLevelSlider = photoEditorForm.querySelector('.effect-level__slider');
const effectLevelValue = photoEditorForm.querySelector('.effect-level__value');
const scaleControl = photoEditorForm.querySelector('.scale__control--value');
const scaleControlSmaller = photoEditorForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoEditorForm.querySelector('.scale__control--bigger');
let scale = 100;


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
  const onSuccessfulSubmit = () => {
    document.addEventListener('keydown', handleDocumentKeydown);
  };

  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    body.classList.add('modal-open');

    createPristine(uploadForm);

    previewImage.src = URL.createObjectURL(uploadFileControl.files[0]);
    effectPreview.forEach((preview) => (preview.style.backgroundImage = `url(${previewImage.src})`));

    initEffectSlider();

    scaleControlSmaller.addEventListener('click', handleScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', handleScaleControlBiggerClick);

    effectLevel.classList.add('hidden');
    effectItems.forEach((item) => {
      item.addEventListener('change', effectChangeHandler);
    });

    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', handleDocumentKeydown);
  });

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await formSubmit(event, onSuccessfulSubmit);
  });
};

export function closeEditor(isSuccessfulSubmit = false) {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', formSubmit);
  scale = 100;
  previewImage.style.transform = `scale(${scale / 100})`;
  scaleControl.value = `${scale}%`;
  effectLevelValue.value = 100;
  effectLevelSlider.noUiSlider.set(100);
  effectLevelSlider.noUiSlider.destroy();
  effectItems.forEach((item) => {
    if (item.value === 'none') {
      item.checked = true;
    } else {
      item.checked = false;
    }
  });
  previewImage.style.filter = '';
  previewImage.className = '';
  previewImage.classList.add('effects__preview--none');
  effectLevel.classList.add('hidden');
  effectItems.forEach((item) => item.removeEventListener('change', effectChangeHandler));

  scaleControlSmaller.removeEventListener('click', handleScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', handleScaleControlBiggerClick);

  if (!isSuccessfulSubmit) {
    document.removeEventListener('keydown', handleDocumentKeydown);
  }

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

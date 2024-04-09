import {createPristine, destroyPristine, onFileUploadSubmitValidate} from './formValidation';
import {destroyScaleController, initScaleController} from './scale';
import {sendData} from '../api/api';
import {displayMessageWithHandlers, isMessageWithHandlersVisible} from '../api/messages';
import {destroyEffectController, initEffectController} from './effects';

const SELECTED_FILE = 0;

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const textInputs = [uploadForm.querySelector('.text__hashtags'), uploadForm.querySelector('.text__description')];
const effectPreview = photoEditorForm.querySelectorAll('.effects__preview');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');
const effectLevel = photoEditorForm.querySelector('.effect-level');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const onDocumentKeyDown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    const isFocusedOnTextInput = textInputs.some((input) => input === document.activeElement);
    if (!isMessageWithHandlersVisible()) {
      if (isFocusedOnTextInput) {
        event.stopPropagation();
      } else {
        closeEditor();
      }
    }
  }
};

const onPhotoEditorResetBtnClick = () => {
  closeEditor();
};

const uploadImage = () => {
  const onFileChange = () => {
    photoEditorForm.classList.remove('hidden');
    body.classList.add('modal-open');

    createPristine(uploadForm);

    previewImage.src = URL.createObjectURL(uploadFileControl.files[SELECTED_FILE]);
    effectPreview.forEach((preview) => (preview.style.backgroundImage = `url(${previewImage.src})`));

    initScaleController();
    initEffectController();

    uploadForm.addEventListener('submit', onFileUploadSubmitValidate);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  const onFormSubmit = async (event) => {
    const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
    const effectLevelValue = effectLevel.value;
    const scaleValue = photoEditorForm.querySelector('.scale__control--value').value;

    event.effect = selectedEffect;
    event.effectLevel = effectLevelValue;
    event.scale = scaleValue;

    event.preventDefault();
  };

  uploadFileControl.addEventListener('change', onFileChange);
  uploadForm.addEventListener('submit', onFormSubmit);
};

const sendImage = async (post) => {
  submitButton.disabled = true;
  try {
    await sendData(post);
    displayMessageWithHandlers('success');
    closeEditor();
  } catch (err) {
    displayMessageWithHandlers('error');
  } finally {
    submitButton.disabled = false;
  }
};

function closeEditor() {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', onFileUploadSubmitValidate);

  destroyScaleController();
  destroyEffectController();

  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadForm.reset();

  destroyPristine();
}

export { uploadImage, sendImage };

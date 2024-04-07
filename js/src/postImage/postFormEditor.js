import {createPristine, destroyPristine, formSubmit} from './formValidation';
import {destroyScaleController, initScaleController} from './scale';
import {sendData} from '../api/api';
import {displayMessageWithHandlers, isMessageWithHandlersVisible} from '../api/messages';
import {destroyEffectController, initEffectController} from './effects';

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

const handleDocumentKeydown = (event) => {
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

    previewImage.src = URL.createObjectURL(uploadFileControl.files[0]);
    effectPreview.forEach((preview) => (preview.style.backgroundImage = `url(${previewImage.src})`));

    initScaleController();
    initEffectController();

    uploadForm.addEventListener('submit', formSubmit);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', handleDocumentKeydown);
  };

  const onFormSubmit = async (event) => {
    event.effect = document.querySelector('input[name="effect"]:checked').value;
    event.effectLevel = effectLevel.value;
    event.scale = photoEditorForm.querySelector('.scale__control--value').value;
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
  uploadForm.removeEventListener('submit', formSubmit);

  destroyScaleController();
  destroyEffectController();

  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  document.removeEventListener('keydown', handleDocumentKeydown);
  uploadForm.reset();

  destroyPristine();
}

export { uploadImage, sendImage };

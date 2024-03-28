import formSubmit from './sendValidate';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const textInputs = [uploadForm.querySelector('.text__hashtags'), uploadForm.querySelector('.text__description')];

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
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', handleDocumentKeydown);
  });

  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formSubmit(event, onSuccessfulSubmit);
  });
};

export function closeEditor(isSuccessfulSubmit = false) {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', formSubmit);

  if (!isSuccessfulSubmit) {
    document.removeEventListener('keydown', handleDocumentKeydown);
  }

  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  textInputs.forEach((input) => (input.value = ''));
  document.removeEventListener('keydown', handleDocumentKeydown);
}

function onPhotoEditorResetBtnClick() {
  closeEditor();
}

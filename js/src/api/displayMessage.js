const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const internetErrorTemplate = document.querySelector('#data-error');
const uploadImageForm = document.querySelector('.img-upload__form');
const descriptions = uploadImageForm.querySelector('.text__description');
let successButton;
let errorButton;
let successButtonClickListener;
let errorButtonClickListener;

const displayMessage = (type) => {
  let template;
  let messageElement;

  if (type === 'success') {
    template = successTemplate;
    messageElement = template.content.cloneNode(true).firstElementChild;

    successButton = messageElement.querySelector('.success__button');

    if (successButton) {
      successButtonClickListener = () => {
        successButton.removeEventListener('click', successButtonClickListener);
        messageElement.remove();
        cleanUpEventListeners();
      };
      successButton.addEventListener('click', successButtonClickListener);
    }

    document.addEventListener('keydown', handleEscKeydown);
    document.addEventListener('click', handleOutsideClick);
  } else if (type === 'error') {
    template = errorTemplate;
    messageElement = template.content.cloneNode(true).firstElementChild;

    errorButton = messageElement.querySelector('.error__button');
    if (errorButton) {
      errorButtonClickListener = () => {
        messageElement.remove();
        errorButton.removeEventListener('click', errorButtonClickListener);
        cleanUpEventListeners();
      };
      errorButton.addEventListener('click', errorButtonClickListener);
    }

    document.addEventListener('keydown', handleEscKeydown);
    document.addEventListener('click', handleOutsideClick);
  } else if (type === 'internet-error') {
    template = internetErrorTemplate;
    messageElement = template.content.cloneNode(true).firstElementChild;
    setTimeout(() => {
      messageElement.remove();
      cleanUpEventListeners();
    }, 5000);
  }

  function handleEscKeydown(event) {
    if (event.key === 'Escape' && !descriptions.contains(document.activeElement)) {
      messageElement.remove();
      document.removeEventListener('keydown', handleEscKeydown);
      cleanUpEventListeners();
    }
  }

  function handleOutsideClick(event) {
    const successInner = messageElement.querySelector('.success__inner');
    if (!successInner.contains(event.target)) {
      messageElement.remove();
      document.removeEventListener('click', handleOutsideClick);
      cleanUpEventListeners();
    }
  }

  function cleanUpEventListeners() {
    document.removeEventListener('keydown', handleEscKeydown, false);
    document.removeEventListener('click', handleOutsideClick, false);
    if (successButton) {
      successButton.removeEventListener('click', successButtonClickListener, false);
    }
    if (errorButton) {
      errorButton.removeEventListener('click', errorButtonClickListener, false);
    }
  }

  document.body.appendChild(messageElement);
  return messageElement;
};

export default displayMessage;

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const uploadImageForm = document.querySelector('.img-upload__form');
const descriptions = uploadImageForm.querySelector('.text__description');
const displayMessage = (type) => {
  let formClosed = false;
  let successButton;
  let errorButton;
  let successButtonClickListener;
  let errorButtonClickListener;
  let template;
  let messageElement;
  let inner;

  let cleanUpEventListenersMessage = () => {
    document.removeEventListener('keydown', handleEscKeydown, false);
    document.removeEventListener('click', handleOutsideClick, false);
    if (successButton) {
      successButton.removeEventListener('click', successButtonClickListener, false);
    }
    if (errorButton) {
      errorButton.removeEventListener('click', errorButtonClickListener, false);
    }
    formClosed = true;
  };

  function handleOutsideClick (event) {
    if (!inner.contains(event.target)) {
      messageElement.remove();
      document.removeEventListener('click', handleOutsideClick);
      cleanUpEventListenersMessage();
    }
  }

  function handleEscKeydown(event){
    if (event.key === 'Escape' && !descriptions.contains(document.activeElement)) {
      messageElement.remove();
      document.removeEventListener('keydown', handleEscKeydown);
      cleanUpEventListenersMessage();
    }
  }


  if (type === 'success') {
    template = successTemplate;
    messageElement = template.content.cloneNode(true).firstElementChild;
    inner = messageElement.querySelector('.success__inner');
    successButton = messageElement.querySelector('.success__button');

    if (successButton) {
      successButtonClickListener = () => {
        successButton.removeEventListener('click', successButtonClickListener);
        messageElement.remove();
        cleanUpEventListenersMessage();
      };
      successButton.addEventListener('click', successButtonClickListener);
    }

    document.addEventListener('keydown', handleEscKeydown);
    document.addEventListener('click', handleOutsideClick);
  } else if (type === 'internet-error') {
    template = errorTemplate;

    messageElement = template.content.cloneNode(true).firstElementChild;
    inner = messageElement.querySelector('.error__inner');
    errorButton = messageElement.querySelector('.error__button');
    if (errorButton) {
      errorButtonClickListener = () => {
        messageElement.remove();
        errorButton.removeEventListener('click', errorButtonClickListener);
        cleanUpEventListenersMessage();
      };
      errorButton.addEventListener('click', errorButtonClickListener);
    }

    document.addEventListener('keydown', handleEscKeydown);
    document.addEventListener('click', handleOutsideClick);
  }

  document.body.appendChild(messageElement);

  return new Promise((resolve) => { // Чтобы не наслаивались слушатели на ESCAPE пока форма открыта
    cleanUpEventListenersMessage = () => {
      document.removeEventListener('keydown', handleEscKeydown, false);
      document.removeEventListener('click', handleOutsideClick, false);
      if (successButton) {
        successButton.removeEventListener('click', successButtonClickListener, false);
      }
      if (errorButton) {
        errorButton.removeEventListener('click', errorButtonClickListener, false);
      }
      formClosed = true;
      resolve(formClosed);
    };
  });
};

export default displayMessage;

const uploadImageForm = document.querySelector('.img-upload__form');
const descriptions = uploadImageForm.querySelector('.text__description');

const displayMessage = (template) => {
  const messageElement = template.content.cloneNode(true).firstElementChild;
  document.body.appendChild(messageElement);

  const successButton = messageElement.querySelector('.success__button');
  let successButtonClickListener;

  if (successButton) {
    successButtonClickListener = () => {
      successButton.removeEventListener('click', successButtonClickListener);
      messageElement.remove();
      cleanUpEventListeners();
    };
    successButton.addEventListener('click', successButtonClickListener);
  }

  const errorButton = messageElement.querySelector('.error__button');
  let errorButtonClickListener;

  if (errorButton) {
    errorButtonClickListener = () => {
      messageElement.remove();
      errorButton.removeEventListener('click', errorButtonClickListener);
      cleanUpEventListeners();
    };
    errorButton.addEventListener('click', errorButtonClickListener);
  }

  const handleEscKeydown = (event) => {
    if (event.key === 'Escape' && !descriptions.contains(document.activeElement)) {
      messageElement.remove();
      document.removeEventListener('keydown', handleEscKeydown);
      cleanUpEventListeners();
    }
  };

  const handleOutsideClick = (event) => {
    const successInner = messageElement.querySelector('.success__inner');
    if (!successInner.contains(event.target)) {
      messageElement.remove();
      document.removeEventListener('click', handleOutsideClick);
      cleanUpEventListeners();
    }
  };

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

  document.addEventListener('keydown', handleEscKeydown);
  document.addEventListener('click', handleOutsideClick);

  return messageElement;
};

export default displayMessage;

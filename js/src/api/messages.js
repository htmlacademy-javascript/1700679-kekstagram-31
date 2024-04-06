let messageElementState = null;
let messageButton = null;
let inner = null;

const onMessageButtonClick = () => {
  if (messageElementState) {
    closeMessage();
  }
};

const handleOutsideClick = (event) => {
  if (!inner.contains(event.target)) {
    closeMessage();
  }
};

const displayMessageWithHandlers = (type) => {
  const messageTemplate = document.querySelector(`#${type}`).content.cloneNode(true);
  messageElementState = messageTemplate.querySelector(`.${type}`);
  messageButton = messageTemplate.querySelector(`.${type}__button`);
  inner = messageElementState.querySelector(`.${type}__inner`);

  document.body.appendChild(messageElementState);

  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleDocumentKeydown);
};

function closeMessage() {
  if (messageElementState) {
    messageButton.removeEventListener('click', onMessageButtonClick);
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleDocumentKeydown);
    messageElementState.remove();
    messageElementState = null;
  }
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMessage();
  }
}

const timedMessage = (type, time) => {
  const messageTemplate = document.querySelector(`#${type}`).content.cloneNode(true);
  messageElementState = messageTemplate.querySelector(`.${type}`);
  document.body.appendChild(messageElementState);
  setTimeout(() => {
    messageElementState.remove();
  }, time);
};

const isMessageVisible = () => !!messageElementState;

export { displayMessageWithHandlers, timedMessage, isMessageVisible };

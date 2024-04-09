let messageElementState = null;
let messageButton = null;
let inner = null;

const onMessageButtonClick = () => {
  if (messageElementState) {
    closeMessage();
  }
};

const onOutsideClick = (event) => {
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
  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeMessage() {
  if (messageElementState) {
    messageButton.removeEventListener('click', onMessageButtonClick);
    document.removeEventListener('click', onOutsideClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    messageElementState.remove();
    messageElementState = null;
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMessage();
  }
}

const displayTimedMessage = (type, time) => {
  const messageTemplate = document.querySelector(`#${type}`).content.cloneNode(true);
  const messageElement = messageTemplate.querySelector(`.${type}`);
  document.body.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, time);
};

const isMessageWithHandlersVisible = () => !!messageElementState;

export { displayMessageWithHandlers, displayTimedMessage, isMessageWithHandlersVisible };

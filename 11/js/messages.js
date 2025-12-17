// messages.js
import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let currentMessage = null;

const closeMessage = () => {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
  }
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
};

const showMessage = (template) => {
  closeMessage();

  currentMessage = template.cloneNode(true);

  const closeButton = currentMessage.querySelector('.success__button') ||
                      currentMessage.querySelector('.error__button');

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);

  document.body.appendChild(currentMessage);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };

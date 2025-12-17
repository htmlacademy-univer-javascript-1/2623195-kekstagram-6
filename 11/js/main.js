
import {renderThumbnails} from './thumbnail.js';
import { loadData } from './fetch.js';
import { initUploadForm } from './form.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderThumbnails(data.slice());
  document.querySelector('.img-filters').classList.remove('img-filters-inactive');
};

const onFail = (errorMessage) => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'fixed';
  messageAlert.style.left = '0';
  messageAlert.style.top = '0';
  messageAlert.style.right = '0';
  messageAlert.style.padding = '20px';
  messageAlert.style.fontSize = '24px';
  messageAlert.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
  messageAlert.style.color = 'white';
  messageAlert.style.textAlign = 'center';
  messageAlert.style.zIndex = '1000';
  messageAlert.style.fontFamily = 'Arial, sans-serif';
  messageAlert.textContent = `Ошибка загрузки фотографий: ${errorMessage}`;

  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.right = '20px';
  closeButton.style.top = '10px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '30px';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    messageAlert.remove();
  });

  messageAlert.appendChild(closeButton);
  document.body.appendChild(messageAlert);
};

loadData(onSuccess, onFail);
initUploadForm();

export { photos };

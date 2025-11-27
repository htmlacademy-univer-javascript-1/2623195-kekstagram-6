import { showBigPicture } from './big-picture.js';

const createThumbnailElement = (photoData) => {
  const template = document.querySelector('#picture');
  const thumbnail = template.content.querySelector('.picture').cloneNode(true);
  const imgElement = thumbnail.querySelector('.picture__img');
  imgElement.src = photoData.url;
  imgElement.alt = photoData.description;
  thumbnail.querySelector('.picture__likes').textContent = photoData.likes;
  thumbnail.querySelector('.picture__comments').textContent = photoData.comments.length;
  thumbnail.dataset.thumbnailId = photoData.id;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(photoData);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const picturesContainer = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createThumbnailElement(photo));
  });
  picturesContainer.appendChild(fragment);
};

export {renderThumbnails};

/*

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const {url, comments, likes} = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    showBigPicture(picture);
  });

  return pictureElement;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (objects) => (
  objects.forEach((item) => {
    fragment.appendChild(renderPhoto(item));
  });

  pictures.appendChild(fragment);
);
*/

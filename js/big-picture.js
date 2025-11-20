import { isEscapeKey, toggleClass } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadButton = bigPicture.querySelector('.comments-loader');

const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    socialComments.appendChild(commentElement);
  });
};

const show = (picture) => {
  const {url, likes, comments, description} = picture;

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  pictureCaption.textContent = description;

  renderComments(comments);
};

function onBigPictureEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

function closeBigPicture() {
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  toggleModal();
}

const onCloseBigPictureClick = () => {
  closeBigPicture();
};

const showBigPicture = (picture) => {
  show(picture);

  socialCommentsCount.classList.add('hidden');
  loadButton.classList.add('hidden');

  document.addEventListener('keydown', onBigPictureEscKeyDown);
  toggleModal();
};

closeButton.addEventListener('click', onCloseBigPictureClick);

export { showBigPicture };


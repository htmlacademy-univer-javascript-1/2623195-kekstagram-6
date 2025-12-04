import { isEscapeKey, toggleClass, numDecline } from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadButton = bigPicture.querySelector('.comments-loader');
const socialComment = bigPicture.querySelector('.social__comment');


const commentFragment = document.createDocumentFragment();


let commentsCount = COMMENTS_STEP;
let currentComments =[];


const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const renderComment = (comment) => {
  const newComment = socialComment.cloneNode(true);

  const avatar = newComment.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const renderComments = () => {
  socialComments.innerHTML = '';
  socialCommentsCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  socialCommentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${currentComments.length}</span> ${numDecline(currentComments.length, 'комментарий', 'комментария', 'комментариев')}`;

  for (let i = 0; i < commentsCount; i++) {
    commentFragment.appendChild(renderComment(currentComments[i]));
  }

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }

  socialComments.appendChild(commentFragment);
};

const show = (picture) => {
  const {url, likes, description} = picture;

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
};

const onLoadButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

function onBigPictureEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

function closeBigPicture() {
  commentsCount = COMMENTS_STEP;

  document.removeEventListener('keydown', onBigPictureEscKeyDown);

  toggleModal();
}

const onCloseBigPictureClick = () => {
  closeBigPicture();
};

const showBigPicture = (picture) => {

  currentComments = picture.comments.slice();

  show(picture);

  renderComments();

  document.addEventListener('keydown', onBigPictureEscKeyDown);

  toggleModal();

};

loadButton.addEventListener('click', onLoadButtonClick);

closeButton.addEventListener('click', onCloseBigPictureClick);

export {showBigPicture};

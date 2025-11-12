import {getRandomInteger, getRandomArrayElement} from './util.js';

const COUNT_PHOTO = 25;
const MAX_COMMENT = 30;
const MAX_AVATAR = 6;

const DESCRIPTIONS = [
  'Прекрасный закат на берегу моря',
  'Городские огни ночью',
  'Горный пейзаж с заснеженными вершинами',
  'Уютный интерьер кофейни',
  'Яркий осенний лес',
  'Архитектура старого города',
  'Макросъемка цветов',
  'Портрет в студии',
  'Уличная фотография',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'София',
  'Алексей',
  'Анна',
  'Дмитрий',
  'Елена',
  'Сергей',
  'Ольга'
];

const Likes = {
  MIN: 15,
  MAX: 200
};

let commentIdCounter = 0;
const generateCommentId = () => {
  commentIdCounter += 1;
  return commentIdCounter;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const addComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment());
  }
  return comments;
};

const addPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: addComments(getRandomInteger(0, MAX_COMMENT))
});
const generatePhotos = () => {
  const photos =[];
  for (let i = 0; i < COUNT_PHOTO; i++) {
    photos.push(addPhoto(i));
  }
  return photos;
};

export { generatePhotos };

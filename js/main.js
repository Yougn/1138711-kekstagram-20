'use strict';

var DESCRIPTIONS = ['У бабушки!', 'Уточка!', 'С любимкой!'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVA = 1;
var MAX_AVA = 6;
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артем', 'Егор', 'Леночка', 'Максим', 'Захар'];
var NUMBER = 25;
var COMMENTS_NUMBER = 10;

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (elements) {
  var index = Math.floor(Math.random() * elements.length);
  return elements[index];
};

var createComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomInteger(MIN_AVA, MAX_AVA) + '.svg',
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES)
  };
  return comment;
};

var getRandomCommentsList = function () {
  var commentsList = [];
  for (var i = 0; i < COMMENTS_NUMBER; i++) {
    commentsList.push(createComment());
  }
  var maxNumber = 10;
  return commentsList.slice(0, getRandomInteger(1, maxNumber));
};

var getObject = function (number) {
  return {
    url: 'photos/' + number + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: getRandomCommentsList()
  }
};

var getObjectsList = function (number) {
  var blocks = [];
  for (var i = 0; i < number; i++) {
    blocks.push(getObject(i));
  }
  return blocks;
};

var photos = getObjectsList(NUMBER);

var pictureList = document.querySelector('.pictures')
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (photos) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('img').src = photos.url;
  picture.querySelector('.picture__info .picture__likes').textContent = photos.likes;
  picture.querySelector('.picture__info .picture__comments').textContent = photos.comments;

  return picture;
};

var createFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture (photos[i]));
  }
  return fragment;
};

pictureList.appendChild(createFragment(photos));

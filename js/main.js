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
var CARD_IMG_WIDTH = 35;
var CARD_IMG_HEIGHT = 35;

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
  var comments = [];
  var randomNumber = getRandomInteger(1, NUMBER)
  for (var i = 0; i < randomNumber; i++) {
    comments.push(createComment());
  }
  return comments;
};

var getObjectPicture = function (number) {
  return {
    url: 'photos/' + number + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: getRandomCommentsList()
  }
};

var getObjectsList = function (number) {
  var objectLists = [];
  for (var i = 0; i < number; i++) {
    objectLists.push(getObjectPicture(i));
  }
  return objectLists;
};

var photos = getObjectsList(NUMBER);
console.log(photos);

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
    fragment.appendChild(renderPicture(photos[i]));
  }
  return fragment;
};

pictureList.appendChild(createFragment(photos));

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var renderBigPicture = function (photos) {
  bigPicture.querySelector('.big-picture__img img').src = photos.url;
  bigPicture.querySelector('.likes-count').textContent = photos.likes;
  bigPicture.querySelector('.comments-count').textContent = photos.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos.description;

  var renderComments = function () {
    var pictureComments = bigPicture.querySelector('.social__comments');

    for (var i = 0; i < photos.comments.length; i++) {
      var newElement = document.createElement('li');
      newElement.classList.add('social__comment');
      pictureComments.appendChild(newElement);
    }

    var renderCommentContents = function () {
      var pictureComment = pictureComments.querySelectorAll('.social__comment');

      for (var j = 2; j < photos.comments.length; j++) {
        var newImg = document.createElement('img');
        newImg.classList.add('social__picture');
        newImg.src = photos.comments[j].avatar;
        newImg.alt = photos.comments[j].name;
        newImg.style.width = CARD_IMG_WIDTH;
        newImg.style.height = CARD_IMG_HEIGHT;
        pictureComment[j].appendChild(newImg);

        var newText = document.createElement('p');
        newText.classList.add('social__text');
        newText.textContent = photos.comments[j].message;
        pictureComment[j].appendChild(newText);
      }
    }
    renderCommentContents();
  }
  renderComments();
}

renderBigPicture(photos[0]);

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.remove('comments-loader');
commentCount.classList.add('hidden');

var commentLoader = document.querySelector('.comments-loader');
commentLoader.classList.add('hidden');

var body = document.querySelector('body');
body.classList.add('modal-open')

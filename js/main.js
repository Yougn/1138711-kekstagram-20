'use strict';

(function () {

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
  var BLOCK__WIDTH = 453;
  var STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var MIN_LENGTH = 1;
  var MAX_LENGTH = 19;
  var MAX_BLUR = 3;
  var MIN_BRIGHTNESS = 1;
  var MAX_BRIGHTNESS = 2;
  var NUMBER_HASHTAGS = 5;
  var MIN_X = 0;
  var MAX_X = 453;
  var PIN_WIDTH = 18;
  var NUMBER_COMMENTS = 5;
  var FILTER_DEFAULT = 'filter-default';
  var FILTER_DISCUSSED = 'filter-discussed';
  var FILTER_RANDOM = 'filter-random';

  window.main = {
    DESCRIPTIONS: DESCRIPTIONS,
    MIN_LIKES: MIN_LIKES,
    MAX_LIKES: MAX_LIKES,
    MIN_AVA: MIN_AVA,
    MAX_AVA: MAX_AVA,
    MESSAGES: MESSAGES,
    NAMES: NAMES,
    NUMBER: NUMBER,
    COMMENTS_NUMBER: COMMENTS_NUMBER,
    CARD_IMG_WIDTH: CARD_IMG_WIDTH,
    CARD_IMG_HEIGHT: CARD_IMG_HEIGHT,
    BLOCK__WIDTH: BLOCK__WIDTH,
    STEP: STEP,
    MIN_SIZE: MIN_SIZE,
    MAX_SIZE: MAX_SIZE,
    MIN_LENGTH: MIN_LENGTH,
    MAX_LENGTH: MAX_LENGTH,
    MAX_BLUR: MAX_BLUR,
    MIN_BRIGHTNESS: MIN_BRIGHTNESS,
    MAX_BRIGHTNESS: MAX_BRIGHTNESS,
    NUMBER_HASHTAGS: NUMBER_HASHTAGS,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    PIN_WIDTH: PIN_WIDTH,
    NUMBER_COMMENTS: NUMBER_COMMENTS,
    FILTER_DEFAULT: FILTER_DEFAULT,
    FILTER_DISCUSSED: FILTER_DISCUSSED,
    FILTER_RANDOM: FILTER_RANDOM
  };

})();

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
var BLOCK__WIDTH = 453;
var STEP = 25;
var MIN_SIZE = 25;
var MAX_SIZE = 100;
var MIN_LENGTH = 1;
var MAX_LENGTH = 19;

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

var pictureList = document.querySelector('.pictures')
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (photo) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('img').src = photo.url;
  picture.querySelector('.picture__info .picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__info .picture__comments').textContent = photo.comments;

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
// bigPicture.classList.remove('hidden');

var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  var renderComments = function () {
    var pictureComments = bigPicture.querySelector('.social__comments');
    pictureComments.innerHTML = '';

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var newElement = document.createElement('li');
      newElement.classList.add('social__comment');

      var newImg = document.createElement('img');
      newImg.classList.add('social__picture');
      newImg.src = photo.comments[i].avatar;
      newImg.alt = photo.comments[i].name;
      newImg.style.width = CARD_IMG_WIDTH;
      newImg.style.height = CARD_IMG_HEIGHT;
      newElement.appendChild(newImg);

      var newText = document.createElement('p');
      newText.classList.add('social__text');
      newText.textContent = photo.comments[i].message;
      newElement.appendChild(newText);

      fragment.appendChild(newElement);
    }
    pictureComments.appendChild(fragment);
  }

  renderComments();

  var commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.remove('comments-loader');
  commentCount.classList.add('hidden');

  var commentLoader = document.querySelector('.comments-loader');
  commentLoader.classList.add('hidden');

  var body = document.querySelector('body');
  body.classList.add('modal-open');
}

renderBigPicture(photos[0]);


var uploadFile = document.querySelector('#upload-file');

var showFormImage = function () {
  var formImage = document.querySelector('.img-upload__overlay');
  formImage.classList.remove('hidden');
}

uploadFile.addEventListener('change', function () {
  showFormImage();
});

var closeFormImage = function () {
  var formImage = document.querySelector('.img-upload__overlay');
  formImage.classList.add('hidden');

  uploadFile.value = '';

  var body = document.querySelector('body');
  body.classList.remove('modal-open');
}

var buttonCloseImage = document.querySelector('.img-upload__cancel');

buttonCloseImage.addEventListener('click', function () {
  closeFormImage();
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closeFormImage();
  }
});

var sliderPin = document.querySelector('.effect-level__pin');
var pictureFilter = document.querySelector('.img-upload__preview');

var getSliderPinPosition = function () {
  var x = sliderPin.offsetLeft;
  return x;
};

var getLevelEffect = function () {
  var level = Math.floor((getSliderPinPosition() * 100) / BLOCK__WIDTH);
  return level;
};

var changeEffectInput = function () {
  var levelValue = document.querySelector('.effect-level__value').value;
  levelValue = getLevelEffect() + '%';
  return levelValue;
}

var regulateLevelEffect = function () {

  if (pictureFilter.classList.contains('effects__preview--chrome')) {
    var filterChrome = document.querySelector('.effects__preview--chrome')
    filterChrome.style.filter = 'grayscale(' + getLevelEffect() / 100 + ')';
  } else if (pictureFilter.classList.contains('effects__preview--sepia')) {
    var filterSepia = document.querySelector('.effects__preview--sepia')
    filterSepia.style.filter = 'sepia(' + getLevelEffect() / 100 + ')';
  } else if (pictureFilter.classList.contains('effects__preview--marvin')) {
    var filterMarvin = document.querySelector('.effects__preview--marvin')
    filterMarvin.style.filter = 'invert(' + getLevelEffect() + '%)';
  } else if (pictureFilter.classList.contains('effects__preview--phobos')) {
    var filterPhobos = document.querySelector('.effects__preview--phobos')
    filterPhobos.style.filter = 'blur(' + getLevelEffect() / 100 * 3 + 'px)';
  } else if (pictureFilter.classList.contains('effects__preview--heat')) {
    var filterHeat = document.querySelector('.effects__preview--heat')
    filterHeat.style.filter = 'brightness(' + getLevelEffect() / 100 * 3 + ')';
  } else if (pictureFilter.classList.contains('effects__preview--none')) {
    var slider = document.querySelector('.img-upload__effects')
    slider.classList.add('hidden');
  }

  changeEffectInput();
};

sliderPin.addEventListener('mouseup', function () {
  regulateLevelEffect();
});

var changeFilterPicture = function () {
  var radioFilter = document.querySelectorAll('.effects__radio');

  for (var i = 0; i < radioFilter.length; i++) {
    radioFilter[i].addEventListener('change', function (evt) {
      var choise = evt.target.value;
      pictureFilter.classList.add('effects__preview--' + choise);
      if (pictureFilter.classList.length > 2) {
        pictureFilter.classList.remove('effects__preview--none');
        pictureFilter.classList.remove('effects__preview--chrome');
        pictureFilter.classList.remove('effects__preview--sepia');
        pictureFilter.classList.remove('effects__preview--marvin');
        pictureFilter.classList.remove('effects__preview--phobos');
        pictureFilter.classList.remove('effects__preview--heat');
        pictureFilter.classList.add('effects__preview--' + choise);
      }
    })
  };
};

changeFilterPicture();

var changePictureSize = function () {
  var buttonPlus = document.querySelector('.scale__control--bigger');
  var buttonMinus = document.querySelector('.scale__control--smaller');
  var fieldControl = document.querySelector('.scale__control--value');
  var fieldControlValue = parseInt(fieldControl.value, 10);

  var changeSize = function () {
    var number = parseInt(fieldControl.value, 10);
    pictureFilter.style.transform = 'scale(' + number / 100 + ')';
  };

  buttonPlus.addEventListener('click', function () {
    if (fieldControlValue < MAX_SIZE) {
      fieldControlValue += STEP;
      fieldControl.value = fieldControlValue + "%";
    } else { return MAX_SIZE + "%" }
    changeSize();
  });

  buttonMinus.addEventListener('click', function () {
    if (fieldControlValue > MIN_SIZE) {
      fieldControlValue -= STEP;
      fieldControl.value = fieldControlValue + "%";
    } else { return MIN_SIZE + "%" }
    changeSize();
  });
};

changePictureSize();

var textHashtags = document.querySelector('.text__hashtags');

textHashtags.addEventListener('input', function () {
  var textHashtagsValue = textHashtags.value;

  var validHashtag = function () {
    if (!textHashtagsValue.includes('#')) {
      textHashtags.setCustomValidity('Хеш-тег должен начинаться с символа #');
    } else if (!textHashtagsValue.match(/(^#[a-zA-Zа-яА-Я0-9]*$)/g)) {
      textHashtags.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, эмодзи и т. д.')
    } else if (textHashtagsValue.length === MIN_LENGTH) {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (textHashtagsValue.length > MAX_LENGTH) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега  состовляет 20 символов включая решетку');
    } else {
      textHashtags.setCustomValidity('');
    }
  };

  var textLists = textHashtagsValue.toLowerCase().split(' ');
  var arrayHashtags = [];

  for (var i = 0; i < textLists.length; i++) {
    validHashtag(textLists[i]);

    if (textLists.length > 5) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

    if (arrayHashtags.includes(textLists[i])) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else {
      arrayHashtags.push(textLists[i]);
    }
  }

});

'use strict';

(function () {

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
      avatar: 'img/avatar-' + getRandomInteger(window.main.MIN_AVA, window.main.MAX_AVA) + '.svg',
      message: getRandomElement(window.main.MESSAGES),
      name: getRandomElement(window.main.NAMES)
    };
    return comment;
  };

  var getRandomCommentsList = function () {
    var comments = [];
    var randomNumber = getRandomInteger(1, window.main.NUMBER)
    for (var i = 0; i < randomNumber; i++) {
      comments.push(createComment());
    }
    return comments;
  };

  var getObjectPicture = function (number) {
    return {
      url: 'photos/' + number + '.jpg',
      description: getRandomElement(window.main.DESCRIPTIONS),
      likes: getRandomInteger(window.main.MIN_LIKES, window.main.MAX_LIKES),
      comments: getRandomCommentsList()
    };
  };

  window.getObjectsList = function (number) {
    var objectLists = [];
    for (var i = 0; i < number; i++) {
      objectLists.push(getObjectPicture(i));
    };
    return objectLists;
  };

})();

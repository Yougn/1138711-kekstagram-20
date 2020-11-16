'use strict';

(function () {

  var textHashtags = document.querySelector('.text__hashtags');

  textHashtags.addEventListener('input', function () {
    var textHashtagsValue = textHashtags.value;

    var validHashtag = function () {
      if (textHashtagsValue[0] !== '#') {
        textHashtags.setCustomValidity('Хеш-тег должен начинаться с символа #');
      } else if (!/(^#[a-zA-Zа-яА-Я0-9]*$)/.test(textHashtagsValue)) {
        textHashtags.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, эмодзи и т. д.')
      } else if (textHashtagsValue.length === window.main.MIN_LENGTH) {
        textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (textHashtagsValue.length > window.main.MAX_LENGTH) {
        textHashtags.setCustomValidity('Максимальная длина одного хэш-тега  состовляет 20 символов включая решетку');
      } else {
        textHashtags.setCustomValidity('');
      };
    };

    var hashtags = textHashtagsValue.toLowerCase().split(' ');
    var hashtagsLength = hashtags.length;
    var blockHashtags = [];

    if (hashtagsLength > window.main.NUMBER_HASHTAGS) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      return;
    };

    for (var i = 0; i < hashtagsLength; i++) {
      var isHashtagValid = validHashtag(hashtagsLength[i]);

      if (!isHashtagValid) {
        break;
      };

      if (blockHashtags.includes(hashtagsLength[i])) {
        textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        break;
      } else {
        blockHashtags.push(hashtagsLength[i]);
      };
    };
  });

})();

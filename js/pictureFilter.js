'use strict';

(function () {

  var pictureFilter = document.querySelector('.img-upload__preview');

  var sliderPin = document.querySelector('.effect-level__pin');

  var getSliderPinPosition = function () {
    var x = sliderPin.offsetLeft;
    return x;
  };

  var getLevelEffect = function () {
    var level = Math.floor((getSliderPinPosition() * 100) / window.main.BLOCK__WIDTH);
    return level;
  };

  var changeEffectInput = function () {
    var levelValue = document.querySelector('.effect-level__value');
    levelValue.value = getLevelEffect() + '%';
  };

  var changeLevelEffectLine = function () {
    var levelLine = document.querySelector('.effect-level__depth');
    levelLine.style.width = getLevelEffect() + '%';
  };

  var slider = document.querySelector('.img-upload__effects');

  var openSlider = function () {
    slider.classList.remove('hidden');
  };

  var closeSlider = function () {
    slider.classList.add('hidden');
  };

  var regulateLevelEffect = function () {

    if (pictureFilter.classList.contains('effects__preview--chrome')) {
      pictureFilter.style.filter = 'grayscale(' + getLevelEffect() / 100 + ')';
    } else if (pictureFilter.classList.contains('effects__preview--sepia')) {
      pictureFilter.style.filter = 'sepia(' + getLevelEffect() / 100 + ')';
    } else if (pictureFilter.classList.contains('effects__preview--marvin')) {
      pictureFilter.style.filter = 'invert(' + getLevelEffect() + '%)';
    } else if (pictureFilter.classList.contains('effects__preview--phobos')) {
      pictureFilter.style.filter = 'blur(' + getLevelEffect() / 100 * window.main.MAX_BLUR + 'px)';
    } else if (pictureFilter.classList.contains('effects__preview--heat')) {
      pictureFilter.style.filter = 'brightness(' + (window.main.MIN_BRIGHTNESS + getLevelEffect() / 100 * window.main.MAX_BRIGHTNESS) + ')';
    } else if (pictureFilter.classList.contains('effects__preview--none')) {
      pictureFilter.style.filter = '';
      closeSlider();
    };

    changeEffectInput();
    changeLevelEffectLine();
  };

  sliderPin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      if (sliderPin.offsetLeft - shift.x > window.main.MAX_X - window.main.PIN_WIDTH / 2) {
        sliderPin.style.left = window.main.MAX_X - window.main.PIN_WIDTH / 2 + 'px';
      } else if (sliderPin.offsetLeft - shift.x < window.main.MIN_X - window.main.PIN_WIDTH / 2) {
        sliderPin.style.left = window.main.MIN_X - window.main.PIN_WIDTH / 2 + 'px';
      } else {
        sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';
      };
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      regulateLevelEffect();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var effectList = document.querySelector('.effects__list');
  var currentFilter;

  effectList.addEventListener('change', function (evt) {
    var choise = evt.target.value;

    pictureFilter.classList.remove('effects__preview--' + currentFilter);
    pictureFilter.classList.add('effects__preview--' + choise);
    currentFilter = choise;

    if (('effects__preview--' + currentFilter) === 'effects__preview--none') {
      pictureFilter.style.filter = '';
      closeSlider();
    };
  });

  var buttonFilteres = document.querySelectorAll('.img-filters__button');

  for (var i = 0; i < buttonFilteres.length; i++) {
    buttonFilteres[i].addEventListener('click', function () {
      for (var j = 0; j < buttonFilteres.length; j++) {
        buttonFilteres[j].classList.remove('img-filters__button--active');
      };
      this.classList.toggle('img-filters__button--active');
    });
  };

  window.pictureFilter = {
    pictureFilter: pictureFilter,
    cleanForm: function () {
      pictureFilter.style.transform = 'scale(1)';
      pictureFilter.style.filter = '';
      pictureFilter.classList.remove('effects__preview--' + currentFilter);
      var mainForm = document.querySelector('.img-upload__form');
      mainForm.reset();
      openSlider();
    },
    openFilter: function () {
      var filters = document.querySelector('.img-filters');
      filters.classList.toggle('img-filters--inactive');
    }
  };

})();

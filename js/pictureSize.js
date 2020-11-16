'use strict';

(function () {

  window.controlSizePicture = function () {
    var buttonPlus = document.querySelector('.scale__control--bigger');
    var buttonMinus = document.querySelector('.scale__control--smaller');
    var fieldControl = document.querySelector('.scale__control--value');
    var fieldControlValue = parseInt(fieldControl.value, 10);

    buttonPlus.addEventListener('click', function () {
      if (fieldControlValue < window.main.MAX_SIZE) {
        fieldControlValue += window.main.STEP;
        fieldControl.value = fieldControlValue + "%";
      };
      window.pictureFilter.pictureFilter.style.transform = 'scale(' + fieldControlValue / 100 + ')';
    });

    buttonMinus.addEventListener('click', function () {
      if (fieldControlValue > window.main.MIN_SIZE) {
        fieldControlValue -= window.main.STEP;
        fieldControl.value = fieldControlValue + "%";
      };
      window.pictureFilter.pictureFilter.style.transform = 'scale(' + fieldControlValue / 100 + ')';
    });
  };

  window.controlSizePicture();

})();

'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function () {
    showFormImage();
  });

  var formImage = document.querySelector('.img-upload__overlay');

  var showFormImage = function () {
    formImage.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', keyDownHandler);
  };

  var closeFormImage = function () {
    formImage.classList.add('hidden');
    uploadFile.value = '';
    cleanForm();
    body.classList.remove('modal-open');
    deleteHandler();
  };

  var keyDownHandler = function (evt) {
    if (evt.key === 'Escape' && evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
      closeFormImage();
    }
  };

  var deleteHandler = function () {
    document.removeEventListener('keydown', keyDownHandler);
  };

  var buttonCloseImage = document.querySelector('.img-upload__cancel');

  buttonCloseImage.addEventListener('click', function () {
    closeFormImage();
  });

})();

'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function () {
    showFormImage();
  });

  var formImage = document.querySelector('.img-upload__overlay');

  var showFormImage = function () {
    formImage.classList.remove('hidden');
    window.picture.body.classList.add('modal-open');
    document.addEventListener('keydown', keyDownHandler);
  };

  var closeFormImage = function () {
    formImage.classList.add('hidden');
    uploadFile.value = '';
    window.pictureFilter.cleanForm();
    window.picture.body.classList.remove('modal-open');
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

  var main = document.querySelector('main');

  var createTemplate = function (nameId, nameClass) {
    closeFormImage();
    var messageTemplate = document.querySelector(nameId).content.querySelector(nameClass);
    var element = messageTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var showMessage = function () {
    createTemplate('#success', '.success');

    document.addEventListener('click', bannerClickHendler);
    document.addEventListener('keydown', bannerKeyDownHendler);

    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('keydown', bannerPushButtonHendler);
  };

  var closeBanner = function () {
    var message = document.querySelector('.success');
    message.remove();

    document.removeEventListener('click', bannerClickHendler);
    document.removeEventListener('keydown', bannerKeyDownHendler);
  };

  var bannerClickHendler = function () {
    closeBanner();
  };

  var bannerKeyDownHendler = function (evt) {
    if (evt.key === 'Escape') {
      closeBanner();
    };
  };

  var bannerPushButtonHendler = function (evt) {
    if (evt.key === 'Enter') {
      closeBanner();
    }
  };

  window.showErrorMessage = function () {
    createTemplate('#error', '.error');

    document.addEventListener('click', bannerErrorClickHendler);
    document.addEventListener('keydown', bannerErrorKeyDownHendler);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('keydown', bannerErrorPushButtonHendler);
  };

  var closeBannerError = function () {
    var message = document.querySelector('.error');
    message.remove();

    document.removeEventListener('click', bannerErrorClickHendler);
    document.removeEventListener('keydown', bannerErrorKeyDownHendler);
  };

  var bannerErrorClickHendler = function () {
    closeBannerError();
  };

  var bannerErrorKeyDownHendler = function (evt) {
    if (evt.key === 'Escape') {
      closeBannerError();
    };
  };

  var bannerErrorPushButtonHendler = function (evt) {
    if (evt.key === 'Enter') {
      closeBannerError();
    }
  };

  var mainForm = document.querySelector('.img-upload__form');

  // Отправка данных из формы на сервер
  mainForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(mainForm), function () {
      showMessage();
    }, window.showErrorMessage);
    evt.preventDefault();
  });

})();

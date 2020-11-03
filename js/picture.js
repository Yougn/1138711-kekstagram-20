'use strict';

(function () {

  window.bigPicture = document.querySelector('.big-picture');
  window.body = document.querySelector('body');

  window.renderBigPicture = function (photo) {
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
        newImg.style.width = window.main.CARD_IMG_WIDTH;
        newImg.style.height = window.main.CARD_IMG_HEIGHT;
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
    body.classList.add('modal-open');
  }

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    deletePictureKeyDownHandler();
  };

  var buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
  buttonCloseBigPicture.addEventListener('click', function () {
    closePicture();
  });

  window.pictureKeyDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      closePicture();
    };
  };

  var deletePictureKeyDownHandler = function () {
    document.removeEventListener('keydown', pictureKeyDownHandler);
  };

})();

'use strict';

(function () {

  var mainPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');

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

  window.picture = {
    mainPicture: mainPicture,
    body: body,
    renderBigPicture: function (photo) {

      mainPicture.querySelector('.big-picture__img img').src = photo.url;
      mainPicture.querySelector('.likes-count').textContent = photo.likes;
      mainPicture.querySelector('.social__caption').textContent = photo.description;

      var pictureComments = mainPicture.querySelector('.social__comments');
      pictureComments.innerHTML = '';

      var renderComments = function () {
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
        return fragment;
      };

      window.closePicture = function () {
        mainPicture.classList.add('hidden');
        body.classList.remove('modal-open');
        deletePictureKeyDownHandler();
        comments = [];
      };

      var commentsUsers = renderComments().querySelectorAll('.social__comment');
      var commentLoader = document.querySelector('.comments-loader');
      var comments = Array.prototype.slice.call(commentsUsers);

      var makeComments = function (number) {
        var commentsList = comments.slice(0, number)
        for (var i = 0; i < commentsList.length; i++) {
          pictureComments.appendChild(commentsList[i]);
        };
        if (commentsList.length === photo.comments.length) {
          commentLoader.classList.add('hidden');
        };
        mainPicture.querySelector('.social__comment-count').textContent = commentsList.length + ' из ' + photo.comments.length + ' комментариев';
      };

      var addComments = function () {
        commentLoader.classList.remove('hidden');
        makeComments(window.main.NUMBER_COMMENTS);
      };

      addComments();

      var currentComment = window.main.NUMBER_COMMENTS;

      var commentClickHandler = function () {
        currentComment += window.main.NUMBER_COMMENTS;
        makeComments(currentComment)
      };

      commentLoader.addEventListener('click', commentClickHandler);
      body.classList.add('modal-open');
    }
  };

})();

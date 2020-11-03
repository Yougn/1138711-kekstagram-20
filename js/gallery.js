'use strict';

(function () {

  window.photos = getObjectsList(window.main.NUMBER);

  var pictureList = document.querySelector('.pictures')
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (photo, count) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('img').src = photo.url;
    picture.querySelector('img').dataset.id = count;
    picture.querySelector('.picture__info .picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__info .picture__comments').textContent = photo.comments;
    picture.id = count;

    return picture;
  };

  var createFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    };
    return fragment;
  };

  pictureList.appendChild(createFragment(photos));

})();

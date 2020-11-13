'use strict';

(function () {

  // window.photos = getObjectsList(window.main.NUMBER); Подключение моковых данных

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

  var removePictures = function () {
    pictureList.innerHTML = '';
  };

  var filterPhotos = function (id) {
    var photosArray = photos.slice();

    if (id === 'filter-random') {
      removePictures();
      return photosArray.sort(function () { return 0.5 - Math.random() }).slice(0, 10);
    } else if (id === 'filter-discussed') {
      removePictures();
      return photosArray.sort(function (a, b) { return b.comments.length - a.comments.length });
    } else if (id === 'filter-default') {
      removePictures();
      return photosArray;
    };
  };

  var drawPhotos = window.debounce(function (id) {
    window.resultPicture = filterPhotos(id);
    pictureList.appendChild(createFragment(window.resultPicture));
  });

  var sorting = document.querySelector('.img-filters__form');

  sorting.addEventListener('click', function (evt) {
    var id = evt.target.id;
    drawPhotos(id);
  });

  window.backend.load(function (photos) {
    window.photos = photos;
    window.resultPicture = photos

    pictureList.appendChild(createFragment(photos));

    window.pictureFilter.openFilter();
  }, window.showErrorMessage);

})();

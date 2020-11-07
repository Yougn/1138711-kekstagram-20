'use strict';

(function () {

  var pictureList = document.querySelector('.pictures')

  var selectPicture = function (id) {
    window.picture.bigPicture.classList.remove('hidden');
    window.picture.renderBigPicture(photos[id]);
    document.addEventListener('keydown', pictureKeyDownHandler);
  };

  pictureList.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      var id = evt.target.id;

      if (!id || id === 'upload-file') {
        return;
      };

      selectPicture(id);
    };
  });

  pictureList.addEventListener('click', function (evt) {
    var id = evt.target.dataset.id;

    if (!id) {
      return;
    };

    selectPicture(id);
  });

})();

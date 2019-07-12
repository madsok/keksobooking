'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var address = window.adForm.querySelector('#address');
  var mapPinMainSize = {
    width: 65,
    height: 65
  };
  var mapPinMainAfterHeight = 14;

  var limits = {
    top: 130,
    right: 1200,
    bottom: 630,
    left: 0
  };

  var onPinClick = function () {
    window.map.showElement('.map', 'map--faded');
    window.map.renderPins(window.ads);
    window.map.showElement('.ad-form', 'ad-form--disabled');
    window.map.activateForm();
  };

  address.value = mapPinMain.offsetLeft + ',' + mapPinMain.offsetTop;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    onPinClick();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (mapPinMainCoords.x < limits.left) {
        mapPinMainCoords.x = limits.left;
      } else if (mapPinMainCoords.x > limits.right - mapPinMainSize.width) {
        mapPinMainCoords.x = limits.right - mapPinMainSize.width;
      }

      if (mapPinMainCoords.y < limits.top - mapPinMainSize.height - mapPinMainAfterHeight) {
        mapPinMainCoords.y = limits.top - mapPinMainSize.height - mapPinMainAfterHeight;
      } else if (mapPinMainCoords.y > limits.bottom - mapPinMainSize.height - mapPinMainAfterHeight) {
        mapPinMainCoords.y = limits.bottom - mapPinMainSize.height - mapPinMainAfterHeight;
      }

      var mapPinMainAfterCoords = {
        x: mapPinMainCoords.x + Math.round(mapPinMainSize.width / 2),
        y: mapPinMainCoords.y + mapPinMainSize.height + mapPinMainAfterHeight
      };

      mapPinMain.style.left = mapPinMainCoords.x + 'px';
      mapPinMain.style.top = mapPinMainCoords.y + 'px';

      address.value = mapPinMainAfterCoords.x + ',' + mapPinMainAfterCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

}());

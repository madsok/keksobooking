'use strict';

(function () {

  window.pin = {
    mapPinMain: document.querySelector('.map__pin--main'),
    address: window.map.adForm.querySelector('#address'),
    data: false,
    mapPinMainStartCoords: function () {
      window.pin.mapPinMain.style.top = window.pin.mapPinMain.offsetTop;
      window.pin.mapPinMain.style.left = window.pin.mapPinMain.offsetLeft;
    }
  };
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

  var showPins = function () {
    window.map.showElement('.map', 'map--faded');
    window.map.showElement('.ad-form', 'ad-form--disabled');
    window.map.activateForm();
  };

  window.pin.address.value = window.pin.mapPinMain.offsetLeft + ',' + window.pin.mapPinMain.offsetTop;

  var onMapPinMainClick = function (evt) {
    evt.preventDefault();
    showPins();
    if (!window.pin.data) {
      window.load(window.map.data, window.onError);
      window.pin.data = true;
    }

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
        x: window.pin.mapPinMain.offsetLeft - shift.x,
        y: window.pin.mapPinMain.offsetTop - shift.y
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

      window.pin.mapPinMain.style.left = mapPinMainCoords.x + 'px';
      window.pin.mapPinMain.style.top = mapPinMainCoords.y + 'px';

      window.pin.address.value = mapPinMainAfterCoords.x + ',' + mapPinMainAfterCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };
  window.pin.mapPinMain.addEventListener('mousedown', onMapPinMainClick);

}());

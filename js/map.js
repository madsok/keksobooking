'use strict';

(function () {
  var PINS_LIMIT = 5;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersFieldests = mapFilters.querySelectorAll('fieldset');
  window.map = {
    adForm: document.querySelector('.ad-form'),
    data: function (data) {
      window.map.renderPins(data.slice(0, PINS_LIMIT));
      mapFilters.addEventListener('change', function () {
        var filteredData = window.filterData(data);
        window.map.removePins();
        window.map.renderPins(filteredData);
      });
    },
    renderPins: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderPin(array[i]));
      }
      mapPins.appendChild(fragment);
    },
    activateForm: function () {
      enableField(adFormFieldsets);
      enableField(mapFiltersSelects);
      enableField(mapFiltersFieldests);
    },
    showElement: function (element, classHidden) {
      document.querySelector(element).classList.remove(classHidden);
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };
  var adFormFieldsets = window.map.adForm.querySelectorAll('fieldset');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var disableField = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableField = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var disableForm = function () {
    disableField(adFormFieldsets);
    disableField(mapFiltersSelects);
    disableField(mapFiltersFieldests);
  };

  disableForm();
}());

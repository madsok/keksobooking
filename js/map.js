'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.adForm = document.querySelector('.ad-form');
  var adFormFieldsets = window.adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersFieldests = mapFilters.querySelectorAll('fieldset');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = 'Заголовок объявления';

    return pinElement;
  };

  window.map = {
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
    }
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

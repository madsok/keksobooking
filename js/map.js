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

  window.showElement = function (element, classHidden) {
    document.querySelector(element).classList.remove(classHidden);
  };

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = 'Заголовок объявления';

    return pinElement;
  };

  window.renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPin(array[i]));
    }
    mapPins.appendChild(fragment);
  };

  var addAttribute = function (pseudoElements) {
    for (var i = 0; i < pseudoElements.length; i++) {
      pseudoElements[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeAttribute = function (pseudoElements) {
    for (var i = 0; i < pseudoElements.length; i++) {
      pseudoElements[i].removeAttribute('disabled');
    }
  };

  window.activateForm = function () {
    removeAttribute(adFormFieldsets);
    removeAttribute(mapFiltersSelects);
    removeAttribute(mapFiltersFieldests);
  };

  var disableForm = function () {
    addAttribute(adFormFieldsets);
    addAttribute(mapFiltersSelects);
    addAttribute(mapFiltersFieldests);
  };

  disableForm();
}());

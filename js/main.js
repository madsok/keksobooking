'use strict';

var LOCATION_X_X = 50;
var LOCATION_X_Y = 1150;
var LOCATION_Y_X = 130;
var LOCATION_Y_Y = 630;
var ADS_LENGTH = 8;
var types = ['palace', 'flat', 'house', 'bungalo'];
var avatarURL = 'img/avatars/user';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adFormTitle = document.querySelector('#title');
var adFormPrice = document.querySelector('#price');
var adFormType = document.querySelector('#type');
var adFormTimeIn = document.querySelector('#timein');
var adFormTimeOut = document.querySelector('#timeout');
var typesMinPrices = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalo: 0
};


var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelects = mapFilters.querySelectorAll('select');
var mapFiltersFieldests = mapFilters.querySelectorAll('fieldset');
var address = adForm.querySelector('#address');

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


var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var showElement = function (element, classHidden) {
  document.querySelector(element).classList.remove(classHidden);
};

var getAd = function (i) {
  var ad = {
    author: {
      avatar: i < 10 ? avatarURL + '0' + i + '.png' : avatarURL + i + '.png'
    },
    offer: {
      type: getRandomElement(types)
    },

    location: {
      x: getRandomInteger(LOCATION_X_X, LOCATION_X_Y),
      y: getRandomInteger(LOCATION_Y_X, LOCATION_Y_Y)
    }
  };
  return ad;
};

var getAds = function () {
  var ads = [];
  for (var i = 0; i < ADS_LENGTH; i++) {
    ads[i] = getAd(i + 1);
  }
  return ads;
};

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = 'Заголовок объявления';

  return pinElement;
};

var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  mapPins.appendChild(fragment);
};

var ads = getAds();

//  подробности//

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

var activateForm = function () {
  removeAttribute(adFormFieldsets);
  removeAttribute(mapFiltersSelects);
  removeAttribute(mapFiltersFieldests);
};

var disableForm = function () {
  addAttribute(adFormFieldsets);
  addAttribute(mapFiltersSelects);
  addAttribute(mapFiltersFieldests);
};

var onPinClick = function () {
  showElement('.map', 'map--faded');
  renderPins(ads);
  showElement('.ad-form', 'ad-form--disabled');
  activateForm();
};

var getPriceByType = function (evt) {
  var onSelectType = typesMinPrices[evt.target.value];
  adFormPrice.min = onSelectType;
  adFormPrice.placeholder = onSelectType;
};

disableForm();

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

adFormTitle.addEventListener('invalid', function () {
  if (adFormTitle.validity.tooShort) {
    adFormTitle.setCustomValidity('Минимальная длина — 30 символов');
  } else if (adFormTitle.validity.tooLong) {
    adFormTitle.setCustomValidity('Максимальная длина — 100 символов');
  } else if (adFormTitle.validity.valueMissing) {
    adFormTitle.setCustomValidity('Обязательное поле');
  } else {
    adFormTitle.setCustomValidity('');
  }
});

adFormPrice.addEventListener('invalid', function () {
  if (adFormPrice.validity.rangeOverflow) {
    adFormPrice.setCustomValidity('Максимальная цена — 1 000 000');
  } else if (adFormPrice.validity.valueMissing) {
    adFormPrice.setCustomValidity('Обязательное поле');
  } else {
    adFormPrice.setCustomValidity('');
  }
});

adFormType.addEventListener('change', getPriceByType);

adFormTimeIn.addEventListener('change', function (evt) {
  adFormTimeOut.value = evt.target.value;
});

adFormTimeOut.addEventListener('change', function (evt) {
  adFormTimeIn.value = evt.target.value;
});

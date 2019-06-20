'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var avatarURL = 'img/avatars/user';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var LOCATION_X_X = 50;
var LOCATION_X_Y = 1150;
var LOCATION_Y_X = 130;
var LOCATION_Y_Y = 630;
var ADS_LENGTH = 8;

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
renderPins(ads);

showElement('.map.map--faded', 'map--faded');

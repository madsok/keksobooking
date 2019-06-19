'use strict';

var types = ['palace', 'flat', 'house','bungalo'];
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var showElement = function (element, classHidden) {
  document.querySelector(element).classList.remove(classHidden);
};

var getAd = function (i) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      type: getRandomElement(types)
    },

    location: {
      x: getRandomInteger(50, 1150),
      y: getRandomInteger(130, 630)
    }
  };
  return ad;
};

var getAds = function () {
  var ads = [];
  for (var i = 1, j = 0; i < 9; i++, j++) {
    ads[j] = getAd(i);
  }
  return ads;
};

var ads = getAds();

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = 'Заголовок объявления';

  return pinElement;
};

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPins.appendChild(fragment);
};

renderPins(ads);

showElement('.map.map--faded', 'map--faded');

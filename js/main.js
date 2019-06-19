'use strict';

var types = ['palace', 'flat', 'house','bungalo'];
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

var getAd = function () {
  for (var i = 1; i < 9; i++);
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      type: getRandomElement(types)
    },

    location: {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 160)
    }
  };
  return ad;
};

var getAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads[i] = getAd();
  }
  return ads;
};

var ads = getAds();

showElement('.map.map--faded', '.map--faded');

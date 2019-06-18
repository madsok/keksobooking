'use strict';

var types = ['palace', 'flat', 'house','bungalo'];

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};



var getAd = function () {
  for (i = 0; i < 8; i++);
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      type: getRandomElement(types)
    },

    location: {
      x: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: случайное число, координата y метки на карте от 130 до 630.
    }
  }
};


console.log('img/avatars/user' + '0' + 'i' + '.png')

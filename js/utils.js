'use strict';

(function () {
  window.getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
}());

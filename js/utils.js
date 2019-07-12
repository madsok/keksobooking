'use strict';

(function () {

  window.util = {
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
}());

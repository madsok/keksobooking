'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    onEscDown: function (evt, cbfunc) {
      if (evt.keyCode === ESC_KEYCODE) {
        cbfunc();
      }
    }
  };
}());

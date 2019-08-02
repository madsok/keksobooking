'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

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
    },

    debounce: function (cbfunc) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cbfunc.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
}());

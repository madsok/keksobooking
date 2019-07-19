'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.onError = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
  };
})();

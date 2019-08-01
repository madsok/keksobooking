'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorBtn = document.querySelector('#error').content.querySelector('.error__button');

  window.onError = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    var onErrorMessageClick = function () {
      errorMessage.remove();
      errorBtn.removeEventListener('click', onErrorMessageClick);
      document.removeEventListener('click', onErrorMessageClick);
      document.removeEventListener('keydown', onErrorMessageEscDown);
    };
    errorBtn.addEventListener('click', onErrorMessageClick);
    document.addEventListener('click', onErrorMessageClick);
    var onErrorMessageEscDown = function (evt) {
      window.utils.onEscDown(evt, onErrorMessageClick);
    };
    document.addEventListener('keydown', onErrorMessageEscDown);
  };
})();

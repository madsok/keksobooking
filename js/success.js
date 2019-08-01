'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  window.onSuccess = function () {
    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    var onSuccessMessageClick = function () {
      successMessage.remove();
      document.removeEventListener('click', onSuccessMessageClick);
      document.removeEventListener('keydown', onSuccessMessageEscDown);
    };
    document.addEventListener('click', onSuccessMessageClick);
    var onSuccessMessageEscDown = function (evt) {
      window.utils.onEscDown(evt, onSuccessMessageClick);
    };
    document.addEventListener('keydown', onSuccessMessageEscDown);
  };
})();

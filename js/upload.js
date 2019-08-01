'use strict';

(function () {
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;

  window.upload = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', POST_URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.send(data);
  };
})();

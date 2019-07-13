'use strict';

(function () {

  var adFormTitle = document.querySelector('#title');
  var adFormPrice = document.querySelector('#price');
  var adFormType = document.querySelector('#type');
  var adFormTimeIn = document.querySelector('#timein');
  var adFormTimeOut = document.querySelector('#timeout');
  var typesMinPrices = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalo: 0
  };

  var getPriceByType = function (evt) {
    var onSelectType = typesMinPrices[evt.target.value];
    adFormPrice.min = onSelectType;
    adFormPrice.placeholder = onSelectType;
  };

  adFormTitle.addEventListener('invalid', function () {
    if (adFormTitle.validity.tooShort) {
      adFormTitle.setCustomValidity('Минимальная длина — 30 символов');
    } else if (adFormTitle.validity.tooLong) {
      adFormTitle.setCustomValidity('Максимальная длина — 100 символов');
    } else if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле');
    } else {
      adFormTitle.setCustomValidity('');
    }
  });

  adFormPrice.addEventListener('invalid', function () {
    if (adFormPrice.validity.rangeOverflow) {
      adFormPrice.setCustomValidity('Максимальная цена — 1 000 000');
    } else if (adFormPrice.validity.valueMissing) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  });

  adFormType.addEventListener('change', getPriceByType);

  adFormTimeIn.addEventListener('change', function (evt) {
    adFormTimeOut.value = evt.target.value;
  });

  adFormTimeOut.addEventListener('change', function (evt) {
    adFormTimeIn.value = evt.target.value;
  });
}());

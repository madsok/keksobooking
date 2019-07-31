'use strict';

(function () {

  var adFormTitle = document.querySelector('#title');
  var adFormPrice = document.querySelector('#price');
  var adFormType = document.querySelector('#type');
  var adFormTimeIn = document.querySelector('#timein');
  var adFormTimeOut = document.querySelector('#timeout');
  var adFormRoomNumber = document.querySelector('#room_number');
  var adFormCapacity = document.querySelector('#capacity');
  var typesMinPrices = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalo: 0
  };
  var roomCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var getPriceByType = function (evt) {
    var onSelectType = typesMinPrices[evt.target.value];
    adFormPrice.min = onSelectType;
    adFormPrice.placeholder = onSelectType;
  };

  var onRoomNumberChange = function () {
    [].forEach.call(adFormCapacity.options, function (item) {
      item.selected = (roomCapacity[adFormRoomNumber.value][0] === item.value);
      item.disabled = !(roomCapacity[adFormRoomNumber.value].indexOf(item.value) >= 0);
    });
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

  onRoomNumberChange();
  adFormRoomNumber.addEventListener('change', onRoomNumberChange);

}());

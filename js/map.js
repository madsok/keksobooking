'use strict';

(function () {
  var PINS_LIMIT = 5;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersFieldests = mapFilters.querySelectorAll('fieldset');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
  window.map = {
    adForm: document.querySelector('.ad-form'),
    data: function (data) {
      window.map.renderPins(data.slice(0, PINS_LIMIT));
      mapFilters.addEventListener('change', function () {
        var filteredData = window.filterData(data);
        window.map.removePins();
        window.map.renderPins(filteredData.slice(0, PINS_LIMIT));
      });
    },
    renderPins: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderPin(array[i]));
      }
      mapPins.appendChild(fragment);
    },
    activateForm: function () {
      enableField(adFormFieldsets);
      enableField(mapFiltersSelects);
      enableField(mapFiltersFieldests);
    },
    showElement: function (element, classHidden) {
      document.querySelector(element).classList.remove(classHidden);
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };
  var adFormFieldsets = window.map.adForm.querySelectorAll('fieldset');
  var Types = {
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало'
  };

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    var onPinClick = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
        mapCard.remove();
      }
    createCard(ad);
    };
    pinElement.addEventListener('click', onPinClick);

    return pinElement;
  };

  var createFeatureFragment = function (cardData) {
    var featureFragment = document.createDocumentFragment();
    cardData.offer.features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  var createPhotoFragment = function (cardData) {
    var photoFragment = document.createDocumentFragment();
    cardData.offer.photos.forEach(function (it) {
      var popupPhotoItem = popupPhotoTemplate.cloneNode(true);
      popupPhotoItem.src = it;
      photoFragment.appendChild(popupPhotoItem);
    });
    return photoFragment;
  };


  var createCard = function (cardData) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.map__card img').src = cardData.author.avatar;
    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = Types[cardData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(createFeatureFragment(cardData));
    card.querySelector('.popup__description').textContent = cardData.offer.description;
    card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photo'));
    card.querySelector('.popup__photos').appendChild(createPhotoFragment(cardData));
    mapPins.appendChild(card);

    return card;
  };


  var disableField = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableField = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var disableForm = function () {
    disableField(adFormFieldsets);
    disableField(mapFiltersSelects);
    disableField(mapFiltersFieldests);
  };

  disableForm();
}());

'use strict';

(function () {
  var prices = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var filterData = function (ads) {

    return ads.filter(function (ad) {
      return filterTypes(ad) && filterPrices(ad) && filterRooms(ad) && filterGuests(ad) && fillterFeatures(ad);
    });
  };

  var filterTypes = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  var filterPrices = function (ad) {
    return housingPrice.value === 'any' || ad.offer.price >= prices[housingPrice.value].min && ad.offer.price <= prices[housingPrice.value].max;
  };

  var filterRooms = function (ad) {
    return housingRooms.value === 'any' || ad.offer.rooms === Number(housingRooms.value);
  };

  var filterGuests = function (ad) {
    return housingGuests.value === 'any' || ad.offer.guests === Number(housingGuests.value);
  };

  var fillterFeatures = function (ad) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (elem) {
      return ad.offer.features.includes(elem.value);
    });
  };

  window.filterData = filterData;

})();

'use strict';

(function () {
  var prices = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var filterData = function (ads) {

    return ads.filter(function (ad) {
      return filterTypes(ad);
    });
  };

  var filterTypes = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  window.filterData = filterData;

})();

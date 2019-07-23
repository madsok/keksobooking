'use strict';

(function () {
  var PINS_LIMIT = 5;
  var housingType = document.querySelector('#housing-type');

  var filterData = function (ads) {

    return ads.filter(function (ad) {
      return filterTypes(ad);
    }).slice(0, PINS_LIMIT);
  };

  var filterTypes = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  window.filterData = filterData;

})();

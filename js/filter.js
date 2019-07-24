'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');

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

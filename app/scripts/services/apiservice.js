'use strict';
angular.module('CodenameTank.services')
.factory('ApiService', ['$http', function ($http) {
  var baseUrl = 'https://deck.sinfo.org:443/api/';

  function _sync() {
    var promises = [];

    promises.push(
      $http({
        method: 'GET',
        url: baseUrl+'speakers'
      })
    );
    return promises;
  }

  return {
    sync: _sync
  };
}]);
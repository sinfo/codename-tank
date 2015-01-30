'use strict';
angular.module('CodenameTank.services')
.factory('ApiService', ['$http', function ($http) {
  var baseUrl = 'https://deck.sinfo.org:443/api/';

  function _getSpeakers() {
    return $http({ method: 'GET', url: baseUrl+'speakers'});
  }

  return {
    getSpeakers: _getSpeakers
  };
}]);
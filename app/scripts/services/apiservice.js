'use strict';
angular.module('CodenameTank.services')
.factory('ApiService', ['$http', function ($http) {
  var baseUrl = 'https://deck.sinfo.org:443/api/';

  function _getSpeakers() {
    return $http({ method: 'GET', url: baseUrl + 'speakers'});
  }

  function _getCompanies() {
    return $http({ method: 'GET', url: baseUrl + 'companies'});
  }

  return {
    getSpeakers: _getSpeakers,
    getCompanies: _getCompanies
  };
}]);
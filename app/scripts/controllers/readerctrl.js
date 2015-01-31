'use strict';
angular.module('CodenameTank.controllers')

.controller('ReaderCtrl', ['$scope', '$cordovaBarcodeScanner', function($scope, $cordovaBarcodeScanner) {
  $scope.read = function(){
    $cordovaBarcodeScanner.scan()
      .then(function(imageData) {
        console.log('Data readed: ', imageData);
      }, function(error) {
        console.log('teste'+error);
      });
  };
}]);
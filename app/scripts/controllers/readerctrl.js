'use strict';
angular.module('CodenameTank.controllers')

.controller('ReaderCtrl', function($scope, $cordovaBarcodeScanner, $ionicPlatform) {
  $scope.read = function(){
    $cordovaBarcodeScanner.scan()
      .then(function(imageData) {
        console.log('Data readed: ', imageData);
      }, function(error) {
        console.log('teste'+error);
      });
  };
});
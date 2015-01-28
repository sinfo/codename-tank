'use strict';
angular.module('CodenameTank.controllers')

.controller('SpeakersCtrl', ['$scope', 'DBService', '$ionicModal', function($scope, DBService, $ionicModal) {
  $scope.data = DBService;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/speaker_modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.viewSpeaker = function(index) {
    $scope.modalSpeaker = $scope.data.getSpeakers[index];
    $scope.modal.show();
  };


}]);
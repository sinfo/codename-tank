'use strict';
angular.module('CodenameTank.controllers')

.controller('CompaniesCtrl', ['$scope', 'DBService', '$ionicModal', function($scope, DBService, $ionicModal) {
  $scope.data = DBService;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/company_modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.viewCompany = function(index) {
    $scope.modalCompany = $scope.data.getCompanies[index];
    $scope.modal.show();
  };


}]);
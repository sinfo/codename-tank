'use strict';
angular.module('CodenameTank.services')
.factory('FileService', ['$cordovaFileTransfer', function ($cordovaFileTransfer) {
  
  function _fetchFile (url){
    var slugs = url.split('/');

    var targetPath = cordova.file.dataDirectory + slugs[slugs.length-1];
    var trustHosts = true;
    var options = {};

    return $cordovaFileTransfer.download(url, targetPath, options, trustHosts);

  }

  return {
    fetchFile: _fetchFile
  };
}]);
'use strict';
angular.module('CodenameTank.services')
.factory('FileService', ['$cordovaFileTransfer', function ($cordovaFileTransfer) {
  
  function _fetchFile (url){
    var slugs = url.split('/');

    var targetPath = cordova.file.dataDirectory + slugs[slugs.length-1];
    var trustHosts = true
    var options = {};

    return $cordovaFileTransfer.download(url, targetPath, options, trustHosts);

  }

  function _fetchSpeakersPhotos (speakers){
    var promises = [];
    for (var i = 0; i < speakers.length; i++) {
      promises.push(_fetchFile(speakers[i].img));
      
    }

    return promises;

  }

  return {
    fetchFile: _fetchFile,
    fetchSpeakersPhotos: _fetchSpeakersPhotos
  };
}]);
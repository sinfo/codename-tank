'use strict';
angular.module('CodenameTank.services')
.factory('DBService', ['$cordovaSQLite', 'ApiService', 'FileService', '$q', function ($cordovaSQLite, ApiService, FileService, $q) {
  var _db;
  var _speakers = [];
  var syncWithAPI = true;


  function _initDB () {
    window.plugins.sqlDB.copy('tank', function() {
      _db = $cordovaSQLite.openDB('tank');
      _loadData();
    }, function(error) {
      console.log('Warning = '+JSON.stringify(error));
      _db = $cordovaSQLite.openDB('tank');
      _loadData();
    });
  }

  function _loadData () {
    // var promises = [];
    _speakers.length = 0;
    $cordovaSQLite.execute(_db, 'SELECT * FROM speakers', []).then(function(results) {
      var _dbSpeaker;
      for (var i = 0; i < results.rows.length; i++) {
        _dbSpeaker = results.rows.item(i);
        _dbSpeaker.img = cordova.file.dataDirectory + _dbSpeaker.img;
        _speakers.push(_dbSpeaker);
      }

    }, function (err) {
      console.log(err);
      _speakers = [];
    });

    // promises.push($cordovaSQLite.execute(_db, 'SELECT * FROM speakers', []));
    // promises.push($cordovaSQLite.execute(_db, 'SELECT * FROM sponsors', []));
    // promises.push($cordovaSQLite.execute(_db, 'SELECT * FROM schedules', []));
    // $q.all(promises).then(function(results){
    //   for (var i = 0; i < results[0].rows.length; i++) {
    //       _speakers.push(results[0].rows.item(i));
    //   }

    //   for (var i = 0; i < results[1].rows.length; i++) {
    //       _sponsors.push(results[1].rows.item(i));
    //   }

    //   for (var i = 0; i < results[2].rows.length; i++) {
    //       _schedules.push(results[2].rows.item(i));
    //   }
    // });
    if(syncWithAPI){
      _syncDB();

    }
  }

  function _syncDB() {
    var _dbPromises = [];
    var apiSpeakers = [];

    ApiService.getSpeakers().then(function(results){
      for (var i = 0; i < results.data.length; i++) {
        _dbPromises.push(_insertUpdateSpeaker(results.data[i]));
      };
      $q.all(_dbPromises).then(function(results){
        console.log(results);
        syncWithAPI = false;
        _loadData();
      });
    });
  }

  function _insertUpdateSpeaker(speaker){
    return FileService.fetchFile(speaker.img).then(function(result){
      return $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO speakers (id,name, title, description, img, updated) VALUES (?, ?, ?, ?, ?, ?)',
          [speaker.id, speaker.name, speaker.title, speaker.description, result.name, speaker.updated]);
    }, function(error){
      console.log(error);
      return $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO speakers (id,name, title, description, updated) VALUES (?, ?, ?, ?, ?)',
          [speaker.id, speaker.name, speaker.title, speaker.description, speaker.updated])
    });
  }


  return {
    initDB: _initDB,
    getSpeakers: _speakers
  };
}]);
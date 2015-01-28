'use strict';
angular.module('CodenameTank.services')
.factory('DBService', ['$cordovaSQLite', 'ApiService', '$q', function ($cordovaSQLite, ApiService, $q) {
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

      for (var i = 0; i < results.rows.length; i++) {
        _speakers.push(results.rows.item(i));
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
    var apiPromises = ApiService.sync();
    var _speaker;
    $q.all(apiPromises).then(function(results){
      for (var i = 0; i < results[0].data.length; i++) {
        _speaker = results[0].data[i];

        _dbPromises.push(
          $cordovaSQLite.execute(_db,
          'INSERT OR REPLACE INTO speakers (id,name, title, description, img, updated) VALUES (?, ?, ?, ?, ?, ?)',
          [_speaker.id, _speaker.name, _speaker.title, _speaker.description, _speaker.img, _speaker.updated])
        );
      }
      $q.all(_dbPromises).then(function(){
        syncWithAPI = false;
        _loadData();
      });
    });
  }


  return {
    initDB: _initDB,
    getSpeakers: _speakers
  };
}]);